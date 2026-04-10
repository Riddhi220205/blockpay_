import PlanCard from "../components/PlanCard";

export default function Home() {
  const plans = [
    { id: 1, name: "Basic", price: "0.01" },
    { id: 2, name: "Pro", price: "0.05" },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">
      <h1 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
        Subscription Plans
      </h1>

      <div className="grid md:grid-cols-2 gap-10 justify-center">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      </div>
    </div>
  );
}