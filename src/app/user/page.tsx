import { currentUser, auth } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import { client } from "@/utils/client";
import type { UserId } from "@patchwallet/patch-sdk";
import AccountSelector from "@/components/AccountSelector";
export default async function Page() {
  const user: User | null = await currentUser();

  if (user) {
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
    const wallets = (await client.resolve(availableWallets)) as string[];
    const { getToken } = auth();
    const token = (await getToken({ template: "patchwallet" })) || "";
    return (
      <main className="m-4">
        <h1 className="text-xl">Patch wallets associated with this account:</h1>
        <AccountSelector
          availableWallets={availableWallets}
          wallets={wallets}
          token={token}
        />
        <h1 className="text-xl">User Object:</h1>
        <pre className="w-full bg-gray-100 p-4 rounded-md">
          {JSON.stringify(user, null, 2)}
        </pre>
      </main>
    );
  }
}
