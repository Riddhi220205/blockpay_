import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import ProviderDashboard from "./pages/ProviderDashboard";
import CreatePlan from "./pages/CreatePlan";
import ManagePlans from "./pages/ManagePlan";
import RoleSelect from "./pages/RoleSelect";
import SelectService from "./pages/SelectService";
import ProviderAnalytics from "./pages/ProviderAnalytics";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden bg-canvas text-paper">
        {/* Calm, static canvas texture — the app shell shouldn't compete with page content */}
        <div className="grid-canvas pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.10),transparent_70%)]" />

        <div className="relative z-10">
          <Navbar />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="min-h-[calc(100vh-80px)] w-full"
          >
            <Routes>
              <Route path="/" element={<RoleSelect />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/select-service" element={<SelectService />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/provider-dashboard" element={<ProviderDashboard />} />
              <Route path="/provider/create-plan" element={<CreatePlan />} />
              <Route path="/provider/manage-plans" element={<ManagePlans />} />
              <Route path="/provider/analytics" element={<ProviderAnalytics />} />
            </Routes>
          </motion.main>
          <Toaster
            toastOptions={{
              style: {
                background: "#0F1E19",
                color: "#EAF3F0",
                border: "1px solid #1E362F",
              },
            }}
          />
        </div>
      </div>
    </Router>
  );
}
