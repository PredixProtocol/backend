import { decodeEventLog, type Address } from 'viem';
import {
  createWalletClientFromPrivateKey,
  MARKET_FACTORY_ADDRESS,
  MARKET_FACTORY_COMMUNITY_ABI,
  MARKET_FACTORY_OFFICIAL_ABI,
  publicClient,
} from '../config/contracts';

export interface CreateMarketVaultParams {
  name: string;
  maturity: bigint;
  asset: Address;
  feeBPS: bigint;
  isOfficial?: boolean;
}

export interface CreateMarketVaultResult {
  success: boolean;
  marketAddress?: Address;
  transactionHash?: string;
  blockNumber?: bigint;
  error?: string;
}

export async function createMarketVault(
  params: CreateMarketVaultParams
): Promise<CreateMarketVaultResult> {
  try {
    const privateKey = process.env['WALLET_PRIVATE_KEY'];

    if (!privateKey) {
      return {
        success: false,
        error: 'WALLET_PRIVATE_KEY not configured in environment variables',
      };
    }

    const walletClient = createWalletClientFromPrivateKey(privateKey);
    const abi = params.isOfficial ? MARKET_FACTORY_OFFICIAL_ABI : MARKET_FACTORY_COMMUNITY_ABI;
    const functionName = params.isOfficial ? 'createOfficialMarket' : 'createCommunityMarket';

    const hash = await walletClient.writeContract({
      address: MARKET_FACTORY_ADDRESS,
      abi,
      functionName,
      args: [params.name, params.maturity, params.asset, params.feeBPS],
      account: walletClient.account,
    });

    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
    });

    let marketAddress: Address | undefined;

    if (receipt.logs.length > 0) {
      try {
        for (let i = 0; i < receipt.logs.length; i++) {
          const log = receipt.logs[i];
          if (!log) continue;
          if (
            log.address.toLowerCase() === MARKET_FACTORY_ADDRESS.toLowerCase() &&
            log.topics.length >= 3 &&
            log.topics[2]
          ) {
            marketAddress = `0x${log.topics[2].slice(-40)}` as Address;
            break;
          }

          try {
            const decodedLog = decodeEventLog({
              abi,
              data: log.data,
              topics: log.topics,
            });

            if (decodedLog.eventName === 'MarketCreated') {
              marketAddress = decodedLog.args.market as Address;
              break;
            }
          } catch (e) {
            continue;
          }
        }
      } catch (error) {
        console.error('Error decoding event log:', error);
      }
    }

    return {
      success: true,
      marketAddress,
      transactionHash: hash,
      blockNumber: receipt.blockNumber,
    };
  } catch (error) {
    console.error('Create market vault error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function getMarketDetails(marketAddress: Address) {
  try {
    return {
      success: true,
      address: marketAddress,
    };
  } catch (error) {
    console.error('Get market details error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
