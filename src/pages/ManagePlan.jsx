import { useEffect, useState } from "react";
import { usePublicClient, useAccount } from "wagmi";
import { formatEther } from "viem";
import { CONTRACT_ADDRESS, CONTRACT_ABI, removePlanLocally, isPlanRemoved } from "../blockchain/contract";
import toast from "react-hot-toast";
import { PageHeader, EmptyState, Spinner } from "../components/ui";
import { BriefcaseIcon, PackageIcon } from "../components/icons";

export default function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const publicClient = usePublicClient();
  const { isConnected } = useAccount();

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

  useEffect(() => {
    // Reads on-chain plan data on mount / whenever the client changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicClient]);

  const handleRemove = (plan) => {
    removePlanLocally(plan.id);
    setPlans((prev) => prev.map((p) => (p.id === plan.id ? { ...p, isActive: false } : p)));
    toast.success(`Plan "${plan.name}" removed`);
  };

  const handleRestore = (plan) => {
    const removed = JSON.parse(localStorage.getItem("removedPlans") || "[]");
    const updated = removed.filter((id) => id !== plan.id);
    localStorage.setItem("removedPlans", JSON.stringify(updated));
    setPlans((prev) => prev.map((p) => (p.id === plan.id ? { ...p, isActive: true } : p)));
    toast.success(`Plan "${plan.name}" restored`);
  };

  if (!isConnected) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
          <BriefcaseIcon className="h-7 w-7" />
        </div>
        <h1 className="font-display text-3xl font-semibold text-paper">Manage plans</h1>
        <p className="mt-3 max-w-sm text-paper-muted">Connect your wallet to manage your plans.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <PageHeader accent="violet" title="Manage plans" subtitle="Every plan your contract has ever created, read live from the chain." />

      {loading ? (
        <div className="panel">
          <Spinner label="Loading plans from the blockchain" />
        </div>
      ) : plans.length === 0 ? (
        <EmptyState title="No plans found on contract" description="Create your first plan to see it here." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 transition-colors ${
                plan.isActive ? "border-line bg-surface hover:border-violet-400/30" : "border-line-soft bg-surface/50 opacity-70"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                    <PackageIcon className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-lg font-semibold text-paper">{plan.name}</h2>
                </div>
                <span
                  className={`chip ${
                    plan.isActive ? "border-teal-400/25 text-teal-300" : "border-line text-paper-faint"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${plan.isActive ? "bg-teal-400" : "bg-paper-faint"}`} />
                  {plan.isActive ? "Active" : "Removed"}
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="data-text font-display text-2xl font-semibold text-paper">
                  {formatEther(plan.price)}
                </span>
                <span className="text-sm text-paper-muted">POL · every {plan.duration / 86400} days</span>
              </div>

              <div className="mt-5">
                {plan.isActive ? (
                  <button
                    onClick={() => handleRemove(plan)}
                    className="rounded-lg border border-red-800/60 bg-red-950/40 px-4 py-2 text-sm font-medium text-red-300 transition hover:border-red-500/60 hover:bg-red-900/40"
                  >
                    Remove plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleRestore(plan)}
                    className="rounded-lg border border-teal-800/60 bg-teal-950/30 px-4 py-2 text-sm font-medium text-teal-300 transition hover:border-teal-500/60 hover:bg-teal-900/30"
                  >
                    Restore plan
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
