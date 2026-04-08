import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, createStorage } from "wagmi";
import { polygon } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";

// 🔥 Disable persistence completely
const config = getDefaultConfig({
  appName: "BlockPay",
  projectId: "YOUR_REAL_PROJECT_ID",
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
  autoConnect: false,

  // ✅ THIS IS THE KEY FIX
  storage: createStorage({
    storage: null, // ❌ disables localStorage (no session saving)
  }),
});

const queryClient = new QueryClient();

// 🔥 Run once to clear old cached sessions (important)


ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <App />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);