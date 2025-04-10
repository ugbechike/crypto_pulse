import { CoinList } from "@/components/CoinList";
import { Exchanges } from "@/components/Exchanges";
import { Tab } from "@/components/Tab";
import { useGetExchanges } from "@/hooks/api/useGetExchanges";
import { useGetTrendingCoins } from "@/hooks/api/useGetTrendingCoins";
import { AccountButton, AppKit, AppKitButton, ConnectButton, useAppKit, useWalletInfo } from "@reown/appkit-wagmi-react-native";
import { View } from "@tamagui/core";
import { Button } from "tamagui";
import { useState, useRef } from "react";
import { Animated } from "react-native";
import { Wallet, ArrowLeft } from "@tamagui/lucide-icons";
import { useAccount, useBalance } from "wagmi";
import { formatTokenBalance } from "@/utils/formatTokenBalance";
import { router } from "expo-router";

export default function Trends() {
  const { data: exchanges, isLoading: isLoadingExchanges, error: errorExchanges } = useGetExchanges();
  const { data, isLoading: isLoadingTrends, error } = useGetTrendingCoins();
  const [activeTab, setActiveTab] = useState("trends");
  const tabAnim = useRef(new Animated.Value(1)).current;
  const { address, isConnected } = useAccount();


  const handleSheetPositionChange = (position: number) => {
    if (position === 0) {
      Animated.timing(tabAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(tabAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View backgroundColor="$background" flex={1}>
      <Animated.View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          flex: 1,
          opacity: tabAnim,
          transform: [
            {
              translateY: tabAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              }),
            },
          ],
        }}
      >
        <View flexDirection="row" alignItems="center" space={16}>
          <Button
            onPress={() => router.back()}
            backgroundColor="transparent"
            pressStyle={{ opacity: 0.7 }}
          >
            <ArrowLeft size={24} color="$gray" />
          </Button>
          <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>
        {isConnected ? <AccountButton />
        : <ConnectButton label="Connect" loadingLabel="Connecting..." />}
        <AppKit />
       
      </Animated.View>

      {activeTab === "trends" && (
        <CoinList
          data={data!}
          onSheetPositionChange={handleSheetPositionChange}
          isLoading={isLoadingTrends}
        />
      )}
      {activeTab === "exchanges" && (
        <Exchanges data={exchanges!} isLoading={isLoadingExchanges} />
      )}
    </View>
  );
}
