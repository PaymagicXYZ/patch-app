import 'server-only';
import Client from '@patchwallet/patch-sdk';

const credentials = {
  clientId: process.env.CLIENT_ID!,
  clientSecret: process.env.CLIENT_SECRET!,
};
export const client = new Client(credentials);
