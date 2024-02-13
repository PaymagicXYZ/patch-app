"use client";
import dynamic from "next/dynamic";

const MoonPayProvider = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayProvider),
  { ssr: false }
);

const MoonPayBuyWidget = dynamic(
  () => import("@moonpay/moonpay-react").then((mod) => mod.MoonPayBuyWidget),
  { ssr: false }
);

import { signMoonPayURL } from "@/libs/actions/signMoonPayURL";

export const MoonPay = (props: { walletAddress: string; chain: string }) => {
  return (
    <MoonPayProvider
      apiKey={process.env.NEXT_PUBLIC_MOONPAY_PUBLIC_KEY || ""}
      debug={process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"}
    >
      <p>
        This is the buy page for {props.walletAddress} on {props.chain}
      </p>
      <MoonPayBuyWidget
        variant="embedded"
        baseCurrencyCode="usd"
        baseCurrencyAmount="100"
        currencyCode="USDC_BASE"
        walletAddress={props.walletAddress}
        onUrlSignatureRequested={async (url) => await signMoonPayURL(url)}
        visible
      />
    </MoonPayProvider>
  );
};
