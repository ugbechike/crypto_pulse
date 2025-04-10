import { useQuery } from "@tanstack/react-query";
import { TrendingCoinsResponse } from "@/types/api";

export const useGetTrendingCoins = () => {
    return useQuery<TrendingCoinsResponse>({
        queryKey: ['trending-coins'],
        queryFn: async () => {
            const response = await fetch(`https://api.coingecko.com/api/v3/search/trending`)
            const data = await response.json()
            return data
        },
    });
}