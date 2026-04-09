import { createWalletClient, createPublicClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { readFileSync } from "fs";
import { resolve } from "path";
import * as dotenv from "dotenv";
dotenv.config();

const abi = JSON.parse(
  readFileSync(
    resolve("artifacts/contracts/Subscription.sol/Subscription.json"),
    "utf-8"
  )
).abi;

const CONTRACT_ADDRESS = "0x105bED1Ecf73f1522A922dE89994077bcFf6a0EE" as `0x${string}`;

async function main() {
  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(process.env.SEPOLIA_RPC_URL),
  });

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(process.env.SEPOLIA_RPC_URL),
  });

  console.log("Creating Basic plan...");
  const hash1 = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "createPlan",
    args: ["Basic", parseEther("0.01"), BigInt(30 * 24 * 60 * 60)],
  });
  await publicClient.waitForTransactionReceipt({ hash: hash1 });
  console.log("✅ Basic plan created");

  console.log("Creating Pro plan...");
  const hash2 = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "createPlan",
    args: ["Pro", parseEther("0.05"), BigInt(30 * 24 * 60 * 60)],
  });
  await publicClient.waitForTransactionReceipt({ hash: hash2 });
  console.log("✅ Pro plan created");

  console.log("🎉 Done!");
}

main().catch(console.error);