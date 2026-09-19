import { useNavigate } from "react-router-dom";
import { PageHeader, FadeIn } from "../components/ui";
import { BoltIcon, PhoneIcon, CarIcon, BikeIcon, HeartIcon, ShieldIcon, ArrowRightIcon } from "../components/icons";

const utilities = [
  { name: "Electricity Bill", icon: BoltIcon },
  { name: "Mobile Recharge", icon: PhoneIcon },
];

const insurance = [
  { name: "Car Insurance", icon: CarIcon },
  { name: "Bike Insurance", icon: BikeIcon },
  { name: "Health Insurance", icon: HeartIcon },
  { name: "Life Insurance", icon: ShieldIcon },
];

function ServiceCard({ name, Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 text-left transition-all hover:border-teal-400/40 hover:shadow-glow"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
        <Icon className="h-5 w-5" />
      </div>
      <span className="font-medium text-paper">{name}</span>
      <ArrowRightIcon className="ml-auto h-4 w-4 text-paper-faint opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
    </button>
  );
}

export default function SelectService() {
  const navigate = useNavigate();
  const handleSelect = (service) => navigate("/plans", { state: { service } });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <PageHeader
        title="Select a service"
        subtitle="Pick what you'd like to subscribe to. You'll choose a plan next."
      />

      <FadeIn>
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-paper">
          <BoltIcon className="h-5 w-5 text-teal-400" />
          Utility services
        </h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {utilities.map(({ name, icon }) => (
            <ServiceCard key={name} name={name} Icon={icon} onClick={() => handleSelect(name)} />
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-paper">
          <ShieldIcon className="h-5 w-5 text-teal-400" />
          Insurance
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {insurance.map(({ name, icon }) => (
            <ServiceCard key={name} name={name} Icon={icon} onClick={() => handleSelect(name)} />
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
