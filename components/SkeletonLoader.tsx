import { View } from "tamagui";
import { useEffect } from "react";
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  interpolate,
  useSharedValue,
  Easing 
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface SkeletonLoaderProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  show: boolean;
  children: React.ReactNode;
  spacing?: number;
}

export const SkeletonLoader = ({ 
  width = 100, 
  height = 20, 
  borderRadius = 4, 
  show = true, 
  children,
  spacing = 10
}: SkeletonLoaderProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (show) {
      progress.value = withRepeat(
        withTiming(1, { 
          duration: 1500,
          easing: Easing.linear 
        }),
        -1,
        false
      );
    }
  }, [show]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [-width * 2, width * 2]
          ),
        },
      ],
    };
  });

  if (!show) return <View>{children}</View>; // If `show` is false, render the actual content

  return (
    <View
      width={width}
      height={height}
      borderRadius={borderRadius}
      backgroundColor="$skeleton"
      overflow="hidden"
      marginBottom={spacing}
    >
      <Animated.View style={[animatedStyle, { position: 'absolute', width: width * 3, height: '100%' }]}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.05)',
            'rgba(255, 255, 255, 0.2)',
            'rgba(255, 255, 255, 0.05)',
            'rgba(255, 255, 255, 0)'
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: '100%', height: '100%' }}
        />
      </Animated.View>
      {/* Render children after loader animation */}
      <View style={{ opacity: 0 }}>
        {children}
      </View>
    </View>
  );
};
