import { useAccount, useBalance } from "wagmi";
import { useNavigate } from "react-router-dom";
import { PageHeader, StatRow, StatBlock, FadeIn } from "../components/ui";
import { BriefcaseIcon, PlusIcon, ChartIcon, SlidersIcon } from "../components/icons";

const actions = [
  {
    to: "/provider/create-plan",
    icon: PlusIcon,
    title: "Create a plan",
    description: "Set a name, price in POL, and billing duration.",
  },
  {
    to: "/provider/manage-plans",
    icon: SlidersIcon,
    title: "Manage plans",
    description: "Review and remove the plans you've published.",
  },
  {
    to: "/provider/analytics",
    icon: ChartIcon,
    title: "Analytics",
    description: "Subscribers, revenue, and recent activity on-chain.",
  },
];

export default function ProviderDashboard() {
  const { address, isConnected } = useAccount();
  const { data: balance, isLoading } = useBalance({ address });
  const navigate = useNavigate();

  if (!isConnected) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
          <BriefcaseIcon className="h-7 w-7" />
        </div>
        <h1 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
          Provider dashboard
        </h1>
        <p className="mt-3 max-w-sm text-paper-muted">
          Connect your wallet to create and manage subscription plans.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <PageHeader
        accent="violet"
        title="Provider dashboard"
        subtitle="Create plans, manage what's live, and track subscribers."
      />

      <FadeIn>
        <StatRow>
          <StatBlock accent="violet" label="Wallet" value={`${address.slice(0, 6)}…${address.slice(-4)}`} />
          <StatBlock
            accent="violet"
            label="Balance"
            value={isLoading ? "…" : `${Number(balance?.formatted ?? 0).toFixed(3)} ${balance?.symbol ?? ""}`}
          />
          <StatBlock accent="violet" label="Network" value="Amoy" hint="Polygon testnet" />
          <StatBlock accent="violet" label="Role" value="Provider" />
        </StatRow>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-10 grid gap-5 sm:grid-cols-3">
        {actions.map(({ to, icon: Icon, title, description }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="group flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-6 text-left transition-all hover:border-violet-400/40 hover:shadow-glow-violet"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-paper">{title}</h3>
              <p className="mt-1 text-sm text-paper-muted">{description}</p>
            </div>
          </button>
        ))}
      </FadeIn>
    </div>
  );
}
