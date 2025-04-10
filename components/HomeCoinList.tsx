import { View } from "@tamagui/core";
import { FlatList } from "react-native";
import { CoinItem } from "./CoinItem";
import { BottomSheet } from "./BottomSheet";
import { useState } from "react";
import { TrendingCoinsResponse } from "../types/api";

export interface HomeCoinListProps {
  data: TrendingCoinsResponse;
  isLoading: boolean;
}

export const HomeCoinList = ({ data, isLoading }: HomeCoinListProps) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSetOpen = (id: string) => {
    setOpen(true);
    setSelectedId(id);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data?.coins}
        renderItem={({ item }) => (
          <CoinItem
            coin={item}
            handlePress={() => handleSetOpen(item.item.id)}
            isLoading={isLoading}
          />
        )}
        keyExtractor={({ item }) => item.id}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      />

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        selectedId={selectedId}
      />
    </View>
  );
};
