import { cn } from "@/libs/utils";

function WalletBanner({ type }: { type: "about" | "claim" }) {
  return (
    <div className="flex w-full">
      <div className="mx-4 mt-6 flex w-full flex-1 flex-wrap justify-center text-4xl font-normal leading-[3rem] md:mt-24 md:text-5xl">
        <div className="flex flex-1 flex-row flex-wrap justify-center gap-2 text-center text-gray-100 md:gap-4">
          <div className="">A Wallet on top of your</div>
          <div className="inline-flex h-12 w-[129px] justify-center md:justify-start">
            <AnimatedText text="Twitter" className="text-twitter-100" />
            <AnimatedText
              text="Github"
              delay="2500"
              className="text-github-100"
            />
            <AnimatedText text="Email" delay="5000" />
            <AnimatedText text="Phone" delay="7500" />
            <AnimatedText
              text="Farcaster"
              delay="10000"
              className="text-farcaster-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const AnimatedText = ({
  text,
  delay,
  className,
}: {
  text: string;
  delay?: string;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "absolute animate-top-to-bottom overflow-hidden text-4xl font-normal leading-[3rem] opacity-0 md:text-5xl text-gray-100",
        className,
        {
          "animation-delay-[2500ms]": delay === "2500",
          "animation-delay-[5000ms]": delay === "5000",
          "animation-delay-[7500ms]": delay === "7500",
          "animation-delay-[10000ms]": delay === "10000",
        },
      )}
    >
      {text}
    </span>
  );
};

export default WalletBanner;
