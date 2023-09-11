import { auth } from "@clerk/nextjs";
import * as jose from "jose";
import Link from "next/link";

export default async function Page() {
  const { userId, getToken } = auth();
  const token = await getToken({ template: "patchwallet" });
  const JWKS = jose.createRemoteJWKSet(
    new URL(
      process.env.NEXT_PUBLIC_JWKS_ENDPOINT ||
        "https://desired-mantis-48.clerk.accounts.dev/.well-known/jwks.json"
    )
  );
  const issuer =
    process.env.NEXT_PUBLIC_ISSUER ||
    "https://desired-mantis-48.clerk.accounts.dev";
  if (token) {
    const { payload, protectedHeader } = await jose.jwtVerify(token, JWKS, {
      issuer: issuer,
    });
    return (
      <main className="m-4">
        <h1 className="text-xl">JWT Token for {userId}:</h1>
        <div
          style={{ overflowWrap: "break-word", inlineSize: "100%" }}
          className="w-full bg-gray-100 p-4 rounded-md"
        >
          {token}
        </div>
        <h1 className="text-xl">Decoded JWT Token:</h1>
        <div className="w-full bg-gray-100 p-4 rounded-md">
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        </div>
        <h1 className="text-xl">Protected Header:</h1>
        <div className="w-full bg-gray-100 p-4 rounded-md">
          <pre>{JSON.stringify(protectedHeader, null, 2)}</pre>
        </div>
        <Link href="/user">Check User Object</Link>
        <br />
        <Link href="/">Back to Home</Link>
      </main>
    );
  }
}
