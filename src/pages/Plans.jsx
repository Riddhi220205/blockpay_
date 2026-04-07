import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Plans() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedService = location.state?.service;
  const [selectedPlan, setSelectedPlan] = useState(null); // ✅ NEW

  if (!selectedService) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center gap-6">
        <h1 className="text-3xl font-bold text-red-400">
          No Service Selected
        </h1>

        <p className="text-gray-400">
          Please select a service first to view plans.
        </p>

        <button
          onClick={() => navigate("/select-service")}
          className="px-6 py-3 bg-green-600 rounded-xl font-semibold hover:scale-105 transition"
        >
          Go to Services
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 text-white max-w-6xl mx-auto">

      {/* Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-2">
          Subscription Plans
        </h1>

        <p className="text-gray-400">
          Choose a plan that fits your needs
        </p>

        <h2 className="text-lg mt-4 text-teal-400">
          Service: {selectedService}
        </h2>

        {/* ✅ SHOW SELECTED PLAN */}
        {selectedPlan && (
          <p className="mt-4 text-green-400 font-semibold text-lg">
            Selected Plan: {selectedPlan}
          </p>
        )}
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* BASIC */}
        <div
          onClick={() => setSelectedPlan("Basic")}
          className={`p-8 rounded-3xl bg-gray-800 border cursor-pointer transition 
          hover:scale-105 ${
            selectedPlan === "Basic"
              ? "border-green-400"
              : "border-gray-600"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-2">Basic</h2>
          <p className="text-gray-400 mb-6">Perfect for beginners</p>

          <p className="text-3xl font-bold text-teal-400 mb-6">
            0.01 MATIC
          </p>

          <button className="w-full py-3 rounded-xl bg-green-600 font-semibold">
            Select Plan
          </button>
        </div>

        {/* PRO */}
        <div
          onClick={() => setSelectedPlan("Pro")}
          className={`p-8 rounded-3xl bg-gray-800 border cursor-pointer transition 
          hover:scale-105 ${
            selectedPlan === "Pro"
              ? "border-teal-400"
              : "border-gray-600"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-2">Pro</h2>
          <p className="text-gray-400 mb-6">Best for power users</p>

          <p className="text-3xl font-bold text-white mb-6">
            0.05 MATIC
          </p>

          <button className="w-full py-3 rounded-xl bg-teal-500 text-black font-semibold">
            Select Plan
          </button>
        </div>

      </div>
    </div>
  );
}