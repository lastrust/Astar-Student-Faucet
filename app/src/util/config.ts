export const chainParameters = {
  "0x89": {
    chainId: "0x89",
    blockExplorerUrls: ["https://polygonscan.com/"],
    chainName: "Polygon Mainnet",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "MATIC",
      symbol: "MATIC",
    },
    rpcUrls: ["https://polygon-rpc.com/"],
  },
  "0x13881": {
    chainId: "0x13881",
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    chainName: "Matic Mumbai",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "MATIC",
      symbol: "MATIC",
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
  },
  "0x51": {
    chainId: "0x51",
    blockExplorerUrls: ["https://shibuya.subscan.io"],
    chainName: "Shibuya Network",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "SBY",
      symbol: "SBY",
    },
    rpcUrls: ["https://rpc.shibuya.astar.network:8545"],
  },
  "0x250": {
    chainId: "0x250",
    blockExplorerUrls: ["https://astar.subscan.io"],
    chainName: "Astar Network",
    iconUrls: [],
    nativeCurrency: {
      decimals: 18,
      name: "ASTR",
      symbol: "ASTR",
    },
    rpcUrls: ["https://rpc.astar.network:8545"],
  },
};

export const contractList = {
  astar: {
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    rpc: chainParameters["0x250"].rpcUrls[0],
    chainId: "0x250",
  },
};