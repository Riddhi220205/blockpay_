import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";

export const config = getDefaultConfig({
  appName: "BlockPay",
  projectId: "8805d7caa8594b15fa241f1cdfd42270",
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(),
  },
});

const queryClient = new QueryClient();

const rainbowTheme = darkTheme({
  accentColor: "#2dd4bf",
  accentColorForeground: "#081410",
  borderRadius: "medium",
  fontStack: "system",
  overlayBlur: "small",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={rainbowTheme}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
