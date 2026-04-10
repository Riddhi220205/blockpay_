import { useAccount, useBalance } from "wagmi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useBalance({ address });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) return;

    const params = new URLSearchParams(window.location.search);
    const role = params.get("role");

    console.log("ROLE:", role);

    // ✅ ONLY provider auto redirect
    if (role === "provider") {
      navigate("/provider-dashboard");
    }

    // ❌ DO NOT redirect consumer
  }, [isConnected, navigate]);

  // 🔐 Not connected
  if (!isConnected) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center gap-6 text-white">
        <h1 className="text-4xl font-bold">
          Welcome to BlockPay!!
        </h1>
        <p className="text-gray-400">
          Use the "Connect Wallet" button above to continue
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-white">

      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Consumer Dashboard
      </h1>

      {/* Wallet + Balance */}
      <div className="grid md:grid-cols-2 gap-8">

        <div className="p-6 rounded-2xl bg-gray-800 border border-gray-600 
          hover:scale-105 hover:border-teal-400 transition">
          <h2 className="text-gray-400 mb-2">Wallet</h2>
          <p className="text-xl font-semibold">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 border border-gray-600 
          hover:scale-105 hover:border-teal-400 transition">
          <h2 className="text-gray-400 mb-2">Balance</h2>
          <p className="text-xl font-bold">
            {isLoading ? "Loading..." : `${data?.formatted || 0} ${data?.symbol || ""}`}
          </p>
        </div>

      </div>

      {/* Consumer Action */}
      <div className="mt-12 text-center">
        <h2 className="text-xl mb-4">Start Subscription</h2>

        <button
          onClick={() => navigate("/select-service")}
          className="px-8 py-3 rounded-xl bg-gray-800 border border-gray-600 
          hover:scale-105 hover:border-teal-400 transition"
        >
          Choose a Service
        </button>
      </div>

    </div>
  );
}