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

export const MoonPay = (props: { walletAddress: string; chain: string }) => {
  return (
    <MoonPayProvider apiKey="pk_test_4db4XRAYQN73TdyRb088dxlOc1OnIX" debug>
      <p>
        This is the buy page for {props.walletAddress} on {props.chain}
      </p>
      <MoonPayBuyWidget
        variant="embedded"
        baseCurrencyCode="usd"
        baseCurrencyAmount="100"
        currencyCode="eth_POLYGON"
        walletAddress={props.walletAddress}
        //   onLogin={() => console.log("Customer logged in!")}
        visible
      />
    </MoonPayProvider>
  );
};
