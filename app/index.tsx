import { CoinList } from "@/components/CoinList";
import { Exchanges } from "@/components/Exchanges";
import { Tab } from "@/components/Tab";
import { useGetExchanges } from "@/hooks/api/useGetExchanges";
import { useGetTrendingCoins } from "@/hooks/api/useGetTrendingCoins";
import { AccountButton, ConnectButton } from "@reown/appkit-wagmi-react-native";
import { View, Text } from "@tamagui/core";
import { Button } from "tamagui";
import { useState } from "react";
import { Wallet } from "@tamagui/lucide-icons";
import { useAccount, useBalance } from "wagmi";
import { formatTokenBalance } from "@/utils/formatTokenBalance";
import { router } from "expo-router";
import { HomeCoinList } from "@/components/HomeCoinList";

export default function Home() {
  const { data: exchanges, isLoading: isLoadingExchanges } = useGetExchanges();
  const { data, isLoading: isLoadingTrends } = useGetTrendingCoins();
  const [activeTab, setActiveTab] = useState("trends");
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });
  const formattedBalance = formatTokenBalance(balance?.value, balance?.decimals);
  console.log(exchanges);

  return (
    <View backgroundColor="$background" flex={1}>
      {/* Header Section */}
      <View paddingHorizontal={16} paddingTop={16}>
        {isConnected ? (
          <View space={16}>
            {/* Balance Display */}
            <View 
              backgroundColor="$gray5" 
              padding={16} 
              borderRadius={16}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <View>
                <Text color="$gray" fontSize={14}>Total Balance</Text>
                <Text fontSize={24} fontWeight="600">
                  {formattedBalance}
                </Text>
                <Text color="$gray" fontSize={14}>{balance?.symbol}</Text>
              </View>
              <AccountButton />
            </View>
          </View>
        ) : (
          <View space={16}>
            {/* Connect Wallet Section */}
            <View 
              backgroundColor="$gray5" 
              padding={24} 
              borderRadius={16}
              alignItems="center"
              space={12}
            >
              <Wallet size={32} color="$gray" />
              <Text color="$gray" fontSize={16} textAlign="center">
                Connect your wallet to view your balance and start trading
              </Text>
              <ConnectButton 
                label="Connect Wallet" 
                loadingLabel="Connecting..." 
              />
            </View>
          </View>
        )}

        {/* Market Overview Section */}
        <View marginTop={24} flexDirection="row" justifyContent="space-between" alignItems="center">
          {/* Tabs */}
          <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
          <Button
              onPress={() => router.push("/trends")}
              backgroundColor="transparent"
              pressStyle={{ opacity: 0.7 }}
            >
              <Text color="$emerald" fontSize={14} fontWeight="500">View All</Text>
            </Button>
        </View>
      </View>

      {/* Content Section */}
      <View flex={1}>
        {activeTab === "trends" && (
          <HomeCoinList
            data={data!}
            isLoading={isLoadingTrends}
          />
        )}
        {activeTab === "exchanges" && (
          <Exchanges data={exchanges!} isLoading={isLoadingExchanges} />
        )}
      </View>
    </View>
  );
}
