import { useEffect, useState } from "react";
import { fetchAllPlans, updatePlan } from "../blockchain/contract"; // adjust path

export default function ManagePlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const data = await fetchAllPlans();
      setPlans(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (plan) => {
    try {
      await updatePlan(plan.id, plan.price, !plan.isActive);
      loadPlans();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-white">

      <h1 className="text-3xl font-bold mb-10 text-center">
        Manage Plans
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-6 rounded-2xl bg-gray-800 border border-gray-600 
            hover:border-teal-400 transition"
          >
            <h2 className="text-xl font-semibold">{plan.name}</h2>

            <p className="text-gray-400 mt-2">
              Price: {plan.price} MATIC
            </p>

            <p className="text-gray-400">
              Duration: {plan.durationDays} days
            </p>

            <p className={`mt-2 ${plan.isActive ? "text-green-400" : "text-red-400"}`}>
              {plan.isActive ? "Active" : "Inactive"}
            </p>

            <button
              onClick={() => handleToggle(plan)}
              className="mt-4 px-4 py-2 rounded-lg bg-gray-700 border border-gray-500 
              hover:border-teal-400 transition"
            >
              Toggle Status
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}