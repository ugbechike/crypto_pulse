import { useQuery } from "@tanstack/react-query";
import { PriceData } from "@/types/api";

const transFormPriceData = (prices: PriceData) => {
  return prices.map(([timestamp, price]) => ({
    timestamp,
    price,
  }));
  
}

export const useGetHistoryChart = (id: string, from: number, to: number) => {

    return useQuery({
        queryKey: ["historyChart", id, from, to],
        queryFn: async () => {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`);
            const data = await response.json();
            return transFormPriceData(data.prices);
        },
        //polling interval
        refetchInterval: 10000,

        enabled: !!id && !!from && !!to,
    });
}