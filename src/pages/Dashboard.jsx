import { useAccount, useBalance } from "wagmi";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useBalance({ address });

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const role = params.get("role");

  useEffect(() => {
    if (isConnected && role === "consumer") {
      navigate("/select-service");
    }
  }, [isConnected, role, navigate]);

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
        Dashboard
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-8">

        <div className="p-6 rounded-2xl bg-gray-800 border border-gray-600 
          hover:scale-105 hover:border-teal-400 transition">
          <h2 className="text-lg text-gray-400 mb-2">Wallet</h2>
          <p className="text-xl font-semibold">
            {address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "Not available"}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gray-800 border border-gray-600 
          hover:scale-105 hover:border-teal-400 transition">
          <h2 className="text-lg text-gray-400 mb-2">Balance</h2>
          <p className="text-2xl font-bold">
            {isLoading
              ? "Loading..."
              : data
              ? `${data.formatted} ${data.symbol}`
              : "0"}
          </p>
        </div>

      </div>

      {/* Role Section */}
      <div className="mt-12 text-center">

        {role === "consumer" && (
          <>
            <h2 className="text-xl mb-4">Available Subscriptions</h2>

            <Link to="/select-service">
              <button className="px-8 py-3 rounded-xl bg-gray-800 border border-gray-600 
                hover:scale-105 hover:border-teal-400 transition">
                Choose a Service
              </button>
            </Link>
          </>
        )}

        {role === "provider" && (
          <>
            <h2 className="text-xl mb-4">Service Provider Panel</h2>
            <p className="text-gray-400">
              Here you will be able to create and manage subscription plans.
            </p>
          </>
        )}

        {!role && (
          <p className="text-gray-400">
            Please go back and select a role.
          </p>
        )}

      </div>

    </div>
  );
}