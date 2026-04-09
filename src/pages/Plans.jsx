import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllPlans } from "../blockchain/contract";

export default function Plans() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedService = location.state?.service;

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // ✅ Load plans dynamically
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await fetchAllPlans();

        // ✅ Only show active plans
        const activePlans = data.filter(plan => plan.isActive);

        setPlans(activePlans);
      } catch (err) {
        console.error(err);
      }
    };

    loadPlans();
  }, []);

  // 🚨 No service selected
  if (!selectedService) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center gap-6 text-white">
        <h1 className="text-3xl font-bold text-red-400">
          No Service Selected
        </h1>

        <p className="text-gray-400">
          Please select a service first to view plans.
        </p>

        <button
          onClick={() => navigate("/select-service")}
          className="px-6 py-3 rounded-xl bg-gray-800 border border-gray-600 
          hover:border-teal-400 transition"
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

        {/* ✅ Selected Plan Display */}
        {selectedPlan && (
          <p className="mt-4 text-green-400 font-semibold text-lg">
            Selected Plan: {selectedPlan.name}
          </p>
        )}
      </div>

      {/* 🚫 No plans */}
      {plans.length === 0 && (
        <p className="text-center text-gray-400">
          No plans available
        </p>
      )}

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-10">

        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
            className={`p-8 rounded-3xl bg-gray-800 border cursor-pointer transition 
            hover:scale-105 ${
              selectedPlan?.id === plan.id
                ? "border-green-400"
                : "border-gray-600"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-2">
              {plan.name}
            </h2>

            <p className="text-gray-400 mb-6">
              {plan.durationDays} days plan
            </p>

            <p className="text-3xl font-bold text-teal-400 mb-6">
              {plan.price} MATIC
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPlan(plan);
              }}
              className="w-full py-3 rounded-xl bg-gray-700 border border-gray-500 
              hover:border-teal-400 transition"
            >
              Select Plan
            </button>
          </div>
        ))}

      </div>

      {/* ✅ Optional Subscribe Button (future blockchain integration) */}
      {selectedPlan && (
        <div className="mt-12 text-center">
          <button
            className="px-8 py-3 rounded-xl bg-teal-500 text-black font-semibold 
            hover:scale-105 transition"
            onClick={() => {
              console.log("Selected:", selectedPlan);
              alert(`Subscribed to ${selectedPlan.name} (mock)`);
            }}
          >
            Subscribe
          </button>
        </div>
      )}

    </div>
  );
}