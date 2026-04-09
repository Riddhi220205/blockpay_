// 🔥 GLOBAL MEMORY (acts like blockchain temporarily)
let plans = [
  { id: 1, name: "Basic", price: "0.01", durationDays: 30, isActive: true },
  { id: 2, name: "Pro", price: "0.05", durationDays: 30, isActive: true },
];

// ================= CONSUMER =================

export const subscribe = async (planId) => {
  console.log("Subscribed to plan:", planId);
};

// ================= PROVIDER =================

export const createPlan = async (name, price, duration) => {
  const newPlan = {
    id: plans.length + 1,
    name,
    price,
    durationDays: Number(duration),
    isActive: true,
  };

  plans.push(newPlan);

  console.log("Plan created:", newPlan);
};

export const updatePlan = async (planId, newPrice, isActive) => {
  plans = plans.map((plan) =>
    plan.id === planId
      ? { ...plan, price: newPrice, isActive }
      : plan
  );

  console.log("Plan updated:", planId);
};

export const fetchAllPlans = async () => {
  return plans;
};

export const withdrawFunds = async () => {
  console.log("Funds withdrawn");
};