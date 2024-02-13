import "server-only";
import Client from "@patchwallet/patch-sdk";
import { CovalentClient } from "@covalenthq/client-sdk";

const credentials = {
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
};
export const client = new Client(credentials);

export const covalentInstance = new CovalentClient(
  process.env.COVALENT_API_KEY!,
);
