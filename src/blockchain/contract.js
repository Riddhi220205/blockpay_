import { ethers } from "ethers";
import SubscriptionABI from "../abi/Subscription.json";

const contractAddress = "0x5BD27807CE889826eD05a242364df7dEE73dACE8";

const getContract = async () => {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    contractAddress,
    SubscriptionABI.abi,
    signer
  );
};
// 🔥 CREATE PLAN (REQUIRED FIRST)
export const createPlan = async (name, price, duration) => {
  try {
    const contract = await getContract();

    const priceInWei = ethers.parseEther(price); // ETH → wei

    const tx = await contract.createPlan(
      name,
      priceInWei,
      duration
    );

    await tx.wait();

    alert("Plan created!");
    return true;

  } catch (err) {
    console.error(err);
    alert("Failed to create plan");
    return false;
  }
};

// 🔥 SUBSCRIBE
export const subscribe = async (planId) => {
  try {
    const contract = await getContract();

    const plan = await contract.plans(planId);

    const tx = await contract.subscribe(planId, {
      value: plan.price.toString(), // important fix
    });

    await tx.wait();

    alert("Subscribed successfully!");
    return true;

  } catch (err) {
    console.error(err);
    alert("Subscription failed");
    return false;
  }
};

// 🔥 GET PLAN (optional but useful)
export const getPlan = async (planId) => {
  try {
    const contract = await getContract();
    return await contract.plans(planId);
  } catch (err) {
    console.error(err);
  }
};

// 🔥 CHECK SUBSCRIPTION
export const getSubscription = async (address) => {
  try {
    const contract = await getContract();
    return await contract.getSubscription(address);
  } catch (err) {
    console.error(err);
  }
};
