import { useAccount, useBalance } from "wagmi";
import { useNavigate } from "react-router-dom";
import { useReadContract, usePublicClient } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../blockchain/contract";
import { formatEther } from "viem";
import { useEffect, useState } from "react";

function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-3 h-40 mt-4">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-2">
          <span className="text-xs text-teal-400 font-bold">{d.value}</span>
          <div className="w-full rounded-t-lg bg-gray-700 relative overflow-hidden" style={{ height: "100px" }}>
            <div
              className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-teal-600 to-teal-400 transition-all duration-700"
              style={{ height: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 text-center leading-tight">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const colors = ["#14b8a6", "#06b6d4", "#818cf8", "#f472b6", "#fb923c"];
  let cumulative = 0;
  const segments = data.map((d, i) => {
    const pct = (d.value / total) * 100;
    const seg = { ...d, pct, offset: cumulative, color: colors[i % colors.length] };
    cumulative += pct;
    return seg;
  });
  const r = 40, cx = 60, cy = 60, circ = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-6">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1f2937" strokeWidth="18" />
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
        <text x={cx} y={cy + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          {total}
        </text>
        <text x={cx} y={cy + 18} textAnchor="middle" fill="#9ca3af" fontSize="8">
          total
        </text>
      </svg>
      <div className="flex flex-col gap-2">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.color }} />
            <span className="text-gray-300">{s.label}</span>
            <span className="text-gray-500 ml-auto pl-4">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="p-6 rounded-2xl bg-gray-800/80 border border-gray-700 hover:border-teal-500 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className={`text-3xl font-bold ${accent || "text-teal-400"}`}>{value}</p>
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
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
        } catch {}
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
      <div className="h-[80vh] flex flex-col items-center justify-center text-center gap-6 text-white">
        <h1 className="text-4xl font-bold">Analytics</h1>
        <p className="text-gray-400">Connect your wallet to view analytics</p>
      </div>
    );
  }

  const totalSubs = Object.values(subscribersByPlan).reduce((a, b) => a + b, 0);
  const barData = plans.map((p) => ({ label: p.name, value: subscribersByPlan[p.id] || 0 }));
  const donutData = plans
    .filter((p) => (subscribersByPlan[p.id] || 0) > 0)
    .map((p) => ({ label: p.name, value: subscribersByPlan[p.id] || 0 }));

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-white">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">Analytics</h1>
          <p className="text-gray-400 mt-1">Live data from the blockchain</p>
        </div>
        <button
          onClick={() => navigate("/provider-dashboard")}
          className="px-5 py-2 rounded-xl bg-gray-800 border border-gray-600 hover:border-teal-400 transition text-sm"
        >
          ← Dashboard
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-60 text-teal-400 text-lg animate-pulse">
          Reading blockchain data...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            <StatCard label="Total Subscribers" value={totalSubs} sub="all time" />
            <StatCard label="Active Plans" value={plans.length} sub="on-chain" />
            <StatCard
              label="Total Revenue"
              value={`${parseFloat(formatEther(totalRevenue)).toFixed(4)} ETH`}
              sub="from subscriptions"
              accent="text-cyan-400"
            />
            <StatCard
              label="Wallet Balance"
              value={`${parseFloat(balanceData?.formatted || 0).toFixed(4)} ETH`}
              sub="current"
              accent="text-purple-400"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-gray-800/80 border border-gray-700">
              <h2 className="text-lg font-semibold mb-1">Subscribers per Plan</h2>
              <p className="text-gray-500 text-xs mb-2">How many users chose each plan</p>
              {barData.length > 0 ? <BarChart data={barData} /> : (
                <p className="text-gray-500 mt-8 text-center">No subscription data yet</p>
              )}
            </div>
            <div className="p-6 rounded-2xl bg-gray-800/80 border border-gray-700">
              <h2 className="text-lg font-semibold mb-1">Plan Distribution</h2>
              <p className="text-gray-500 text-xs mb-4">Share of subscribers across plans</p>
              {donutData.length > 0 ? <DonutChart data={donutData} /> : (
                <p className="text-gray-500 mt-8 text-center">No subscription data yet</p>
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gray-800/80 border border-gray-700 mb-8">
            <h2 className="text-lg font-semibold mb-4">Plan Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="pb-3">Plan</th>
                    <th className="pb-3">Price (ETH)</th>
                    <th className="pb-3">Duration (days)</th>
                    <th className="pb-3">Subscribers</th>
                    <th className="pb-3">Revenue (ETH)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {plans.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-700/40 transition">
                      <td className="py-3 font-medium">{p.name}</td>
                      <td className="py-3 text-teal-400">{formatEther(p.price)}</td>
                      <td className="py-3 text-gray-300">{Number(p.duration) / 86400}</td>
                      <td className="py-3 text-cyan-400 font-bold">{subscribersByPlan[p.id] || 0}</td>
                      <td className="py-3 text-purple-400">
                        {(parseFloat(formatEther(p.price)) * (subscribersByPlan[p.id] || 0)).toFixed(4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gray-800/80 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Recent Subscriptions</h2>
            {recentSubs.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No subscriptions yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-700">
                      <th className="pb-3">Wallet</th>
                      <th className="pb-3">Plan</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Expires</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {recentSubs.map((s, i) => (
                      <tr key={i} className="hover:bg-gray-700/40 transition">
                        <td className="py-3 text-teal-400 font-mono text-xs">
                          {s.wallet.slice(0, 6)}...{s.wallet.slice(-4)}
                        </td>
                        <td className="py-3">{s.planName}</td>
                        <td className="py-3 text-cyan-400">{s.amount} ETH</td>
                        <td className="py-3 text-gray-400">{s.endDate}</td>
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