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
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
      <h2 className="text-xl font-semibold">{plan.name}</h2>
      <p className="text-2xl mt-2">{plan.price} MATIC</p>

      <button
        onClick={handleSubscribe}
        className="mt-4 w-full py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl"
      >
        Subscribe
      </button>
    </div>
  );
}