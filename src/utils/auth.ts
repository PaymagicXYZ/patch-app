export const fetchAuthToken = async () => {
  return await fetch(`https://paymagicapi.com/v1/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.RESOLVER_API_CLIENT_ID,
      client_secret: process.env.RESOLVER_API_CLIENT_SECRET,
    }),
  })
    .then((res) => res.json())
    .then((data) => data.access_token);
};
