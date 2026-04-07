import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function RoleSelect() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Who are you?
        </h1>

        <div className="flex gap-6 flex-wrap justify-center">

          <Link to="/dashboard?role=consumer">
            <button className="px-8 py-3 rounded-xl bg-gray-800 border border-gray-600 
              hover:scale-105 hover:border-teal-400 transition">
              Consumer
            </button>
          </Link>

          <Link to="/dashboard?role=provider">
            <button className="px-8 py-3 rounded-xl bg-gray-800 border border-gray-600 
              hover:scale-105 hover:border-teal-400 transition">
              Service Provider
            </button>
          </Link>

        </div>
      </motion.div>
    </div>
  );
}