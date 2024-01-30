import clsx from "clsx";

function WalletBanner({ type }: { type: "about" | "claim" }) {
  return (
    <div className="flex w-full">
      <div className="mx-4 mt-6 flex w-full flex-1 flex-wrap justify-center text-4xl font-normal leading-[3rem] md:mt-24 md:text-5xl">
        <div className="flex flex-1 flex-row flex-wrap justify-center gap-2 text-center text-gray-100 md:gap-4">
          <div className="">{type === "claim" ? "Claim airdrops" : "Accept tokens"} via your</div>
          <div className="inline-flex h-12 w-[129px] justify-center md:justify-start">
              <AnimatedText text="Twitter" />
              <AnimatedText text="Github" delay="2500" />
              <AnimatedText text="Email" delay="5000" />
              <AnimatedText text="Phone" delay="7500" />
          </div>
        </div>
      </div>
    </div>
  );
}

const AnimatedText = ({ text, delay }: { text: string; delay?: string }) => {
    return (
        <span className={clsx("absolute animate-top-to-bottom overflow-hidden text-4xl font-normal leading-[3rem] text-gray-100 opacity-0 md:text-5xl", {
            'animation-delay-[2500ms]': delay === '2500',
            'animation-delay-[5000ms]': delay === '5000',
            'animation-delay-[7500ms]': delay === '7500',
        })}>{text}</span>
    )
}

export default WalletBanner;
