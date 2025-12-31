import { getPostsX } from '../services/get-posts-x.service';
import { generateMarket } from '../services/generate-market.service';
import { createMarketVault } from '../services/market-factory.service';
import { createMarket, type CreateMarketInput } from '../services/market.service';

const username = 'premierleague';

if (!username) {
  console.error('Username is required');
  process.exit(1);
}

async function processPostsAndGenerateMarkets() {
  try {
    console.log(`Fetching posts for @${username}...`);
    const data = await getPostsX(username);

    const timeline = data.result?.timeline;
    if (!timeline?.instructions) {
      console.error('No timeline instructions found in response');
      return;
    }

    const tweets: Array<{ pid: string; username: string; text: string }> = [];

    for (const instruction of timeline.instructions) {
      if (instruction.type === 'TimelineAddEntries' && instruction.entries) {
        for (const entry of instruction.entries) {
          if (entry.content?.entryType !== 'TimelineTimelineItem') {
            continue;
          }

          const itemContent = entry.content.itemContent;
          if (!itemContent?.tweet_results?.result) {
            continue;
          }

          const tweetResult = itemContent.tweet_results.result;
          const pid = tweetResult.rest_id;
          const screenName = tweetResult.core?.user_results?.result?.core?.screen_name;
          const fullText = tweetResult.legacy?.full_text || '';

          if (pid && screenName) {
            tweets.push({ pid, username: screenName, text: fullText });
          }
        }
      }
    }

    console.log(`\nFound ${tweets.length} tweets\n`);

    let successCount = 0;
    let failCount = 0;
    let onChainSuccessCount = 0;
    let dbSaveSuccessCount = 0;

    for (let i = 0; i < tweets.length; i++) {
      const tweet = tweets[i];
      if (!tweet) continue;

      const twitterUrl = `https://x.com/${tweet.username}/status/${tweet.pid}`;

      console.log(`\n[${i + 1}/${tweets.length}] Processing tweet:`);
      console.log(`URL: ${twitterUrl}`);
      console.log(`Text: ${tweet.text.substring(0, 100)}${tweet.text.length > 100 ? '...' : ''}`);

      try {
        console.log('Generating market...');
        const result = await generateMarket(twitterUrl);

        if (!result.success) {
          console.log(`Failed: ${result.reason}`);
          failCount++;
          continue;
        }

        const generatedMarket = result.data;
        console.log(`Market generated!`);
        console.log(`     Question: ${generatedMarket.question}`);
        console.log(`     Probability: ${generatedMarket.probability.value}%`);

        console.log('Creating market on-chain...');
        const assetAddress = (process.env['DEFAULT_ASSET_ADDRESS'] || '') as `0x${string}`;
        const feeBPS = BigInt(process.env['DEFAULT_FEE_BPS'] || '100');

        if (!assetAddress) {
          console.log('DEFAULT_ASSET_ADDRESS not configured, skipping on-chain creation');
          failCount++;
          continue;
        }

        const endDate = new Date(generatedMarket.market.endDate || Date.now());
        const vaultResult = await createMarketVault({
          name: generatedMarket.question,
          maturity: BigInt(Math.floor(endDate.getTime() / 1000)),
          asset: assetAddress,
          feeBPS,
          isOfficial: false,
        });

        if (!vaultResult.success || !vaultResult.marketAddress) {
          console.log(`On chain creation failed: ${vaultResult.error}`);
          failCount++;
          continue;
        }

        const contractAddress = vaultResult.marketAddress;
        const blockchainMarketId = Math.floor(Date.now() / 1000);
        console.log(`Market created on-chain!`);
        console.log(`Contract: ${contractAddress}`);
        console.log(`TX Hash: ${vaultResult.transactionHash}`);
        onChainSuccessCount++;

        console.log('  💾 Saving to database...');
        const marketInput: CreateMarketInput = {
          question: generatedMarket.question,
          description: generatedMarket.description,
          imageUrl: generatedMarket.imageUrl,
          blockchainMarketId,
          totalPoolSize: generatedMarket.market.totalPoolSize || '0',
          totalYieldUntilEnd: generatedMarket.market.totalYieldUntilEnd || '0',
          contractAddress,
          endDate,
          author: {
            name: generatedMarket.author.name,
            username: generatedMarket.author.username,
            userId: generatedMarket.author.userId,
            avatar: generatedMarket.author.avatar,
            verifiedGov: generatedMarket.author.verifiedGov,
            verifiedBlue: generatedMarket.author.verifiedBlue,
            verifiedOrange: generatedMarket.author.verifiedOrange,
          },
          post: {
            pid: generatedMarket.post.pid,
            text: generatedMarket.post.text,
            banner: generatedMarket.post.banner,
          },
          engagement: {
            replies: generatedMarket.engagement.replies,
            reposts: generatedMarket.engagement.reposts,
            likes: generatedMarket.engagement.likes,
            views: generatedMarket.engagement.views,
          },
          source: {
            platform: generatedMarket.source.platform,
            url: generatedMarket.source.url,
          },
          probability: {
            value: generatedMarket.probability.value,
            unit: generatedMarket.probability.unit,
          },
          protocol: generatedMarket.market.protocol
            ? {
                name: generatedMarket.market.protocol.name,
                icon: generatedMarket.market.protocol.icon,
                apy: generatedMarket.market.protocol.apy,
              }
            : undefined,
          token: generatedMarket.market.token
            ? {
                name: generatedMarket.market.token.name,
                icon: generatedMarket.market.token.icon,
              }
            : undefined,
          tvl: generatedMarket.market.tvl
            ? {
                value: generatedMarket.market.tvl.value,
                symbol: generatedMarket.market.tvl.symbol,
              }
            : undefined,
          actions: generatedMarket.actions.map((action) => ({
            label: action.label,
            type: action.type,
          })),
        };

        const savedMarket = await createMarket(marketInput);
        console.log(`Saved to database!`);
        console.log(`Market ID: ${savedMarket.id}`);
        dbSaveSuccessCount++;
        successCount++;
      } catch (error) {
        console.log(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        failCount++;
      }

      if (i < tweets.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`Summary:`);
    console.log(`Total tweets processed: ${tweets.length}`);
    console.log(`Fully successful (generated + on-chain + saved): ${successCount}`);
    console.log(`On-chain markets created: ${onChainSuccessCount}`);
    console.log(`Markets saved to database: ${dbSaveSuccessCount}`);
    console.log(`Failed: ${failCount}`);
    console.log(`${'='.repeat(60)}\n`);
  } catch (error) {
    console.error('Error processing posts:', error);
    process.exit(1);
  }
}

processPostsAndGenerateMarkets();

