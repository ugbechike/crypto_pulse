import { View, Text } from "@tamagui/core";
import { Image, TouchableOpacity } from "react-native";
import { ArrowBigUp, X } from "@tamagui/lucide-icons";
import { ArrowBigDown } from "@tamagui/lucide-icons";
import { useState } from "react";
import { useGetCoinById } from "@/hooks/api/useGetCoinById";
import { PriceChartV2 } from "./PriceChartV2";
import { useGetHistoryChart } from "@/hooks/api/useGetHistoryChart";
import { XStack } from "tamagui";
import { formatMarketCap } from "@/utils/numbers";
import { days } from "@/constants/days";
interface CoinDetailsProps {
  coinId: string;
}

export const CoinDetails = ({ coinId }: CoinDetailsProps) => {
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const { data: coin, error } = useGetCoinById(coinId);
  const { data: prices, isLoading: isLoadingPrices } = useGetHistoryChart(
    coinId,
    Math.floor(selectedDay.value / 1000),
    Math.floor(Date.now() / 1000)
  );

  if (!coin || error) {
    return null;
  }

  const {
    name,
    image,
    market_data,
    description,
    categories,
    block_time_in_minutes,
    hashing_algorithm,
    genesis_date,
    community_data,
  } = coin || {};
  const { circulating_supply, total_supply, max_supply } = market_data || {};
  const isPositive = market_data?.price_change_percentage_24h > 0;
  const priceChange = Math.abs(market_data?.price_change_percentage_24h).toFixed(
    2
  );

  return (
      <View>
        {/* Wrapper for name, image, price, price change. */}
        <View gap={4} paddingHorizontal={14} paddingTop={14}>
          <View flexDirection="row" alignItems="center" gap={8}>
            <Image
              source={{ uri: image?.thumb }}
              style={{ width: 20, height: 20 }}
            />
            <Text color="$text" fontSize={16} fontWeight="semibold">
              {name}
            </Text>
          </View>
          <View flexDirection="row" alignItems="center" gap={4}>
            <Text color="$text" fontSize={18} fontWeight="bold">
              ${market_data?.current_price?.usd?.toFixed(2)}
            </Text>
            {isPositive ? (
              <ArrowBigUp size={14} color="green" />
            ) : (
              <ArrowBigDown size={14} color="red" />
            )}
            <Text
              color={isPositive ? "$emerald" : "$red"}
              fontSize={12}
              fontWeight="semibold"
            >
              {isPositive ? "+" : "-"}
              {priceChange}%
            </Text>
          </View>
        </View>

        {/* Wrapper for days such as 1D, 1W, 1M, 3M, 1Y, 5Y ALL  and chart*/}
        <View marginTop={14}>
          <View
            flexDirection="row"
            justifyContent="space-between"
            marginBottom={20}
            paddingHorizontal={14}
          >
            {days.map((day) => {
              const isSelected = selectedDay.value === day.value;
              return (
                <TouchableOpacity
                  key={day.label}
                  onPress={() => setSelectedDay(day)}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor: isSelected ? "#10B981" : "transparent",
                    borderWidth: isSelected ? 0 : 1,
                    borderColor: "gray",
                  }}
                >
                  <Text
                    color={isSelected ? "$text" : "$subtitle"}
                    fontSize={12}
                    fontWeight="bold"
                  >
                    {day.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View marginBottom={14}>
            <PriceChartV2 prices={prices || []} isLoading={isLoadingPrices} />
          </View>
        </View>

        <View gap={8} paddingHorizontal={14} paddingBottom={14}>
          <Text color="$text" fontSize={18} fontWeight="bold">
            About
          </Text>
          <Text color="$text" fontSize={14} fontWeight="normal">
            {description?.en}
          </Text>

          <View gap={8} marginTop={12}>
            <View gap={4}>
              <Text color="$text" fontSize={14} fontWeight="bold">
                Categories
              </Text>
              <XStack flexWrap="wrap" gap={8}>
                {categories?.slice(0, 3).map((category: string, index: number) => (
                  <View
                    key={index}
                    backgroundColor="#2A2D36"
                    paddingHorizontal={12}
                    paddingVertical={6}
                    borderRadius={8}
                  >
                    <Text color="#9BA1A6" fontSize={12}>
                      {category}
                    </Text>
                  </View>
                ))}
              </XStack>
            </View>

            <View gap={4}>
              <Text color="$text" fontSize={14} fontWeight="bold">
                Technical Details
              </Text>
              <View gap={4}>
                <XStack justifyContent="space-between">
                  <Text color="#9BA1A6" fontSize={13}>
                    Block Time
                  </Text>
                  <Text color="$text" fontSize={13}>
                    {block_time_in_minutes} minutes
                  </Text>
                </XStack>
                <XStack justifyContent="space-between">
                  <Text color="#9BA1A6" fontSize={13}>
                    Hashing Algorithm
                  </Text>
                  <Text color="$text" fontSize={13}>
                    {hashing_algorithm}
                  </Text>
                </XStack>
                <XStack justifyContent="space-between">
                  <Text color="#9BA1A6" fontSize={13}>
                    Genesis Date
                  </Text>
                  <Text color="$text" fontSize={13}>
                    {genesis_date}
                  </Text>
                </XStack>
              </View>
            </View>

            <View gap={4}>
              <Text color="$text" fontSize={14} fontWeight="bold">Supply Information</Text>
              <View gap={4}>
                <XStack justifyContent="space-between">
                  <Text color="#9BA1A6" fontSize={13}>Circulating Supply</Text>
                  <Text color="$text" fontSize={13}>{formatMarketCap(circulating_supply?.toString() || '0')}</Text>
                </XStack>
                <XStack justifyContent="space-between">
                  <Text color="#9BA1A6" fontSize={13}>Total Supply</Text>
                  <Text color="$text" fontSize={13}>{formatMarketCap(total_supply?.toString() || '0')}</Text>
                </XStack>
                <XStack justifyContent="space-between">
                  <Text color="#9BA1A6" fontSize={13}>Max Supply</Text>
                  <Text color="$text" fontSize={13}>{formatMarketCap(max_supply?.toString() || '0')}</Text>
                </XStack>
              </View>
            </View>

            <View gap={4}>
              <Text color="$text" fontSize={14} fontWeight="bold">Community</Text>
              <View gap={4}>
                <XStack justifyContent="space-between">
                  <Text color="#9BA1A6" fontSize={13}>Twitter Followers</Text>
                  <Text color="$text" fontSize={13}>{formatMarketCap(community_data?.twitter_followers?.toString() || '0')}</Text>
                </XStack>
                <XStack justifyContent="space-between">
                  <Text color="#9BA1A6" fontSize={13}>Reddit Subscribers</Text>
                  <Text color="$text" fontSize={13}>{formatMarketCap(community_data?.reddit_subscribers?.toString() || '0')}</Text>
                </XStack>
              </View>
            </View>
          </View>
        </View>
      </View>
  );
};
