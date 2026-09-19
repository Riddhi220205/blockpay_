import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../blockchain/contract";
import toast from "react-hot-toast";
import { PageHeader, EmptyState } from "../components/ui";
import { CheckIcon, PackageIcon } from "../components/icons";

const PLANS = [
  { id: 1, name: "Basic", price: "0.01", description: "Perfect for beginners" },
  { id: 2, name: "Pro", price: "0.05", description: "Best for power users" },
];

export default function Plans() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [pendingPlanId, setPendingPlanId] = useState(null);
  const { writeContract } = useWriteContract();
  const selectedService = location.state?.service;

  if (!selectedService) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <EmptyState
          title="No service selected"
          description="Pick a service first so we know what these plans apply to."
          action={
            <button onClick={() => navigate("/select-service")} className="btn-primary">
              Go to services
            </button>
          }
        />
      </div>
    );
  }

  const handleSubscribe = (plan) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first!");
      return;
    }

    setPendingPlanId(plan.id);

    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "subscribe",
        args: [BigInt(plan.id)],
        value: parseEther(plan.price),
        gas: BigInt(100000),
        maxPriorityFeePerGas: BigInt(25000000000), // 2.5 gwei
        maxFeePerGas: BigInt(30000000000), // 3 gwei, must be >= priority fee
      },
      {
        onSuccess: () => {
          toast.success(`Subscribed to ${plan.name} plan!`);
          setSelectedPlan(plan.name);
          setPendingPlanId(null);
        },
        onError: (err) => {
          toast.error(`Failed: ${err.message}`);
          setPendingPlanId(null);
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <PageHeader
        eyebrow={`Service: ${selectedService}`}
        title="Choose a plan"
        subtitle="Payment happens in one transaction, straight to the contract — no card, no processor."
      />

      {selectedPlan && (
        <div className="mb-8 flex items-center gap-2 rounded-xl border border-teal-400/25 bg-teal-400/10 px-4 py-3 text-sm font-medium text-teal-300">
          <CheckIcon className="h-4 w-4" />
          Subscribed to {selectedPlan}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {PLANS.map((plan) => {
          const isThisPlanPending = pendingPlanId === plan.id;
          const isPro = plan.name === "Pro";

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col gap-6 rounded-3xl border p-8 transition-colors ${
                isPro ? "border-teal-400/30 bg-surface" : "border-line bg-surface"
              }`}
            >
              {isPro && (
                <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 px-3 py-1 text-xs font-semibold text-canvas">
                  Most popular
                </span>
              )}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
                <PackageIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-paper">{plan.name}</h2>
                <p className="mt-1 text-paper-muted">{plan.description}</p>
              </div>
              <p className="font-display text-4xl font-semibold text-paper">
                {plan.price} <span className="text-lg font-medium text-paper-muted">POL</span>
              </p>
              <button
                onClick={() => handleSubscribe(plan)}
                disabled={isThisPlanPending}
                className="btn-primary w-full"
              >
                {isThisPlanPending ? "Confirming…" : "Subscribe"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
