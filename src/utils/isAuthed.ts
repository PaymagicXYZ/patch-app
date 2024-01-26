import { User } from "@clerk/nextjs/server";
import { UserId } from "@patchwallet/patch-sdk";

export default function isAuthed(userId: UserId, user: User): boolean {
  const availableWallets = [
    ...user.emailAddresses.map((email) => `email:${email.emailAddress}`),
    ...user.phoneNumbers.map((tel) => `tel:${tel.phoneNumber}`),
    ...user.externalAccounts
      .filter((account) => account.provider)
      .map(
        (account) =>
          `${account.provider.split("_")[1]}:${
            account.username || account.externalId
          }`
      ),
  ] as UserId[];
  return availableWallets.includes(userId);
}
