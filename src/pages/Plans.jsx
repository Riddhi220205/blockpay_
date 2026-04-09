import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../blockchain/contract";
import toast from "react-hot-toast";

const PLANS = [
  { id: 1, name: "Basic", price: "0.01", description: "Perfect for beginners" },
  { id: 2, name: "Pro", price: "0.05", description: "Best for power users" },
];

export default function Plans() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { writeContract, isPending } = useWriteContract();
  const selectedService = location.state?.service;

  if (!selectedService) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center gap-6 text-white">
        <h1 className="text-3xl font-bold text-red-400">No Service Selected</h1>
        <p className="text-gray-400">Please select a service first to view plans.</p>
        <button
          onClick={() => navigate("/select-service")}
          className="px-6 py-3 bg-green-600 rounded-xl font-semibold hover:scale-105 transition"
        >
          Go to Services
        </button>
      </div>
    );
  }

  const handleSubscribe = (plan) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first!");
      return;
    }
    writeContract(
      {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "subscribe",
        args: [BigInt(plan.id)],
        value: parseEther(plan.price),
      },
      {
        onSuccess: () => {
          toast.success(`Subscribed to ${plan.name} plan!`);
          setSelectedPlan(plan.name);
        },
        onError: (err) => {
          toast.error(`Failed: ${err.message}`);
        },
      }
    );
  };

  return (
    <div className="min-h-screen px-6 py-12 text-white max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-2">Subscription Plans</h1>
        <p className="text-gray-400">Choose a plan that fits your needs</p>
        <h2 className="text-lg mt-4 text-teal-400">Service: {selectedService}</h2>
        {selectedPlan && (
          <p className="mt-4 text-green-400 font-semibold text-lg">
            ✅ Subscribed to: {selectedPlan}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.name)}
            className={`p-8 rounded-3xl bg-gray-800 border cursor-pointer transition hover:scale-105 ${
              selectedPlan === plan.name ? "border-green-400" : "border-gray-600"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-gray-400 mb-6">{plan.description}</p>
            <p className="text-3xl font-bold text-teal-400 mb-6">{plan.price} ETH</p>
            <button
              onClick={(e) => { e.stopPropagation(); handleSubscribe(plan); }}
              disabled={isPending}
              className="w-full py-3 rounded-xl bg-green-600 font-semibold hover:bg-green-500 transition disabled:opacity-50"
            >
              {isPending ? "Confirming..." : "Subscribe"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}