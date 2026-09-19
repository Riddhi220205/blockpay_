import { useAccount, useBalance } from "wagmi";
import { useNavigate } from "react-router-dom";
import { useReadContract, usePublicClient } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../blockchain/contract";
import { formatEther } from "viem";
import { useEffect, useState } from "react";
import { PageHeader, StatRow, StatBlock, Spinner } from "../components/ui";
import { BriefcaseIcon, ArrowRightIcon } from "../components/icons";

function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="mt-4 flex h-40 items-end gap-3">
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <span className="text-xs font-semibold text-teal-300">{d.value}</span>
          <div className="relative w-full overflow-hidden rounded-t-lg bg-surface-2" style={{ height: "100px" }}>
            <div
              className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-teal-600 to-teal-400 transition-all duration-700"
              style={{ height: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="text-center text-xs leading-tight text-paper-muted">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const colors = ["#2dd4bf", "#a78bfa", "#5eead4", "#c4b5fd", "#0d9488"];
  const segments = data.reduce((acc, d, i) => {
    const pct = (d.value / total) * 100;
    const prev = acc[i - 1];
    const offset = prev ? prev.offset + prev.pct : 0;
    acc.push({ ...d, pct, offset, color: colors[i % colors.length] });
    return acc;
  }, []);
  const r = 40, cx = 60, cy = 60, circ = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-6">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#152A24" strokeWidth="18" />
        {segments.map((s, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="18"
            strokeDasharray={`${(s.pct / 100) * circ} ${circ}`}
            strokeDashoffset={-((s.offset / 100) * circ)}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        ))}
        <text x={cx} y={cy + 5} textAnchor="middle" fill="#EAF3F0" fontSize="14" fontWeight="bold">
          {total}
        </text>
        <text x={cx} y={cy + 18} textAnchor="middle" fill="#8CA79E" fontSize="8">
          total
        </text>
      </svg>
      <div className="flex flex-col gap-2">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: s.color }} />
            <span className="text-paper-muted">{s.label}</span>
            <span className="ml-auto pl-4 data-text text-paper-faint">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProviderAnalytics() {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const navigate = useNavigate();
  const publicClient = usePublicClient();

  const [subscribersByPlan, setSubscribersByPlan] = useState({});
  const [recentSubs, setRecentSubs] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0n);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);

  const { data: planCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "planCount",
  });

  useEffect(() => {
    if (!planCount || !publicClient) return;
    const fetchPlans = async () => {
      const results = [];
      for (let i = 1; i <= Number(planCount); i++) {
        try {
          const plan = await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: "plans",
            args: [BigInt(i)],
          });
          results.push({ id: i, name: plan[1], price: plan[2], duration: plan[3] });
        } catch {
          // Skip any plan ID that fails to read rather than aborting the whole loop
        }
      }
      setPlans(results);
    };
    fetchPlans();
  }, [planCount, publicClient]);

  useEffect(() => {
    if (!publicClient || plans.length === 0) return;
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const logs = await publicClient.getLogs({
          address: CONTRACT_ADDRESS,
          event: {
            type: "event",
            name: "Subscribed",
            inputs: [
              { indexed: true, name: "user", type: "address" },
              { indexed: false, name: "planId", type: "uint256" },
              { indexed: false, name: "endDate", type: "uint256" },
            ],
          },
          fromBlock: BigInt(10622344),
          toBlock: "latest",
        });

        const counts = {};
        plans.forEach((p) => (counts[p.id] = 0));
        let revenue = 0n;
        const recent = [];

        for (const log of logs) {
          const planId = Number(log.args.planId);
          counts[planId] = (counts[planId] || 0) + 1;
          const plan = plans.find((p) => p.id === planId);
          if (plan) revenue += plan.price;
          recent.push({
            wallet: log.args.user,
            planId,
            planName: plan?.name || `Plan ${planId}`,
            amount: plan ? formatEther(plan.price) : "?",
            endDate: new Date(Number(log.args.endDate) * 1000).toLocaleDateString(),
            block: log.blockNumber,
          });
        }

        setSubscribersByPlan(counts);
        setTotalRevenue(revenue);
        setRecentSubs(recent.reverse().slice(0, 10));
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchEvents();
  }, [plans, publicClient]);

  if (!isConnected) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
          <BriefcaseIcon className="h-7 w-7" />
        </div>
        <h1 className="font-display text-3xl font-semibold text-paper">Analytics</h1>
        <p className="mt-3 max-w-sm text-paper-muted">Connect your wallet to view analytics.</p>
      </div>
    );
  }

  const totalSubs = Object.values(subscribersByPlan).reduce((a, b) => a + b, 0);
  const barData = plans.map((p) => ({ label: p.name, value: subscribersByPlan[p.id] || 0 }));
  const donutData = plans
    .filter((p) => (subscribersByPlan[p.id] || 0) > 0)
    .map((p) => ({ label: p.name, value: subscribersByPlan[p.id] || 0 }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <PageHeader
        accent="violet"
        title="Analytics"
        subtitle="Live data, read straight from contract events."
        action={
          <button onClick={() => navigate("/provider-dashboard")} className="btn-ghost">
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            Dashboard
          </button>
        }
      />

      {loading ? (
        <div className="panel">
          <Spinner label="Reading blockchain data" />
        </div>
      ) : (
        <>
          <StatRow>
            <StatBlock accent="violet" label="Total subscribers" value={totalSubs} hint="all time" />
            <StatBlock accent="violet" label="Active plans" value={plans.length} hint="on-chain" />
            <StatBlock
              accent="violet"
              label="Total revenue"
              value={`${parseFloat(formatEther(totalRevenue)).toFixed(4)} POL`}
              hint="from subscriptions"
            />
            <StatBlock
              accent="violet"
              label="Wallet balance"
              value={`${parseFloat(balanceData?.formatted || 0).toFixed(4)} POL`}
              hint="current"
            />
          </StatRow>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="panel p-6">
              <h2 className="font-display text-lg font-semibold text-paper">Subscribers per plan</h2>
              <p className="mb-2 text-xs text-paper-muted">How many users chose each plan</p>
              {barData.length > 0 ? <BarChart data={barData} /> : (
                <p className="mt-8 text-center text-paper-faint">No subscription data yet</p>
              )}
            </div>
            <div className="panel p-6">
              <h2 className="font-display text-lg font-semibold text-paper">Plan distribution</h2>
              <p className="mb-4 text-xs text-paper-muted">Share of subscribers across plans</p>
              {donutData.length > 0 ? <DonutChart data={donutData} /> : (
                <p className="mt-8 text-center text-paper-faint">No subscription data yet</p>
              )}
            </div>
          </div>

          <div className="panel mt-6 p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-paper">Plan breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-paper-muted">
                    <th className="pb-3 font-medium">Plan</th>
                    <th className="pb-3 font-medium">Price (POL)</th>
                    <th className="pb-3 font-medium">Duration (days)</th>
                    <th className="pb-3 font-medium">Subscribers</th>
                    <th className="pb-3 font-medium">Revenue (POL)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {plans.map((p) => (
                    <tr key={p.id} className="transition hover:bg-surface-2/50">
                      <td className="py-3 font-medium text-paper">{p.name}</td>
                      <td className="py-3 data-text text-teal-300">{formatEther(p.price)}</td>
                      <td className="py-3 text-paper-muted">{Number(p.duration) / 86400}</td>
                      <td className="py-3 data-text font-semibold text-violet-300">{subscribersByPlan[p.id] || 0}</td>
                      <td className="py-3 data-text text-paper">
                        {(parseFloat(formatEther(p.price)) * (subscribersByPlan[p.id] || 0)).toFixed(4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel mt-6 p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-paper">Recent subscriptions</h2>
            {recentSubs.length === 0 ? (
              <p className="py-6 text-center text-paper-faint">No subscriptions yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-line text-paper-muted">
                      <th className="pb-3 font-medium">Wallet</th>
                      <th className="pb-3 font-medium">Plan</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Expires</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-soft">
                    {recentSubs.map((s, i) => (
                      <tr key={i} className="transition hover:bg-surface-2/50">
                        <td className="py-3 data-text text-xs text-teal-300">
                          {s.wallet.slice(0, 6)}...{s.wallet.slice(-4)}
                        </td>
                        <td className="py-3 text-paper">{s.planName}</td>
                        <td className="py-3 data-text text-violet-300">{s.amount} POL</td>
                        <td className="py-3 text-paper-muted">{s.endDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
