import { useEffect, useState } from "react";
import { usePublicClient, useAccount } from "wagmi";
import { formatEther } from "viem";
import { CONTRACT_ADDRESS, CONTRACT_ABI, removePlanLocally, isPlanRemoved } from "../blockchain/contract";
import toast from "react-hot-toast";

export default function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const publicClient = usePublicClient();
  const { isConnected } = useAccount();

  useEffect(() => {
    loadPlans();
  }, [publicClient]);

  const loadPlans = async () => {
    if (!publicClient) return;
    setLoading(true);
    try {
      const planCount = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "planCount",
      });

      const results = [];
      for (let i = 1; i <= Number(planCount); i++) {
        const plan = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "plans",
          args: [BigInt(i)],
        });
        results.push({
          id: i,
          name: plan[1],
          price: plan[2],
          duration: Number(plan[3]),
          isActive: !isPlanRemoved(i), // frontend-only active state
        });
      }
      setPlans(results);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load plans");
    }
    setLoading(false);
  };

  const handleRemove = (plan) => {
    removePlanLocally(plan.id);
    setPlans((prev) =>
      prev.map((p) => (p.id === plan.id ? { ...p, isActive: false } : p))
    );
    toast.success(`Plan "${plan.name}" removed`);
  };

  const handleRestore = (plan) => {
    // Remove from localStorage removed list
    const removed = JSON.parse(localStorage.getItem("removedPlans") || "[]");
    const updated = removed.filter((id) => id !== plan.id);
    localStorage.setItem("removedPlans", JSON.stringify(updated));
    setPlans((prev) =>
      prev.map((p) => (p.id === plan.id ? { ...p, isActive: true } : p))
    );
    toast.success(`Plan "${plan.name}" restored`);
  };

  if (!isConnected) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center gap-6 text-white">
        <h1 className="text-3xl font-bold">Manage Plans</h1>
        <p className="text-gray-400">Connect your wallet to manage plans</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-white">
      <h1 className="text-3xl font-bold mb-10 text-center">Manage Plans</h1>

      {loading ? (
        <p className="text-center text-teal-400 animate-pulse">Loading plans from blockchain...</p>
      ) : plans.length === 0 ? (
        <p className="text-center text-gray-400">No plans found on contract</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl bg-gray-800 border transition ${
                plan.isActive ? "border-gray-600 hover:border-teal-400" : "border-red-800 opacity-60"
              }`}
            >
              <h2 className="text-xl font-semibold">{plan.name}</h2>

              <p className="text-gray-400 mt-2">
                Price: <span className="text-teal-400">{formatEther(plan.price)} ETH</span>
              </p>

              <p className="text-gray-400">
                Duration: {plan.duration / 86400} days
              </p>

              <p className={`mt-2 font-semibold ${plan.isActive ? "text-green-400" : "text-red-400"}`}>
                {plan.isActive ? "● Active" : "● Removed"}
              </p>

              <div className="mt-4 flex gap-3">
                {plan.isActive ? (
                  <button
                    onClick={() => handleRemove(plan)}
                    className="px-4 py-2 rounded-lg bg-red-900/50 border border-red-600 
                    hover:border-red-400 hover:bg-red-800/50 transition text-red-300"
                  >
                    Remove Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleRestore(plan)}
                    className="px-4 py-2 rounded-lg bg-green-900/50 border border-green-600 
                    hover:border-green-400 transition text-green-300"
                  >
                    Restore Plan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}