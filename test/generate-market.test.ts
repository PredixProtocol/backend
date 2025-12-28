import { describe, expect, it, spyOn } from 'bun:test';
import * as aiModule from '../lib/ai';
import { generateMarket } from '../services/generate-market.service';
import * as getPostByPidXModule from '../services/get-post-by-pid-x.service';
import type { AIAnalysisResult } from '../types/generate-market.types';
import type { GetPostByPidXResponse } from '../types/get-post-by-pid-x.types';

const mockPostResponse: GetPostByPidXResponse = {
  result: {
    tweetResult: {
      result: {
        __typename: 'Tweet',
        rest_id: '1234567890',
        has_birdwatch_notes: false,
        core: {
          user_results: {
            result: {
              __typename: 'User',
              id: 'user123',
              rest_id: '44196397',
              affiliates_highlighted_label: {
                label: {
                  url: { url: '', urlType: '' },
                  badge: { url: '' },
                  description: '',
                  userLabelType: 'GovernmentLabel',
                  userLabelDisplayType: '',
                },
              },
              has_graduated_access: true,
              parody_commentary_fan_label: '',
              is_blue_verified: true,
              profile_image_shape: 'Circle',
              legacy: {
                following: false,
                can_dm: false,
                can_media_tag: true,
                created_at: '2009-05-18T00:00:00Z',
                default_profile: false,
                default_profile_image: false,
                description: 'Test user',
                entities: { description: { urls: [] } },
                fast_followers_count: 0,
                favourites_count: 1000,
                followers_count: 1000000,
                friends_count: 100,
                has_custom_timelines: true,
                is_translator: false,
                listed_count: 1000,
                location: 'USA',
                media_count: 500,
                name: 'Donald J. Trump',
                normal_followers_count: 1000000,
                pinned_tweet_ids_str: [],
                possibly_sensitive: false,
                profile_banner_url: 'https://pbs.twimg.com/profile_banners/44196397/123',
                profile_image_url_https:
                  'https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_normal.jpg',
                profile_interstitial_type: '',
                screen_name: 'realDonaldTrump',
                statuses_count: 50000,
                translator_type: 'none',
                verified: true,
                want_retweets: true,
                withheld_in_countries: [],
              },
              professional: {
                rest_id: 'prof123',
                professional_type: 'Business',
                category: [],
              },
              tipjar_settings: { is_enabled: false },
              super_follow_eligible: false,
              verification_info: {
                is_identity_verified: true,
                reason: {
                  description: {
                    text: 'This account is verified',
                    entities: [],
                  },
                  verified_since_msec: '1609459200000',
                },
              },
            },
          },
        },
        unmention_data: {},
        edit_control: {
          edit_tweet_ids: ['1234567890'],
          editable_until_msecs: '0',
          is_edit_eligible: false,
          edits_remaining: '0',
        },
        is_translatable: true,
        views: { count: '81000000', state: 'EnabledWithCount' },
        source: '<a href="https://mobile.twitter.com">Twitter</a>',
        note_tweet: {
          is_expandable: false,
          note_tweet_results: {
            result: {
              id: 'note1',
              text: 'Matt Van Epps will win the TN-07 congressional race. Mark my words!',
              entity_set: { hashtags: [], symbols: [], urls: [], user_mentions: [] },
            },
          },
        },
        grok_analysis_button: false,
        legacy: {
          bookmark_count: 1000,
          bookmarked: false,
          created_at: '2025-12-24T10:30:00Z',
          conversation_id_str: '1234567890',
          display_text_range: [0, 100],
          entities: { hashtags: [], symbols: [], timestamps: [], urls: [], user_mentions: [] },
          favorite_count: 605000,
          favorited: false,
          full_text: 'Matt Van Epps will win the TN-07 congressional race. Mark my words!',
          is_quote_status: false,
          lang: 'en',
          quote_count: 5000,
          reply_count: 37000,
          retweet_count: 91000,
          retweeted: false,
          user_id_str: '44196397',
          id_str: '1234567890',
        },
      },
    },
  },
};

const mockAISuccessResponse: AIAnalysisResult = {
  possible: true,
  question:
    "Will Matt Van Epps win the U.S. House election in Tennessee's 7th Congressional District?",
  description:
    'This market resolves YES if Matt Van Epps is officially declared the winner of the TN-07 election.',
  probability: 30,
};

const mockAIFailureResponse: AIAnalysisResult = {
  possible: false,
  rejectionReason: 'This post is just a casual greeting with no predictable outcome.',
};

describe('generateMarket', () => {
  describe('URL parsing', () => {
    it('should reject invalid URLs', async () => {
      const result = await generateMarket('not-a-valid-url');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.reason).toContain('Invalid X/Twitter URL');
      }
    });

    it('should accept x.com URLs', async () => {
      const getPostSpy = spyOn(getPostByPidXModule, 'getPostByPidX').mockResolvedValue(
        mockPostResponse
      );
      const aiSpy = spyOn(aiModule, 'analyzePostForMarket').mockResolvedValue(
        mockAISuccessResponse
      );

      await generateMarket('https://x.com/realDonaldTrump/status/1234567890');

      expect(getPostSpy).toHaveBeenCalledWith('1234567890');

      getPostSpy.mockRestore();
      aiSpy.mockRestore();
    });

    it('should accept twitter.com URLs', async () => {
      const getPostSpy = spyOn(getPostByPidXModule, 'getPostByPidX').mockResolvedValue(
        mockPostResponse
      );
      const aiSpy = spyOn(aiModule, 'analyzePostForMarket').mockResolvedValue(
        mockAISuccessResponse
      );

      await generateMarket('https://twitter.com/user/status/9876543210');

      expect(getPostSpy).toHaveBeenCalledWith('9876543210');

      getPostSpy.mockRestore();
      aiSpy.mockRestore();
    });
  });

  describe('successful market generation', () => {
    it('should return success with market data when AI approves', async () => {
      const getPostSpy = spyOn(getPostByPidXModule, 'getPostByPidX').mockResolvedValue(
        mockPostResponse
      );
      const aiSpy = spyOn(aiModule, 'analyzePostForMarket').mockResolvedValue(
        mockAISuccessResponse
      );

      const result = await generateMarket('https://x.com/realDonaldTrump/status/1234567890');

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.question).toBe(mockAISuccessResponse.question);
        expect(result.data.description).toBe(mockAISuccessResponse.description);
        expect(result.data.probability.value).toBe(30);
        expect(result.data.probability.unit).toBe('percent');
        expect(result.data.author.name).toBe('Donald J. Trump');
        expect(result.data.author.username).toBe('@realDonaldTrump');
        expect(result.data.author.verifiedBlue).toBe(true);
        expect(result.data.author.verifiedGov).toBe(true);
        expect(result.data.engagement.replies).toBe(37000);
        expect(result.data.engagement.likes).toBe(605000);
        expect(result.data.engagement.reposts).toBe(91000);
        expect(result.data.engagement.views).toBe(81000000);
        expect(result.data.source.platform).toBe('x');
        expect(result.data.actions).toHaveLength(2);
        expect(result.data.actions[0]?.label).toBe('YES');
        expect(result.data.actions[1]?.label).toBe('NO');
      }

      getPostSpy.mockRestore();
      aiSpy.mockRestore();
    });
  });

  describe('market rejection', () => {
    it('should return failure when AI rejects the post', async () => {
      const getPostSpy = spyOn(getPostByPidXModule, 'getPostByPidX').mockResolvedValue(
        mockPostResponse
      );
      const aiSpy = spyOn(aiModule, 'analyzePostForMarket').mockResolvedValue(
        mockAIFailureResponse
      );

      const result = await generateMarket('https://x.com/user/status/1234567890');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.reason).toBe(mockAIFailureResponse.rejectionReason);
      }

      getPostSpy.mockRestore();
      aiSpy.mockRestore();
    });
  });

  describe('error handling', () => {
    it('should handle post fetch failures gracefully', async () => {
      const getPostSpy = spyOn(getPostByPidXModule, 'getPostByPidX').mockRejectedValue(
        new Error('Network error')
      );

      const result = await generateMarket('https://x.com/user/status/1234567890');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.reason).toContain('Failed to fetch post data');
      }

      getPostSpy.mockRestore();
    });

    it('should handle AI analysis failures gracefully', async () => {
      const getPostSpy = spyOn(getPostByPidXModule, 'getPostByPidX').mockResolvedValue(
        mockPostResponse
      );
      const aiSpy = spyOn(aiModule, 'analyzePostForMarket').mockRejectedValue(
        new Error('OpenAI API error')
      );

      const result = await generateMarket('https://x.com/user/status/1234567890');

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.reason).toContain('AI analysis failed');
      }

      getPostSpy.mockRestore();
      aiSpy.mockRestore();
    });
  });
});
