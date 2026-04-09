import { useState } from "react";
import { createPlan } from "../blockchain/contract"; // adjust path if needed

export default function CreatePlan() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const handleCreate = async () => {
    try {
      await createPlan(name, price, duration);
      alert("Plan created successfully!");
      setName("");
      setPrice("");
      setDuration("");
    } catch (err) {
      console.error(err);
      alert("Error creating plan");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-white">

      <h1 className="text-3xl font-bold mb-10 text-center">
        Create Subscription Plan
      </h1>

      <div className="space-y-6">

        <input
          type="text"
          placeholder="Plan Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none"
        />

        <input
          type="number"
          placeholder="Price (in MATIC)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none"
        />

        <input
          type="number"
          placeholder="Duration (in days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none"
        />

        <button
          onClick={handleCreate}
          className="w-full py-3 rounded-xl bg-gray-800 border border-gray-600 
          hover:border-teal-400 hover:scale-105 transition"
        >
          Create Plan
        </button>

      </div>
    </div>
  );
}