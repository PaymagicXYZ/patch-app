import { auth } from "@clerk/nextjs";
import * as jose from "jose";
import Link from "next/link";

export default async function Page() {
  const { userId, getToken } = auth();
  const token1 = await getToken({ template: "patchwallet" });
  const token2 = await getToken({ template: "custom-key" });
  const alg = "RS256";
  const spki = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkTeTCkER57Nlyk0Wts35
35bpZFncvz9ibVoxXQA78sbsasd9oUpWEZ5aWvRqUX2NaI6fQ4GHAbuO6BuKu2Y1
TTEnl6vY2wJrBtiDc59WiUdR/PaYPKj843U918pSNGGxdk8BZYMcu6JOBAnA8zLt
dCqMh6ii7PVPB20rv2a5OdGi92q5RKycJXv8p4HOd0ZYSG/JZ7e+bRq6ZlRWdFq2
OUTJke1f9OcAQBysVtD1B4U09yTfYCy0+h5mc7je0M6vS8oOi5sohb39XEp02Rny
TPmO4xvk0Mk4K3/sDq+v5Bik35keCOLuljT8MNVOPFuno+gMBfvLtUi7MDOLSycu
KQIDAQAB
-----END PUBLIC KEY-----`;
  const publicKey = await jose.importSPKI(spki, alg);
  const issuer =
    process.env.NEXT_PUBLIC_ISSUER ||
    "https://desired-mantis-48.clerk.accounts.dev";
  if (token2) {
    const { payload, protectedHeader } = await jose.jwtVerify(
      token2,
      publicKey,
      {
        issuer: issuer,
      }
    );
    return (
      <main className="m-4">
        <h1 className="text-xl">JWT Token for {userId}:</h1>
        <h2>Old token: </h2>
        <div
          style={{ overflowWrap: "break-word", inlineSize: "100%" }}
          className="w-full bg-gray-100 p-4 rounded-md"
        >
          {token1}
        </div>
        <h2>New token: </h2>
        <div
          style={{ overflowWrap: "break-word", inlineSize: "100%" }}
          className="w-full bg-gray-100 p-4 rounded-md"
        >
          New token: {token2}
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
