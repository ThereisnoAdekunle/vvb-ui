// ============================================================
// Global Config Types
// ============================================================
export interface VVBContracts {
  token: string;
  nft: string;
  staking: string;
  gameNft: string;
  burner: string;
  marketplace: string;
}

export interface VVBConfig {
  chainId: number;
  chainIdHex: string;
  rpc: string;
  explorer: string;
  website: string;
  launchpadRoot: string;
  launchpadTokenUrl: string;
  contracts: VVBContracts;
  tokenAbi: string[];
  nftAbi: string[];
  stakingAbi: string[];
  gameNftAbi: string[];
  burnerAbi: string[];
  marketplaceAbi: string[];
  threshold: string;
  maxPerWallet: number;
  gameMinScore: number;
}

// ============================================================
// Mystery Box Types
// ============================================================
export type TierKey = "common" | "uncommon" | "rare" | "legendary";

export interface TokenInfo {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  enabled?: boolean;
}

export interface Drop {
  id: string;
  tier: TierKey;
  token: TokenInfo;
  amount: number;
  rolledAt: number;
}

export interface ClaimStatus {
  kind: "info" | "ok" | "err" | "";
  text: string;
}

// ============================================================
// Mission Types
// ============================================================
export interface Mission {
  id: string;
  title: string;
  desc: string;
  target: number;
  type: "kills" | "wave" | "time" | "boxes";
  progress: number;
  completed: boolean;
}
