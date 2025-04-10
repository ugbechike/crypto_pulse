import { View, Text } from "@tamagui/core";
import { Image } from "react-native";
import { ArrowBigUp, ArrowBigDown } from "@tamagui/lucide-icons";
import { SvgUri } from 'react-native-svg';
import { TouchableOpacity } from "react-native";
import { ICoinItem } from "@/types/api";
import { formatMarketCap } from "@/utils/numbers";
import { SkeletonLoader } from "./SkeletonLoader";

export interface CoinItemProps {
  coin: {
    item: ICoinItem;
  };
  handlePress: () => void;
  isLoading: boolean;
}


export interface ICoinItemProps extends ICoinItem {}

export const CoinItem = ({ coin, handlePress, isLoading }: CoinItemProps) => {
    const {
        id,
        name,
        symbol,
        thumb,
        market_cap_rank,
        data: {
            price_change_percentage_24h,
            market_cap,
            sparkline,
            price
        }
    } = coin.item;

  const isPositive = price_change_percentage_24h.usd > 0;
  const priceChange = Math.abs(price_change_percentage_24h.usd).toFixed(2);
  const formattedMarketCap = formatMarketCap(market_cap);
  
  return (
    <TouchableOpacity onPress={handlePress}>
    <View 
      borderBottomWidth={1}
      borderBottomColor="$border"
      padding={10}
      flexDirection="row" 
      justifyContent="space-between" 
      alignItems="center"
    >
      <View
        flexDirection="row"
        alignItems="center"
        gap={10}
      >
        <SkeletonLoader  width={25} height={25} borderRadius={8} show={isLoading}>
        <Image source={{ uri: thumb }} style={{ width: 25, height: 25 }} />
        </SkeletonLoader>

        <View>
          <SkeletonLoader  width={100} height={14} borderRadius={8} show={isLoading}>
          <Text fontSize={14} fontWeight="bold" color="$text">
            {name}
          </Text>
          </SkeletonLoader>

          <SkeletonLoader spacing={2} width={100} height={14} borderRadius={8} show={isLoading}>
          <View flexDirection="row" alignItems="center" gap={2}>
            <View
              borderWidth={1}
              borderColor="$border"
              padding={2}
              backgroundColor="$gray"
              borderRadius={4}
            >
              <Text
                color="$text"
                textAlign="center"
                fontSize={10}
                fontWeight="bold"
              >
                {market_cap_rank}
              </Text>
            </View>
            <Text color="$subtitle" fontSize={12}>{symbol}</Text>
            {isPositive ? (
              <ArrowBigUp size={14} color="green" />
            ) : (
              <ArrowBigDown size={14} color="red" />
            )}
            <Text color={isPositive ? "green" : "red"} fontSize={12}>{priceChange}%</Text>
          </View>
          </SkeletonLoader>
        </View>
      </View>
      <View>
        <SkeletonLoader  width={70} height={20} borderRadius={8} show={isLoading}>
           <SvgUri
            width={70}
            height={20}
            uri={sparkline}
          />
        </SkeletonLoader>
      </View>
      <View>
        <SkeletonLoader  width={100} height={14} borderRadius={8} show={isLoading}>
        <Text color="$text" fontSize={14} fontWeight="bold" textAlign="right">
          ${price.toFixed(2)}
        </Text>
        </SkeletonLoader>
        <SkeletonLoader  width={100} height={14} borderRadius={8} show={isLoading}>
        <Text color="$subtitle" fontSize={12}>MCap ${formattedMarketCap}</Text>
        </SkeletonLoader>
      </View>
    </View>
    </TouchableOpacity>
  );
};
