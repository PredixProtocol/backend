import type { GetPostByPidXResponse } from '../types/get-post-by-pid-x.types';

export const getPostByPidX = async (pid: string) => {
  const res = await fetch('https://twitter241.p.rapidapi.com/tweet-v2?pid=' + pid, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env['X_RAPIDAPI_API_KEY']!,
      'x-rapidapi-host': 'twitter241.p.rapidapi.com',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = (await res.json()) as GetPostByPidXResponse;

  return data;
};
