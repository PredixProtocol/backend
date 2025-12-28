import { describe, expect, it } from 'bun:test';
import { getPostsX } from '../services/get-posts-x.service';
import type { GetPostsXResponse } from '../types/get-posts-x.types';

describe('getPostsX', () => {
  it(
    'should return posts data for a valid username',
    async () => {
      const result = await getPostsX('elonmusk');

      expect(result).toHaveProperty('cursor');
      expect(result).toHaveProperty('result');

      expect(result.cursor).toHaveProperty('bottom');
      expect(result.cursor).toHaveProperty('top');

      expect(result.result).toHaveProperty('timeline');
      expect(result.result.timeline).toHaveProperty('instructions');
    },
    { timeout: 15000 }
  );

  it(
    'should return correct types for cursor fields',
    async () => {
      const result: GetPostsXResponse = await getPostsX('elonmusk');

      expect(typeof result.cursor.bottom).toBe('string');
      expect(typeof result.cursor.top).toBe('string');
    },
    { timeout: 15000 }
  );

  it(
    'should return timeline with instructions array',
    async () => {
      const result = await getPostsX('elonmusk');

      expect(Array.isArray(result.result.timeline.instructions)).toBe(true);
      expect(result.result.timeline.instructions.length).toBeGreaterThan(0);
    },
    { timeout: 15000 }
  );

  it('should throw error for invalid response', async () => {
    await expect(
      getPostsX('this_user_definitely_does_not_exist_12345678901234567890')
    ).rejects.toThrow();
  });
});
