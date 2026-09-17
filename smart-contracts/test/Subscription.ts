import { Plan, SubscriptionInfo } from "../test/subs_types.js";
import assert from "node:assert/strict";
import { describe, it, before } from "node:test";
import { network } from "hardhat";


describe("Subscription", function () {
  let viem: any;
  let publicClient: any;
  let wallet: any;

  before(async function () {
    ({ viem } = await network.connect());
    publicClient = await viem.getPublicClient();
    [wallet] = await viem.getWalletClients();
  });

  it("Should create a plan", async function () {
    const contract = await viem.deployContract("Subscription");

    await contract.write.createPlan(["Basic", 100n, 3600n]);

    const [, name, price] = await contract.read.plans([1n]);

    assert.equal(name, "Basic");
    assert.equal(price, 100n);
  });

  it("Should allow user to subscribe", async function () {
    const contract = await viem.deployContract("Subscription");

    await contract.write.createPlan(["Pro", 100n, 3600n]);

    await contract.write.subscribe([1n], {
      value: 100n,
    });

    const sub = await contract.read.getSubscription([
      wallet.account.address,
    ]) as SubscriptionInfo;

    assert.equal(sub.active, true);
  });
});