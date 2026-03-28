export default function Plans() {
  return (
    <div className="relative min-h-screen px-6 py-20 overflow-hidden">

      {/* 🔥 Background Glow Effects */}
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-yellow-600/20 blur-[120px] rounded-full -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-500/20 blur-[120px] rounded-full"></div>

      {/* Heading */}
      <div className="text-center mb-20 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 to-blue-500 bg-clip-text text-transparent">
          Subscription Plans
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          Choose a plan that fits your needs
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* BASIC */}
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-105 transition duration-300 shadow-lg">

          <h2 className="text-2xl font-semibold mb-2">Basic</h2>
          <p className="text-gray-400 mb-6">Perfect for beginners</p>

          <p className="text-4xl font-bold text-blue-400 mb-6">
            0.01 MATIC
          </p>

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-blue-500 font-semibold hover:opacity-90 transition">
            Subscribe
          </button>
        </div>

        {/* PRO */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-green-600/20 to-blue-500/20 border border-yellow-500/40 backdrop-blur-xl hover:scale-105 transition duration-300 shadow-2xl glow">

          {/* Badge */}
          <div className="absolute top-4 right-4 text-xs px-3 py-1 bg-yellow-600 rounded-full">
            MOST POPULAR
          </div>

          <h2 className="text-2xl font-semibold mb-2">Pro</h2>
          <p className="text-gray-300 mb-6">Best for power users</p>

          <p className="text-4xl font-bold text-white mb-6">
            0.05 MATIC
          </p>

          <button className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition">
            Subscribe
          </button>
        </div>

      </div>
    </div>
  );
}