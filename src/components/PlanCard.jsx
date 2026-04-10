import toast from "react-hot-toast";
import { subscribe } from "../blockchain/contract";

export default function PlanCard({ plan }) {
  const handleSubscribe = async () => {
    toast.loading("Processing...");

    try {
      await subscribe(plan.id);
      toast.dismiss();
      toast.success("Subscribed!");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed!");
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:scale-105 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
      <p className="text-3xl font-extrabold text-purple-400">{plan.price} MATIC</p>

      <button
        onClick={handleSubscribe}
        className="mt-6 w-full py-3 bg-gradient-to-r from-green-600 to-blue-500 rounded-xl font-semibold hover:opacity-90 transition"
      >
        Subscribe
      </button>
    </div>
  );
}