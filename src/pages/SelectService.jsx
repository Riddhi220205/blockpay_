import { useNavigate } from "react-router-dom";

export default function SelectService() {
  const navigate = useNavigate();

  const utilities = [
    "Electricity Bill",
    "Mobile Recharge",
  ];

  const insurance = [
    "Car Insurance",
    "Bike Insurance",
    "Health Insurance",
    "Life Insurance",
  ];

  const handleSelect = (service) => {
    navigate("/plans", { state: { service } });
  };

  return (
    
    <div className="min-h-screen max-w-5xl mx-auto px-6 py-12 text-white">
      
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">
        Select the service you want to subscribe
      </h1>

    
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-purple-300">
          ⚡ Utility Services
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {utilities.map((service, i) => (
            <div
              key={i}
              onClick={() => handleSelect(service)}
              className="p-6 rounded-2xl bg-gray-800 border border-gray-600 hover:scale-105 hover:border-purple-400 transition cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-white">
                {service}
              </h2>
            </div>
          ))}
        </div>
      </div>

      
      <div>
        <h2 className="text-xl font-semibold mb-6 text-blue-300">
           🛡 Insurance
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {insurance.map((service, i) => (
            <div
              key={i}
              onClick={() => handleSelect(service)}
              className="p-6 rounded-2xl bg-gray-800 border border-gray-600 hover:scale-105 hover:border-blue-400 transition cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-white">
                {service}
              </h2>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}