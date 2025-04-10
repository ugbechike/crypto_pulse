import { useQuery } from "@tanstack/react-query";
import { CoinDetails } from "@/types/api";

export const useGetCoinById = (id: string) => {
    return useQuery<CoinDetails>({
        queryKey: ["coin", id],
        queryFn: async () => {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
            const data = await response.json();
            return data;
        },
        enabled: !!id,
    });
}