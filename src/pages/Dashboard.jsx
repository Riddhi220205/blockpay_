import { useAccount, useBalance, useReadContract } from "wagmi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../blockchain/contract";
import { PageHeader, StatRow, StatBlock, EmptyState, Spinner, FadeIn } from "../components/ui";
import { WalletIcon, PackageIcon, ClockIcon, ArrowRightIcon } from "../components/icons";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { data: balance, isLoading: balanceLoading } = useBalance({ address });
  const navigate = useNavigate();
  // Snapshot "now" once rather than calling Date.now() during render.
  const [now] = useState(() => Date.now());

  useEffect(() => {
    if (!isConnected) return;
    const role = new URLSearchParams(window.location.search).get("role");
    if (role === "provider") navigate("/provider-dashboard");
  }, [isConnected, navigate]);

  const { data: subscription, isLoading: subLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getSubscription",
    args: [address],
    query: { enabled: !!address },
  });

  const hasPlan = subscription && Number(subscription.planId) > 0;

  const { data: plan } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "plans",
    args: [subscription?.planId],
    query: { enabled: hasPlan },
  });

  if (!isConnected) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300">
          <WalletIcon className="h-7 w-7" />
        </div>
        <h1 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
          Welcome to BlockPay
        </h1>
        <p className="mt-3 max-w-sm text-paper-muted">
          Connect your wallet using the button above to view your dashboard and subscriptions.
        </p>
      </div>
    );
  }

  const isActive = hasPlan && subscription.active && Number(subscription.endDate) * 1000 > now;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <PageHeader
        title="Dashboard"
        subtitle="Your wallet and current subscription, read straight from the contract."
      />

      <FadeIn>
        <StatRow>
          <StatBlock label="Wallet" value={`${address.slice(0, 6)}…${address.slice(-4)}`} />
          <StatBlock
            label="Balance"
            value={balanceLoading ? "…" : `${Number(balance?.formatted ?? 0).toFixed(3)} ${balance?.symbol ?? ""}`}
          />
          <StatBlock label="Network" value="Amoy" hint="Polygon testnet" />
          <StatBlock
            label="Status"
            value={subLoading ? "…" : isActive ? "Subscribed" : "No plan"}
            accent={isActive ? "teal" : "teal"}
          />
        </StatRow>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-8">
        <h2 className="mb-4 font-display text-lg font-semibold text-paper">Your subscription</h2>

        {subLoading ? (
          <div className="panel">
            <Spinner label="Reading your subscription from the contract" />
          </div>
        ) : isActive ? (
          <div className="panel flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-300">
                <PackageIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-paper">
                  {plan ? plan[1] : `Plan #${subscription.planId.toString()}`}
                </p>
                <p className="text-sm text-paper-muted">
                  {plan ? `${formatEther(plan[2])} POL / ${Math.round(Number(plan[3]) / 86400)} days` : "Loading plan details…"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-paper-muted">
              <ClockIcon className="h-4 w-4 text-teal-400" />
              Renews or expires {new Date(Number(subscription.endDate) * 1000).toLocaleDateString(undefined, {
                year: "numeric", month: "short", day: "numeric",
              })}
            </div>
          </div>
        ) : (
          <EmptyState
            title="No active subscription yet"
            description="Pick a service and plan to get started — payment happens directly through the contract."
            action={
              <button onClick={() => navigate("/select-service")} className="btn-primary">
                Choose a service
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            }
          />
        )}
      </FadeIn>
    </div>
  );
}
