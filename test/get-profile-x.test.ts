import { describe, expect, it } from 'bun:test';
import { getProfileX } from '../services/get-profile-x.service';
import type { GetProfileXResponse } from '../types/get-profile-x.types';

describe('getProfileX', () => {
  it('should return profile data for a valid username', async () => {
    const result = await getProfileX('elonmusk');

    expect(result).toHaveProperty('initial');
    expect(result).toHaveProperty('final');
    expect(result).toHaveProperty('initialType');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('username');
    expect(result).toHaveProperty('userId');
    expect(result).toHaveProperty('avatar');
    expect(result).toHaveProperty('createdAt');

    expect(result.username).toBe('elonmusk');
    expect(result.initial).toBe('elonmusk');
  });

  it('should return correct types for all fields', async () => {
    const result: GetProfileXResponse = await getProfileX('elonmusk');

    expect(typeof result.initial).toBe('string');
    expect(typeof result.final).toBe('string');
    expect(typeof result.initialType).toBe('string');
    expect(typeof result.name).toBe('string');
    expect(typeof result.username).toBe('string');
    expect(typeof result.userId).toBe('string');
    expect(typeof result.avatar).toBe('string');
    expect(typeof result.createdAt).toBe('string');
  });
});
