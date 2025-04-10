import "@walletconnect/react-native-compat";
import { mainnet, polygon, arbitrum } from "@wagmi/core/chains";
import {
  defaultWagmiConfig,
} from "@reown/appkit-wagmi-react-native";


// 1. Get projectId at https://cloud.reown.com
export const projectId = process.env.EXPO_PUBLIC_REOWN_PROJECT_ID || "";

// 2. Create config
const metadata = {
  name: "Crypto Pulse",
  description: "Crypto Pulse",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "crypto-pulse://",
    universal: "crypto-pulse.com",
  },
};

const chains = [mainnet, polygon, arbitrum] as const;

export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
