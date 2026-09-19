import { useState } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { parseEther } from "viem";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../blockchain/contract";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PageHeader } from "../components/ui";
import { BriefcaseIcon, PackageIcon } from "../components/icons";

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
        maxPriorityFeePerGas: BigInt(25000000000), // 2.5 gwei
        maxFeePerGas: BigInt(30000000000), // 3 gwei, must be >= priority fee
      },
      {
        onSuccess: () => {
          toast.success(`Plan "${name}" created on blockchain!`);
          setName("");
          setPrice("");
          setDuration("");
          setTimeout(() => navigate("/provider/manage-plans"), 1500);
        },
        onError: (err) => {
          toast.error(`Failed: ${err.message}`);
        },
      }
    );
  };

  if (!isConnected) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
          <BriefcaseIcon className="h-7 w-7" />
        </div>
        <h1 className="font-display text-3xl font-semibold text-paper">Create a plan</h1>
        <p className="mt-3 max-w-sm text-paper-muted">Connect your wallet to create subscription plans.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:px-10">
      <PageHeader accent="violet" title="Create a plan" subtitle="This writes a new plan directly to the contract." />

      <div className="grid gap-10 sm:grid-cols-5">
        <div className="space-y-5 sm:col-span-3">
          <div>
            <label className="label">Plan name</label>
            <input
              type="text"
              placeholder="e.g. Basic, Pro"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field"
            />
          </div>

          <div>
            <label className="label">Price</label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="field pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-paper-faint">POL</span>
            </div>
          </div>

          <div>
            <label className="label">Billing duration</label>
            <div className="relative">
              <input
                type="number"
                placeholder="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="field pr-16"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-paper-faint">days</span>
            </div>
          </div>

          <button onClick={handleCreate} disabled={isPending} className="btn-violet w-full">
            {isPending ? "Creating on blockchain…" : "Create plan"}
          </button>
        </div>

        <div className="sm:col-span-2">
          <p className="label mb-3">Preview</p>
          <div className="panel p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
              <PackageIcon className="h-5 w-5" />
            </div>
            <p className="font-display text-lg font-semibold text-paper">{name || "Plan name"}</p>
            <p className="mt-1 font-display text-2xl font-semibold text-paper">
              {price || "0.00"} <span className="text-sm font-medium text-paper-muted">POL</span>
            </p>
            <p className="mt-1 text-sm text-paper-muted">
              billed every {duration || "—"} day{duration === "1" ? "" : "s"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
