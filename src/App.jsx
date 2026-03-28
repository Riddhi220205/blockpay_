import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Plans from "./pages/Plans";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0b0f19] text-white">
        <Navbar />

        <div className="px-6 md:px-12 pt-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/plans" element={<Plans />} />
          </Routes>
        </div>

        <Toaster />
      </div>
    </Router>
  );
}
