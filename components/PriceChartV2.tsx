import React, { useEffect } from "react";
import { Area, CartesianChart, Line } from "victory-native";
import { useChartPressState } from "victory-native";
import { Circle, LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import { format } from "date-fns";
import * as Haptics from "expo-haptics";
import type { SharedValue } from "react-native-reanimated";
import { Text, View } from "tamagui";
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { ActivityIndicator, TextInput } from "react-native";
import { TransformedPriceData } from "@/types/api";
Animated.addWhitelistedNativeProps({
  text: true,
});

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);


function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="white" />;
}

export const PriceChartV2 = ({ prices, isLoading }: { prices: TransformedPriceData[], isLoading: boolean }) => {
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"));
  const { state, isActive } = useChartPressState<{ x: number; y: { price: number } }>({ x: 0, y: { price: 0 } });

  // Determine if price is dropping
const isPriceDropping = prices?.[0]?.price > prices?.[prices.length - 1]?.price;
const chartColor = isPriceDropping ? "#EF4444" : "#10B981"; // Red for dropping, Green for rising


  useEffect(() => {
    if (isActive) Haptics.selectionAsync();
  }, [isActive]);

  const animatedText = useAnimatedProps(() => {
    const price = state.y.price.value.value;

    return {
      text: `$${price.toFixed(3)}`,
      defaultValue: `$${price.toFixed(3)}`,
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: date.toLocaleDateString(),
      defaultValue: date.toLocaleDateString(),
    };
  });

  if (isLoading) {
    return (
      <View style={{ height: 300, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={chartColor} />
      </View>
    );
  }

  if (prices.length === 0) {
    return null;
  }

  return (
    <View style={{ height: 300 }}>
        {
            !isActive && (
                <View style={{paddingHorizontal: 10}}>
                    <Text fontSize={20} color="$text">
                        ${prices[prices?.length - 1]?.price.toFixed(3)}
                    </Text>
                    {/* <Text fontSize={16} color="$text">
                        Today
                    </Text> */}
                </View>
            )
        }
        {
            isActive && (
                <View style={{paddingHorizontal: 10}}>
                    <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid="transparent"
                        style={{
                            fontSize: 20,
                            color: "white",
                        }}
                        animatedProps={animatedText}
                    >
                    </AnimatedTextInput>
                    {/* <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid="transparent"
                        style={{
                            fontSize: 16,
                            color: "white",
                        }}
                        animatedProps={animatedDateText}
                    >
                    </AnimatedTextInput> */}
                </View>
            )
        }
      <CartesianChart<{ timestamp: number; price: number }, "timestamp" | "price", "price">
        chartPressState={state}
        domainPadding={{ top: 24, bottom: 24 }}
        axisOptions={{
          font,
          tickCount: 6,
          labelColor: "#9BA1A6",
          labelOffset: { x: -2, y: 0 },
          formatYLabel: (v: number) => `$${v.toFixed(3)}`,
          formatXLabel: (ms: number) => format(new Date(ms), "HH:mm"),
          axisSide: {
            x: "bottom",
            y: "right"
          },
          lineColor: "#9BA1A6",
        }}
        data={prices}
        xKey="timestamp"
        yKeys={["price"]}
        frame={{

        }}
      >
        {({ points, chartBounds }) => (
          <>
            <Line points={points.price} color={chartColor} strokeWidth={3} animate={{type: "timing", duration: 500}} />
            <Area 
            points={points.price} 
            color={chartColor} 
            opacity={0.2} 
            y0={chartBounds.bottom} 
            animate={{type: "timing", duration: 500}}
            >
                <LinearGradient
                    start={vec(chartBounds.bottom, 200)}
                    end={vec(chartBounds.bottom, chartBounds.bottom)}
                    colors={[chartColor, `rgba(${isPriceDropping ? "239, 68, 68" : "16, 185, 129"}, 0)`]}
                />
            </Area>
            {isActive && (
              <ToolTip x={state.x.position} y={state.y.price.position} />
            )}
          </>
        )}
      </CartesianChart>
    </View>
  );
};
