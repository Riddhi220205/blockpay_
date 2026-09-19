🚀 Blockchain-Based Recurring Payment Subscription System
📌 Overview

A decentralized subscription platform that enables secure, automated recurring payments using blockchain technology.

This system eliminates reliance on centralized payment gateways by allowing users to subscribe to services directly through crypto wallets, ensuring transparency, security, and lower transaction costs.

👥 Team Information

Team Name: TripleHash

Team Roles
Blockchain Developer
Develops smart contracts for subscription management
Deploys and tests contracts on the Polygon Amoy test network
Ensures security and correctness of transaction logic
Frontend Developer
Builds the web interface using React
Integrates wallet connection (MetaMask)
Develops subscription dashboard and UI interactions
Backend, Testing & Documentation
Develops backend APIs (if required)
Handles testing and debugging
Prepares documentation and architecture diagrams
🌐 Blockchain Platform

This project uses Polygon Amoy, Polygon's public testnet.

Polygon Amoy is a Layer-2 network that mirrors mainnet Polygon while letting us:

Simulate real blockchain transactions
Test smart contracts safely
Avoid real transaction costs, with much lower gas fees than testing directly on Ethereum
💡 Problem Statement

Traditional subscription systems:

Depend on centralized payment gateways
Charge high transaction fees
Require users to share sensitive financial data
✅ Our Solution

A decentralized subscription system where:

Users pay using crypto wallets
Smart contracts automate recurring payments
Transactions are transparent and tamper-proof
No intermediaries are required
🎯 Target Audience
SaaS Platforms
Digital Service Providers
Content Creators
Crypto-native users
⚙️ Core Features
🔐 Wallet-based authentication (MetaMask)
💳 Blockchain-powered subscription payments
📦 Create & manage subscription plans
📊 User dashboard for tracking subscriptions
🔄 Automated recurring payment logic via smart contracts
🧾 Transparent on-chain transaction records
🏗️ Architecture
System Components
1. Frontend Application
React-based UI
Displays subscription plans
Handles wallet connection & user interaction
2. Smart Contracts
Written in Solidity
Handle:
Subscription creation
Payment validation
Duration tracking
3. Wallet Integration
MetaMask for:
Transaction signing
Account management
4. Backend (Optional)
Stores:
Metadata
Analytics
Service provider info
5. Blockchain Network
Polygon Amoy testnet
Executes smart contracts
Stores immutable transaction data
🛠️ Tech Stack
Frontend
React (Vite)
Tailwind CSS
Framer Motion
React Router
Backend (Optional)
Node.js
Express.js
Blockchain
Solidity
Hardhat
MetaMask
Polygon Amoy Testnet
📂 Project Structure
├── src/                  # frontend (this is the app root — see below)
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── blockchain/       # ABI + deployed address the frontend calls
│
├── smart-contracts/      # Hardhat project
│   ├── contracts/
│   │   ├── Subscription.sol
│   ├── test/
│   ├── scripts/
│   ├── ignition/
│   ├── hardhat.config.ts
⚡ Getting Started
🔧 Prerequisites

Make sure you have installed:

Node.js (v18+)
npm
MetaMask browser extension
Polygon Amoy test POL (from the Polygon faucet)
🖥️ Frontend Setup

From the repo root:

npm install
npm run dev

App will run on:

http://localhost:5173
⛓️ Smart Contract Setup

The contract is already deployed to Polygon Amoy (see smart-contracts/README.md for the address), so the frontend works out of the box. To compile, test, or redeploy it yourself:

cd smart-contracts
npm install
npm run compile
npm test
npm run deploy:amoy
🔐 Environment Variables

Smart contract deployment reads a .env file inside smart-contracts/ (see smart-contracts/.env.example):

PRIVATE_KEY=your_wallet_private_key
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology
🔗 Wallet Setup
Install MetaMask
Switch network to Polygon Amoy Testnet
Add test POL from the faucet
Connect wallet in the app
🔄 Workflow
User connects wallet
Views available subscription plans
Subscribes via smart contract
Transactions recorded on blockchain
Dashboard updates subscription status
