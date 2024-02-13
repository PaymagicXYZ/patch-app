"use server";
import crypto from "crypto";

export async function signedMoonPayURL(
  currency: string,
  walletAddress: string
) {
  const originalUrl = `https://buy${
    process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" && "-sandbox"
  }.moonpay.com?apiKey=${
    process.env.NEXT_PUBLIC_MOONPAY_PUBLIC_KEY
  }&currencyCode=${currency}&walletAddress=${walletAddress}`;
  const signature = crypto
    .createHmac("sha256", process.env.MOONPAY_SECRET!)
    .update(new URL(originalUrl).search)
    .digest("base64");
  const urlWithSignature = `${originalUrl}&signature=${encodeURIComponent(
    signature
  )}`;
  return urlWithSignature;
}

export async function signMoonPayURL(url: string) {
  const originalUrl = url;
  const signature = crypto
    .createHmac("sha256", process.env.MOONPAY_SECRET!)
    .update(new URL(originalUrl).search)
    .digest("base64");
  return signature;
}
