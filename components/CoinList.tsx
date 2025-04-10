import { View } from '@tamagui/core';
import { FlatList } from 'react-native';
import { CoinItem } from './CoinItem';
import { BottomSheet } from './BottomSheet';
import { useState, useRef } from 'react';
import { Animated } from 'react-native';
import Marquee from './Marquee';
import { TrendingCoinsResponse } from "../types/api";
import { SkeletonLoader } from './SkeletonLoader';


export interface CoinListProps {
    data: TrendingCoinsResponse;
    onSheetPositionChange: (position: number) => void;
    isLoading: boolean;
}

export const CoinList = ({data, onSheetPositionChange, isLoading}: CoinListProps) => {
    const [open, setOpen] = useState(false);
    const [isFullyExpanded, setIsFullyExpanded] = useState(false);
    const slideAnim = useRef(new Animated.Value(1)).current;
    const marqueeAnim = useRef(new Animated.Value(0)).current;
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSetOpen = ( id: string) => {
        setOpen(true);
        setSelectedId(id)
    }

    const handleSheetPositionChange = (position: number) => {
        onSheetPositionChange(position);
        // Check if sheet is at 85% height
        if (position === 0) { // First snap point (85)
            setIsFullyExpanded(true);
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(marqueeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            setIsFullyExpanded(false);
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(marqueeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Animated.View
                style={{
                    opacity: marqueeAnim,
                    transform: [
                        {
                            translateY: marqueeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-50, 0]
                            })
                        }
                    ]
                }}
            >
                <Marquee data={data} />
            </Animated.View>

            <Animated.View
                style={{
                    flex: 1,
                    opacity: slideAnim,
                    transform: [
                        {
                            translateY: slideAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [50, 0]
                            })
                        }
                    ]
                }}
            >
                <FlatList
                    data={data?.coins}
                    renderItem={({ item }) => <CoinItem coin={item} handlePress={() => handleSetOpen(item.item.id)} isLoading={isLoading} />}
                    keyExtractor={({item}) => item.id}
                    contentContainerStyle={{
                        paddingBottom: 100
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </Animated.View>

            <BottomSheet 
                open={open} 
                onClose={() => setOpen(false)} 
                onPositionChange={handleSheetPositionChange}
                selectedId={selectedId}
            />
        </View>
    );
}