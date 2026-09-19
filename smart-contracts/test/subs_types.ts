export type Plan = {
  id: bigint;
  name: string;
  price: bigint;
  duration: bigint;
};

export type SubscriptionInfo = {
  user: string;
  planId: bigint;
  startDate: bigint;
  endDate: bigint;
  active: boolean;
};