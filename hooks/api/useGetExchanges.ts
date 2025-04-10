import { useQuery } from "@tanstack/react-query";

export const useGetExchanges = () => {
    return useQuery({
        queryKey: ["exchanges"],
        queryFn: async () => {
            const response = await fetch("https://api.coingecko.com/api/v3/exchanges");
            const data = await response.json();
            return data;
        },

    });
};
