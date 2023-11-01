import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";

export default async function Page() {
  const user: User | null = await currentUser();
  if (user) {
    return (
      <main className="m-4">
        <h1 className="text-xl">Patch wallets associated with this account:</h1>
        <div>
          <ul>
            <li>patch-test:{user.username}</li>
            {user.emailAddresses.map((email, i) => (
              <li key={i}>email:{email.emailAddress}</li>
            ))}
            {user.phoneNumbers.map((tel, i) => (
              <li key={i}>tel:{tel.phoneNumber}</li>
            ))}
            {user.externalAccounts.map((account, i) => {
              if (!account.provider) return null;
              return (
                <li key={i}>
                  {account.provider.split("_")[1]}:
                  {account.username ? account.username : account.externalId}
                </li>
              );
            })}
          </ul>
        </div>
        <h1 className="text-xl">User Object:</h1>
        <pre className="w-full bg-gray-100 p-4 rounded-md">
          {JSON.stringify(user, null, 2)}
        </pre>
      </main>
    );
  }
}
