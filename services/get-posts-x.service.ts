import { config } from 'dotenv';
import type { GetPostsXResponse } from '../types/get-posts-x.types';
import { getProfileX } from './get-profile-x.service';

config();

export const getPostsX = async (username: string): Promise<GetPostsXResponse> => {
  const profile = await getProfileX(username);

  const userId = profile.userId;

  const res = await fetch(
    'https://twitter241.p.rapidapi.com/user-tweets?user=' + userId + '&count=50',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env['X_RAPIDAPI_API_KEY']!,
        'x-rapidapi-host': 'twitter241.p.rapidapi.com',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = (await res.json()) as GetPostsXResponse;

  return data;
};
