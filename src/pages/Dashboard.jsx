import { useAccount, useBalance } from "wagmi";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useBalance({ address });

  // 🔐 Not connected → clean login screen
  if (!isConnected) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center gap-6">
        
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Welcome to BlockPay!!
        </h1>

        <p className="text-gray-400 text-lg"><marquee behavior="scroll" direction="left" scrollamount="5">
          Use the "Connect Wallet" button above to continue</marquee>
        </p>

      </div>
    );
  }

  // ✅ Dashboard UI
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Dashboard
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Wallet Card */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:scale-105 transition duration-300">
          <h2 className="text-lg text-gray-400 mb-2">Wallet</h2>
          <p className="text-xl font-semibold">
            {address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "Not available"}
          </p>
        </div>

        {/* Balance Card */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg hover:scale-105 transition duration-300">
          <h2 className="text-lg text-gray-400 mb-2">Balance</h2>
          <p className="text-2xl font-bold text-purple-400">
            {isLoading
              ? "Loading..."
              : data
              ? `${data.formatted} ${data.symbol}`
              : "0"}
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="mt-12 flex justify-center">
        <Link to="/plans">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl font-semibold hover:opacity-90 hover:scale-105 transition duration-300">
            View Subscription Plans
          </button>
        </Link>
      </div>

    </div>
  );
}