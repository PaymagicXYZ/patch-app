import "server-only";
export const fetchNFTDetail = async (
  network: string,
  assets: {
    Address: string;
    TokenID: string;
  }[]
) => {
  const assetsURL = `https://api.center.dev/v1/${network}/assets?fallbackToChain=true`;
  const CENTER_API_HEADERS = {
    "X-API-Key": process.env.CENTER_API_KEY!,
    "content-type": "application/json",
    accept: "application/json",
  };
  const nftDetail = await fetch(assetsURL, {
    method: "POST",
    headers: CENTER_API_HEADERS,
    body: JSON.stringify({ assets }),
  }).then((res) => res.json());

  return nftDetail;
};
