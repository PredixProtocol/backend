import { createPublicClient, createWalletClient, http, type Address } from 'viem';
import { mantleSepoliaTestnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

export const MARKET_FACTORY_COMMUNITY_ABI = [
  {
    type: 'function',
    name: 'createCommunityMarket',
    inputs: [
      { name: 'name', type: 'string', internalType: 'string' },
      { name: 'maturity', type: 'uint256', internalType: 'uint256' },
      { name: 'asset', type: 'address', internalType: 'address' },
      { name: 'feeBPS', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'MarketCreated',
    inputs: [
      { name: 'marketId', type: 'uint256', indexed: true, internalType: 'uint256' },
      { name: 'creator', type: 'address', indexed: true, internalType: 'address' },
      { name: 'market', type: 'address', indexed: true, internalType: 'address' },
      { name: 'name', type: 'string', indexed: false, internalType: 'string' },
      { name: 'maturity', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'asset', type: 'address', indexed: false, internalType: 'address' },
    ],
  }
] as const;

export const MARKET_FACTORY_OFFICIAL_ABI = [
  {
    type: 'function',
    name: 'createOfficialMarket',
    inputs: [
      { name: 'name', type: 'string', internalType: 'string' },
      { name: 'maturity', type: 'uint256', internalType: 'uint256' },
      { name: 'asset', type: 'address', internalType: 'address' },
      { name: 'feeBPS', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'MarketCreated',
    inputs: [
      { name: 'marketId', type: 'uint256', indexed: true, internalType: 'uint256' },
      { name: 'creator', type: 'address', indexed: true, internalType: 'address' },
      { name: 'market', type: 'address', indexed: true, internalType: 'address' },
      { name: 'name', type: 'string', indexed: false, internalType: 'string' },
      { name: 'maturity', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'asset', type: 'address', indexed: false, internalType: 'address' },
    ],
  }
] as const;

export const MARKET_FACTORY_ADDRESS = '0xCc712b4d60fefFC16d5b89F533A7681e76B399d8' as Address;

export const publicClient = createPublicClient({
  chain: mantleSepoliaTestnet,
  transport: http(),
});


export function createWalletClientFromPrivateKey(privateKey: string) {
  const account = privateKeyToAccount(privateKey as `0x${string}`);

  return createWalletClient({
    account,
    chain: mantleSepoliaTestnet,
    transport: http(),
  });
}
