import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold">
        BlockPay
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="mr-6 hover:text-green-400 transition">
        Dashboard
        </Link>
        <Link to="/plans" className="mr-6 hover:text-green-400 transition">
        Plans
        </Link>
        <ConnectButton />
      </div>
    </div>
  );
}