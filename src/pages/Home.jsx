import PlanCard from "../components/PlanCard";

export default function Home() {
  const plans = [
    { id: 1, name: "Basic", price: "0.01" },
    { id: 2, name: "Pro", price: "0.05" },
  ];

  return (
    <div className="py-20">
      <h1 className="text-4xl font-bold text-center mb-10">
        Subscription Plans
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}