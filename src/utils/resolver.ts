import { UserId, User } from "@/types";
import { fetchAuthToken } from "./auth";

export const resolveUsers = async (
  userIds: UserId[],
  token?: string
): Promise<User[]> => {
  const accessToken = token || (await fetchAuthToken());
  return await fetch(`https://paymagicapi.com/v1/resolver`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ userIds: userIds.toString() }),
  })
    .then((res) => res.json())
    .then((data) => data.users)
    .catch((err) => {
      console.error(err);
      return "";
    });
};
