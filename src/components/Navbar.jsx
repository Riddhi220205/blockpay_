import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const isProvider = role === "provider";
  const location = useLocation();
  const isRoleSelectPage = location.pathname === "/";

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3">
        <img src="/logo.png" alt="BlockPay" className="h-8 drop-shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
        <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          BlockPay
        </span>
      </Link>

      <div className="flex gap-6 items-center">
        {!isRoleSelectPage &&
          (isProvider ? (
            <Link to="/provider-dashboard" className="hover:text-teal-400 transition">Dashboard</Link>
          ) : (
            <>
              <Link to="/dashboard" className="hover:text-teal-400 transition">Dashboard</Link>
              <Link to="/select-service" className="hover:text-teal-400 transition">Select Service</Link>
              <Link to="/plans" className="hover:text-teal-400 transition">Plans</Link>
            </>
          ))}
        <ConnectButton />
      </div>
    </div>
  );
}
