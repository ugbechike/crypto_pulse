import { CoinList } from "@/components/CoinList";
import { Exchanges } from "@/components/Exchanges";
import { Tab } from "@/components/Tab";
import { useGetExchanges } from "@/hooks/api/useGetExchanges";
import { useGetTrendingCoins } from "@/hooks/api/useGetTrendingCoins";
import { View, Text } from "@tamagui/core";
import { useState, useRef } from "react";
import { Animated } from "react-native";

export default function Home() {
  const { data: exchanges, isLoading: isLoadingExchanges, error: errorExchanges } = useGetExchanges();
  const { data, isLoading: isLoadingTrends, error } = useGetTrendingCoins();
  const [activeTab, setActiveTab] = useState("trends");
  const tabAnim = useRef(new Animated.Value(1)).current;

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
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
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
        <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
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
