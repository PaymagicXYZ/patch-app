export const getUser = async (user: string) => {
  return await fetch(`https://api.clerk.com/v1/users/${user}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  }).then((res) => res.json());
};
