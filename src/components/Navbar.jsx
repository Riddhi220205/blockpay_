import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white/5 border-b border-white/10">
      <Link to="/" className="text-xl font-bold">
        BlockPay
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <ConnectButton />
      </div>
    </div>
  );
}