import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { WalletIcon, BriefcaseIcon, CheckIcon, ExternalLinkIcon } from "../components/icons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function RolePanel({ role, onSelect, accent, icon, title, description, bullets }) {
  const isViolet = accent === "violet";
  return (
    <motion.button
      variants={item}
      onClick={() => onSelect(role)}
      className={`group relative flex w-full max-w-sm flex-col gap-5 overflow-hidden rounded-3xl border p-8 text-left transition-all duration-300
        ${isViolet
          ? "border-line bg-surface hover:border-violet-400/40 hover:shadow-glow-violet"
          : "border-line bg-surface hover:border-teal-400/40 hover:shadow-glow"}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 ${
          isViolet ? "bg-gradient-to-r from-violet-400 to-violet-600" : "bg-gradient-to-r from-teal-400 to-teal-600"
        }`}
      />
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
          isViolet ? "bg-violet-400/10 text-violet-300" : "bg-teal-400/10 text-teal-300"
        }`}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold text-paper">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-paper-muted">{description}</p>
      </div>
      <ul className="space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-sm text-paper-muted">
            <CheckIcon className={`h-4 w-4 shrink-0 ${isViolet ? "text-violet-400" : "text-teal-400"}`} />
            {b}
          </li>
        ))}
      </ul>
      <span
        className={`mt-2 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-0.5 ${
          isViolet ? "text-violet-300" : "text-teal-300"
        }`}
      >
        Continue
      </span>
    </motion.button>
  );
}

export default function RoleSelect() {
  const navigate = useNavigate();

  const handleRole = (role) => {
    localStorage.setItem("role", role);
    navigate(role === "provider" ? "/provider-dashboard" : "/dashboard");
  };

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden px-6 py-16">
      {/* Hero-only atmosphere, layered above the app-wide canvas from App.jsx */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-[85%] -translate-y-1/2 animate-drift rounded-full bg-teal-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] translate-x-[-15%] -translate-y-1/2 animate-drift rounded-full bg-violet-500/10 blur-[110px] [animation-delay:3s]" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-12 flex flex-col items-center text-center"
      >
        <span className="chip mb-6 border-teal-400/25 text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          Polygon Amoy · Testnet
        </span>
        <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-paper sm:text-5xl">
          Subscriptions that settle on-chain.
        </h1>
        <p className="mt-4 max-w-lg text-paper-muted">
          No centralized processor sits between a plan and its subscribers — creation, payment, and
          cancellation all happen through one smart contract you can verify yourself.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full flex-col items-stretch justify-center gap-6 sm:flex-row"
      >
        <RolePanel
          role="consumer"
          accent="teal"
          onSelect={handleRole}
          icon={<WalletIcon className="h-6 w-6" />}
          title="Continue as a subscriber"
          description="Browse plans from service providers and pay for what you use, straight from your wallet."
          bullets={["Connect with MetaMask", "Subscribe in one transaction", "Track your renewal dates"]}
        />
        <RolePanel
          role="provider"
          accent="violet"
          onSelect={handleRole}
          icon={<BriefcaseIcon className="h-6 w-6" />}
          title="Continue as a service provider"
          description="Create subscription plans and watch subscribers, revenue, and renewals in one dashboard."
          bullets={["Create plans priced in POL", "Manage active plans", "Real-time subscriber analytics"]}
        />
      </motion.div>

      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        href="https://amoy.polygonscan.com/address/0x5AD783a64c18e88dCACC7c9A61AcfE6DB3afE79A"
        target="_blank"
        rel="noreferrer"
        className="relative z-10 mt-10 inline-flex items-center gap-1.5 text-xs text-paper-faint transition hover:text-paper-muted"
      >
        View the Subscription contract on PolygonScan
        <ExternalLinkIcon className="h-3.5 w-3.5" />
      </motion.a>
    </div>
  );
}
