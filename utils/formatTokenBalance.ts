export const formatTokenBalance = (balance: bigint | undefined, decimals: number | undefined) => {
  if (!balance || !decimals) return "0";
  return (Number(balance) / 10 ** decimals).toFixed(2);
};
