import { UserId } from "@patchwallet/patch-sdk";
import { signMsg } from "@/utils/actions/sign";
export const SignBtn = ({
  userId,
  token,
}: {
  userId: UserId;
  token: string;
}) => {
  const handleSign = async () => {
    const msg = "Hello World!";
    const signature = await signMsg(userId, msg, token);
    console.log(signature);
  };
  return <button onClick={handleSign}>Sign</button>;
};
