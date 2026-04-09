import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";

import { WagmiProvider, createConfig, http } from "wagmi";
import { polygon } from "wagmi/chains";
import { injected } from "wagmi/connectors";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Simple, clean wagmi config (NO walletconnect, NO storage issues)
const config = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
  connectors: [
    injected(), // ✅ MetaMask only
  ],
});

// React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);