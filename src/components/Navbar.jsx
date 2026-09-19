import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, NavLink, useLocation } from "react-router-dom";
import { RoleBadge } from "./ui";

const navLinkClass = ({ isActive }) =>
  `relative py-1 text-sm font-medium transition-colors ${
    isActive ? "text-paper" : "text-paper-muted hover:text-paper"
  }`;

export default function Navbar() {
  const role = localStorage.getItem("role");
  const isProvider = role === "provider";
  const location = useLocation();
  const isRoleSelectPage = location.pathname === "/";

  return (
    <div className="sticky top-0 z-50 border-b border-line-soft bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="flex items-center gap-2.5">
          <svg viewBox="0 0 64 64" className="h-8 w-8">
            <rect width="64" height="64" rx="16" fill="#0F1E19" />
            <path d="M32 10 L50 20 V44 L32 54 L14 44 V20 Z" fill="none" stroke="#2dd4bf" strokeWidth="3.5" />
            <path d="M23 32 L29 38 L41 25" fill="none" stroke="#2dd4bf" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-display text-xl font-semibold text-paper">BlockPay</span>
        </Link>

        <div className="flex items-center gap-7">
          {!isRoleSelectPage && (
            <>
              <nav className="hidden items-center gap-6 sm:flex">
                {isProvider ? (
                  <NavLink to="/provider-dashboard" className={navLinkClass}>
                    Dashboard
                  </NavLink>
                ) : (
                  <>
                    <NavLink to="/dashboard" className={navLinkClass}>
                      Dashboard
                    </NavLink>
                    <NavLink to="/select-service" className={navLinkClass}>
                      Select service
                    </NavLink>
                    <NavLink to="/plans" className={navLinkClass}>
                      Plans
                    </NavLink>
                  </>
                )}
              </nav>
              <span className="hidden sm:block">
                <RoleBadge role={role} />
              </span>
            </>
          )}
          <ConnectButton showBalance={false} />
        </div>
      </div>
    </div>
  );
}
