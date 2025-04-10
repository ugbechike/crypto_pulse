import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { CoinListProps } from "./CoinList";
import { SvgUri } from "react-native-svg";
import { ICoinItem } from "../types/api";


interface MarqueeProps extends Omit<CoinListProps, "onSheetPositionChange" | "isLoading"> {}

const Marquee = ({ data }: MarqueeProps) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (contentWidth === 0) return;

    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -contentWidth,
        duration: contentWidth * 15,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      {
        iterations: -1
      }
    ).start();
  }, [contentWidth]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.marquee,
          {
            transform: [{ translateX: scrollX }],
          },
        ]}
      >
        <View 
          style={styles.content}
          onLayout={(event) => {
            setContentWidth(event.nativeEvent.layout.width);
          }}
        >
          {data?.coins?.map((item: { item: ICoinItem }, index: number) => (
            <MarqueeItem key={`${item.item.id}-${index}`} coin={item.item} />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    height: 60,
    backgroundColor: '$background',
  },
  marquee: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  }
});

export default Marquee;

export const MarqueeItem = ({ coin }: { coin: ICoinItem }) => {
  const isPositive = coin.data.price_change_percentage_24h.usd > 0;
  const priceChange = Math.abs(
    coin.data.price_change_percentage_24h.usd
  ).toFixed(2);
  
  return (
    <View style={itemStyles.container}>
      <Image source={{ uri: coin.thumb }} style={itemStyles.image} />
      <View style={itemStyles.textContainer}>
        <Text style={itemStyles.symbol}>{coin.symbol}</Text>
        <Text style={itemStyles.price}>${coin.data.price.toFixed(2)}</Text>
        <Text
          style={[
            itemStyles.percentage,
            { color: isPositive ? "#4CAF50" : "#FF5252" }
          ]}
        >
          {isPositive ? "+" : "-"}{priceChange}%
        </Text>
      </View>
      <View style={itemStyles.sparklineContainer}>
        <SvgUri width={50} height={20} uri={coin.data.sparkline} />
      </View>
    </View>
  );
};

const itemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 60,
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  textContainer: {
    marginLeft: 8,
    minWidth: 60,
  },
  symbol: {
    fontSize: 14,
    fontWeight: "600",
    color: '#fff',
  },
  price: {
    fontSize: 12,
    color: '#fff',
  },
  percentage: {
    fontSize: 12,
    fontWeight: "500",
  },
  sparklineContainer: {
    marginRight: 10,
  }
});
