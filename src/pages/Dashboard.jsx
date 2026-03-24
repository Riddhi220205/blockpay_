import { useAccount, useBalance } from "wagmi";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { data } = useBalance({ address });

  if (!isConnected) {
    return <p className="p-10">Please connect your wallet</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Dashboard</h1>

      <p>Address: {address}</p>
      <p>
        Balance: {data?.formatted} {data?.symbol}
      </p>
    </div>
  );
}