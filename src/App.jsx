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
      <div className="min-h-screen text-white relative overflow-hidden bg-[#020617]">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,#14b8a6_0%,#020617_70%)]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-black/25" />
        <div
          className="absolute inset-0 opacity-40 
          bg-[linear-gradient(to_right,rgba(20,184,166,0.4)_1px,transparent_1px),
          linear-gradient(to_bottom,rgba(20,184,166,0.4)_1px,transparent_1px)] 
          bg-[size:50px_50px]"
          style={{ boxShadow: "inset 0 0 120px rgba(20,184,166,0.15)" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 w-[600px] h-[600px] 
          bg-teal-400/20 blur-[150px] rounded-full -translate-x-1/2"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: "0 0 6px rgba(255,255,255,0.6)",
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <Navbar />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="px-6 md:px-12 pt-6 min-h-[calc(100vh-80px)]"
          >
            <Routes>
              <Route path="/" element={<RoleSelect />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/select-service" element={<SelectService />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/provider-dashboard" element={<ProviderDashboard />} />
              <Route path="/provider/create-plan" element={<CreatePlan />} />
              <Route path="/provider/manage-plans" element={<ManagePlans />} />
              <Route path="/provider/analytics" element={<ProviderAnalytics />} /> {/* ← new */}
            </Routes>
          </motion.div>
          <Toaster />
        </div>
      </div>
    </Router>
  );
}