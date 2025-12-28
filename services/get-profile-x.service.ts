import type { GetProfileXResponse } from '../types/get-profile-x.types';

export const getProfileX = async (username: string): Promise<GetProfileXResponse> => {
  const res = await fetch('https://tweethunter.io/api/convert2?inputString=' + username, {
    headers: {
      accept: '*/*',
      'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      priority: 'u=1, i',
      'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      cookie:
        '_gcl_au=1.1.1030175958.1766904134; _ga_BH3EC90N3P=GS2.1.s1766904134$o1$g0$t1766904134$j60$l0$h0; _ga=GA1.1.2104819552.1766904134',
      Referer: 'https://tweethunter.io/twitter-id-converter',
    },
    body: null,
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = (await res.json()) as GetProfileXResponse;

  return data;
};
