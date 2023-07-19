import { contractList } from "@/util/config";
import { CommunityFaucetV2, CommunityFaucetV2__factory } from "@/util/contract";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3 } from "./useWeb3";

import type { ValueOf } from "@/types/util";

const getContract = (
  type: ValueOf<typeof contractList>,
  provider?: ethers.providers.Provider | ethers.Signer
) =>
  CommunityFaucetV2__factory.connect(
    type.address,
    provider || new ethers.providers.JsonRpcProvider(type.rpc)
  );

type Option = Partial<{
  fetchOnly: boolean;
  fallback: boolean;
  cb?: (
    contract: CommunityFaucetV2,
    provider: ethers.providers.Provider
  ) => void | Promise<void>;
}>;

export const useContract = <T extends keyof typeof contractList>(
  type: T,
  { fetchOnly, fallback, cb }: Option = {}
) => {
  const contractType = contractList[type];
  const { provider, chainId } = useWeb3();
  const [contract, setContract] = useState<null | CommunityFaucetV2>(
    fetchOnly ? getContract(contractType) : null
  );
  const isTargetChain = Number(contractType.chainId) === Number(chainId);

  useEffect(() => {
    if (fetchOnly) {
      setContract(getContract(contractType));
    } else if (fallback && !(provider && isTargetChain)) {
      setContract(getContract(contractType));
    } else if (provider && isTargetChain) {
      setContract(getContract(contractType, provider.getSigner()));
    } else {
      setContract(null);
    }
  }, [type, provider, chainId, fetchOnly, fallback]);

  useEffect(() => {
    if (contract) {
      cb &&
        void cb(
          contract,
          new ethers.providers.JsonRpcProvider(contractType.rpc)
        );
    }
  }, [contract]);

  return contract;
};
