import { useState } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../blockchain/contract";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreatePlan() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const { isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first!");
      return;
    }

    if (!name || !price || !duration) {
      toast.error("Please fill in all fields!");
      return;
    }

    const durationInSeconds = BigInt(Number(duration) * 24 * 60 * 60);

    writeContract(
  {
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "createPlan",
    args: [name, parseEther(price), durationInSeconds],
    maxPriorityFeePerGas: BigInt(25000000000), // ✅ add
    maxFeePerGas: BigInt(30000000000),          // ✅ add
  },
      {
        onSuccess: () => {
          toast.success(`Plan "${name}" created on blockchain!`);
          setName("");
          setPrice("");
          setDuration("");
          // Navigate to manage plans after creation
          setTimeout(() => navigate("/manage-plans"), 1500);
        },
        onError: (err) => {
          toast.error(`Failed: ${err.message}`);
        },
      }
    );
  };

  if (!isConnected) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center gap-6 text-white">
        <h1 className="text-3xl font-bold">Create Plan</h1>
        <p className="text-gray-400">Connect your wallet to create plans</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-white">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Create Subscription Plan
      </h1>

      <div className="space-y-6">
        <input
          type="text"
          placeholder="Plan Name (e.g. Basic, Pro)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:border-teal-400"
        />

        <div className="relative">
          <input
            type="number"
            placeholder="Price in POL (e.g. 0.01)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:border-teal-400"
          />
          <span className="absolute right-4 top-4 text-gray-400">POL</span>
        </div>

        <div className="relative">
          <input
            type="number"
            placeholder="Duration in days (e.g. 30)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:border-teal-400"
          />
          <span className="absolute right-4 top-4 text-gray-400">days</span>
        </div>

        <button
          onClick={handleCreate}
          disabled={isPending}
          className="w-full py-3 rounded-xl bg-teal-600 font-semibold
          hover:bg-teal-500 hover:scale-105 transition disabled:opacity-50"
        >
          {isPending ? "Creating on blockchain..." : "Create Plan"}
        </button>
      </div>
    </div>
  );
}