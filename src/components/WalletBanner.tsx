// import { useMediaQuery } from "../hooks";

const socialAppClass = "text-4xl md:text-5xl font-normal leading-[3rem] animate-topToBottom opacity-0 overflow-hidden absolute";

function WalletBanner({ type }: { type: "about" | "claim" }) {
//   const isMobile = useMediaQuery("(max-width: 768px)");
  return false ? (
    <div className="flex mt-[22px] md:mt-[94px] text-4xl md:text-5xl leading-[3rem] md:justify-center font-normal w-8/12 md:w-full flex-wrap">
      <h1 className="text-gray-100 text-center md:text-left w-full">
        {type === "claim" ? "Claim airdrops" : "Accept tokens"}
      </h1>
      <h1
        className={`text-gray-100 text-center md:text-left w-5/8 ${
          type === "claim" ? "ml-3" : ""
        }`}
      >
        via your
      </h1>
      <div id="rotating-banner" className="relative md:w-[129px] flex pl-3">
      <span className={socialAppClass + " text-twitter-300 "}>Twitter</span>
        <span className={socialAppClass + "text-github-300 animation-delay-[2500ms]" }>Github</span>
        <span className={socialAppClass + "text-gray-100 animation-delay-[5000ms]"}>Email</span>
        <span className={socialAppClass + "text-gray-100"}>Phone</span>
      </div>{" "}
    </div>
  ) : (
    <div className="flex mt-[94px] text-5xl leading-[3rem] font-normal">
      <h1 className="text-gray-100">
        {type === "claim" ? "Claim airdrops" : "Accept tokens"} via your
      </h1>
      <div id="rotating-banner" className="relative w-[129px] flex pl-3">
        <span className={socialAppClass + " text-twitter-300 "}>Twitter</span>
        <span className={socialAppClass + " text-github-300 animation-delay-[2500ms]" }>Github</span>
        <span className={socialAppClass + " text-gray-100 animation-delay-[5000ms]"}>Email</span>
        <span className={socialAppClass + " text-gray-100 animation-delay-[7500ms]"}>Phone</span>
      </div>{" "}
    </div>
  );
}

export default WalletBanner;
