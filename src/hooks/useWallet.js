import { useAccount, useBalance } from "wagmi";

export default function useWalletInfo() {
  const { address, isConnected } = useAccount();

  const { data: balance } = useBalance({
    address,
  });

  return {
    address,
    isConnected,
    balance: balance?.formatted,
    symbol: balance?.symbol,
  };
}