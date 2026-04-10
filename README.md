🚀 Blockchain-Based Recurring Payment Subscription System
📌 Overview

A decentralized subscription platform that enables secure, automated recurring payments using blockchain technology.

This system eliminates reliance on centralized payment gateways by allowing users to subscribe to services directly through crypto wallets, ensuring transparency, security, and lower transaction costs.

👥 Team Information

Team Name: TripleHash

Team Roles
Blockchain Developer
Develops smart contracts for subscription management
Deploys and tests contracts on Sepolia test network
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

This project uses the Sepolia Test Network (Ethereum).

Sepolia is a public Ethereum testnet used for development and testing. It allows us to:

Simulate real blockchain transactions
Test smart contracts safely
Avoid real transaction costs
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
Sepolia testnet
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
Sepolia Testnet
📂 Project Structure
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│
├── contracts/
│   ├── Subscription.sol
│
├── scripts/
├── ignition/
├── hardhat.config.js
⚡ Getting Started
🔧 Prerequisites

Make sure you have installed:

Node.js (v16+)
npm / yarn
MetaMask browser extension
Sepolia test ETH (from faucet)
🖥️ Frontend Setup
cd blockpay-frontend
npm install
npm run dev

App will run on:

http://localhost:5173
⚙️ Backend Setup (if applicable)
cd backend
npm install
npm start
⛓️ Smart Contract Setup
npm install
npx hardhat compile
Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
🔐 Environment Variables

Create a .env file:

SEPOLIA_RPC_URL=your_rpc_url
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=deployed_contract_address
🔗 Wallet Setup
Install MetaMask
Switch network to Sepolia Testnet
Add test ETH from faucet
Connect wallet in the app
🔄 Workflow
User connects wallet
Views available subscription plans
Subscribes via smart contract
Transactions recorded on blockchain
Dashboard updates subscription status
