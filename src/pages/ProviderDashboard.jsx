import { useAccount, useBalance } from "wagmi";
import { useNavigate } from "react-router-dom";

export default function ProviderDashboard() {
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useBalance({ address });
  const navigate = useNavigate();

  if (!isConnected) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center gap-6 text-white">
        <h1 className="text-4xl font-bold">Provider Dashboard</h1>
        <p className="text-gray-400">Connect your wallet to manage plans</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">Provider Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 rounded-2xl bg-gray-800 border border-gray-600 hover:scale-105 hover:border-teal-400 transition">
          <h2 className="text-gray-400 mb-2">Wallet</h2>
          <p className="text-xl font-semibold">{address.slice(0, 6)}...{address.slice(-4)}</p>
        </div>
        <div className="p-6 rounded-2xl bg-gray-800 border border-gray-600 hover:scale-105 hover:border-teal-400 transition">
          <h2 className="text-gray-400 mb-2">Balance</h2>
          <p className="text-xl font-bold">
            {isLoading ? "Loading..." : `${data?.formatted || 0} ${data?.symbol || ""}`}
          </p>
        </div>
      </div>

      {/* Provider Actions — no subscription options */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <button
          onClick={() => navigate("/provider/create-plan")}
          className="px-8 py-4 rounded-xl bg-gray-800 border border-gray-600 hover:scale-105 hover:border-teal-400 transition text-lg"
        >
          ➕ Create Plan
        </button>
        <button
          onClick={() => navigate("/provider/analytics")}
          className="px-8 py-4 rounded-xl bg-gray-800 border border-gray-600 hover:scale-105 hover:border-teal-400 transition text-lg"
        >
          📊 Analytics
        </button>
      </div>
    </div>
  );
}