import { AlchemyNFTToken, NFTToken } from "@/types";

export function mergeAndFilterTokens(
  existingTokens: NFTToken[],
  newTokens: AlchemyNFTToken[],
): NFTToken[] {
  // Create a map to store tokens from existingTokens array
  const existingTokensMap = new Map<string, NFTToken>();
  existingTokens.forEach((token) =>
    existingTokensMap.set(token.tokenId, token),
  );

  // Merge filteredNewTokens with existingTokens
  const mergedTokens: NFTToken[] = [];

  existingTokens.forEach((existingToken) => {
    const newToken = newTokens.find(
      (token) => token.tokenId === existingToken.tokenId,
    );
    if (newToken) {
      mergedTokens.push({
        ...existingToken,
        amount: newToken.balance,
      });
    }
  });

  // Add any new tokens that are not already in existingTokens
  newTokens.forEach((newToken) => {
    if (!existingTokensMap.has(newToken.tokenId)) {
      mergedTokens.push({
        tickerSymbol: newToken.contract.symbol,
        amount: newToken.balance,
        logoUrl: newToken.image.cachedUrl,
        price: "", // You might need to populate this based on your logic
        contractAddress: newToken.contract.address,
        decimals: 0, // You might need to populate this based on your logic
        tokenId: newToken.tokenId,
        tokenUrl: newToken.image.cachedUrl, // You might need to populate this based on your logic
        supportedERCStandards: [newToken.tokenType], // You might need to populate this based on your logic
      });
    }
  });

  return mergedTokens;
}
