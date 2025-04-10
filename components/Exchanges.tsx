import React from "react";
import { FlatList, Image, Linking } from "react-native";
import { Card, Text, View, XStack, YStack, Button } from "tamagui";
import mockExchanges from "../hooks/api/mock-exchanges.json";
import { Bitcoin, CheckCircle } from "@tamagui/lucide-icons";
import { formatMarketCap } from "@/utils/numbers";
import { SkeletonLoader } from "./SkeletonLoader";

interface Exchange {
  id: string;
  name: string;
  image: string;
  url: string;
  trust_score: number;
  trade_volume_24h_btc: number;
  country: string;
  year_established: number;
  description: string;
}

const baseTrustScore = 10;

const ExchangeCard = ({
  exchange,
  isLoading,
}: {
  exchange: Exchange;
  isLoading: boolean;
}) => {
  return (
    <View
      width="100%"
      padding={16}
      borderRadius={12}
      borderWidth={1}
      borderColor="$border"
      backgroundColor="#1E2028"
      shadowColor="$gray2"
      shadowRadius={4}
      shadowOpacity={0.1}
      marginBottom={16}
      gap={16}
    >
      <View flexDirection="row" alignItems="center" gap={16}>
        <SkeletonLoader
          width={40}
          height={40}
          borderRadius={100}
          show={isLoading}
        >
          <Image
            source={{ uri: exchange.image }}
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
        </SkeletonLoader>
        <SkeletonLoader
          width={100}
          height={20}
          borderRadius={10}
          show={isLoading}
        >
          <View>
            <Text
            fontSize={20}
            fontWeight="bold"
            color="$text"
            textTransform="uppercase"
          >
            {exchange.name}
          </Text>
          <Text fontSize={14} color="$gray5">
            Est. {exchange.year_established}. {exchange.country}
            </Text>
          </View>
        </SkeletonLoader>
      </View>
      <SkeletonLoader
        width={100}
        height={50}
        borderRadius={10}
        show={isLoading}
      >
        {/* SHORTTEN DESCRIPTION */}
        <Text fontSize={14} color="$gray5">
          {exchange.description.slice(0, 100)}...
        </Text>
      </SkeletonLoader>
      <View
        flexDirection="row"
        gap={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <View flexDirection="column" gap={4}>
          <View flexDirection="row" alignItems="center" gap={4}>
            <CheckCircle color="#10B981" size={16} />
            <Text fontSize={16} color="$gray5" fontWeight="semibold">
              Trust Score
            </Text>
          </View>
          <Text
            textAlign="center"
            fontSize={18}
            color="$text"
            fontWeight="bold"
          >
            {exchange.trust_score}/{baseTrustScore}
          </Text>
        </View>
        {/* Vertical line */}
        <View width={1} height={50} backgroundColor="#3e424b" />

        <View flexDirection="column" gap={4}>
          <Text fontSize={16} color="$gray5" fontWeight="semibold">
            24h Volume
          </Text>
          <View flexDirection="row" alignItems="center" gap={4}>
            <Bitcoin size={16} color="#f7931a" />
            <Text
              textAlign="center"
              fontSize={18}
              color="$text"
              fontWeight="bold"
            >
              {formatMarketCap(exchange.trade_volume_24h_btc.toFixed(2))} BTC
            </Text>
          </View>
        </View>
      </View>

      <Button
        onPress={() => Linking.openURL(exchange.url)}
        backgroundColor="$gray2"
        borderRadius={15}
        paddingVertical={10}
        paddingHorizontal={16}
      >
        <Text fontSize={16} color="$gray5" fontWeight="semibold">
          {exchange.name.replace(" ", "").toLowerCase()}.com
        </Text>
      </Button>
    </View>
  );
};

export const Exchanges = ({
  data,
  isLoading,
}: {
  data: Exchange[];
  isLoading: boolean;
}) => {
  return (
    <View style={{ flex: 1, paddingTop: 25 }}>
      <View marginTop={25} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ExchangeCard exchange={item} isLoading={isLoading} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        // ItemSeparatorComponent={() => <View style={{ marginVertical: 6 }} />}
      />
    </View>
  );
};
