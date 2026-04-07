import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SubscriptionModule = buildModule("SubscriptionModule", (m) => {
  const subscription = m.contract("Subscription");

  return { subscription };
});

export default SubscriptionModule;