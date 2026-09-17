# BlockPay smart contracts

Hardhat project for the `Subscription` contract that the BlockPay frontend talks to. Deployed on Polygon Amoy.

## Setup

```bash
cd smart-contracts
npm install
cp .env.example .env   # fill in PRIVATE_KEY and POLYGON_AMOY_RPC_URL
```

## Commands

| Command | What it does |
|---|---|
| `npm run compile` | Compile the contract |
| `npm test` | Run the Hardhat test suite |
| `npm run deploy:amoy` | Deploy `Subscription` to Polygon Amoy via Hardhat Ignition |
| `npm run create-plans` | Seed the deployed contract with the Basic/Pro plans the frontend expects |

## Deployed address

The current Polygon Amoy deployment (also used by the frontend, in `src/blockchain/contract.js`):

```
0x5AD783a64c18e88dCACC7c9A61AcfE6DB3afE79A
```

See `ignition/deployments/chain-80002/deployed_addresses.json` for the source of truth. A Sepolia deployment from earlier testing is kept under `ignition/deployments/chain-11155111/` for reference.

## Contract overview

`contracts/Subscription.sol` — a service provider (the contract owner) creates plans with a price and duration; users subscribe by paying the plan price, which records an on-chain `SubscriptionInfo` with a computed `endDate`. Events (`PlanCreated`, `Subscribed`, `SubscriptionCancelled`) are what the frontend's analytics page reads to build its charts.
