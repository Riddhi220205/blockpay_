import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function RoleSelect() {
  const navigate = useNavigate();

  const handleRole = (role) => {
    localStorage.setItem("role", role);
    navigate(role === "provider" ? "/provider-dashboard" : "/dashboard");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 bg-[#020617]" />
      <img src="/identity.png" alt="background" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-black/50" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center gap-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold">Who are you?</h1>
        <div className="flex gap-8 mt-4">
          <button
            onClick={() => handleRole("consumer")}
            className="px-8 py-3 rounded-xl bg-gray-800 border border-gray-600 hover:border-teal-400 hover:scale-105 transition"
          >
            Consumer
          </button>
          <button
            onClick={() => handleRole("provider")}
            className="px-8 py-3 rounded-xl bg-gray-800 border border-gray-600 hover:border-teal-400 hover:scale-105 transition"
          >
            Service Provider
          </button>
        </div>
      </motion.div>
    </div>
  );
}