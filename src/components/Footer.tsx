import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-28">
      <div className="mb-6 flex w-full flex-col items-center gap-6 px-5 py-4 md:flex-row md:gap-2">
        <div className="flex w-full flex-1 flex-wrap justify-around text-gray-700 lg:flex-[2_2_0%]">
          <Link href="https://launch.mirror.xyz/Kwb5Cx_Uj0rrTtR-pnJT0WrVBYa_X-iVpEb1x7SSPNE">
            About
          </Link>
          <Link href="https://airtable.com/shrGrEOaBB2BVM7m7">
            Bugs or Feedback
          </Link>
          <Link href="https://dune.com/corbpage/patch-wallet-tracker-v0">
            Analytics
          </Link>
          <Link href="https://discord.com/invite/EAFPKSRyth">Discord</Link>
        </div>
        <div className="flex flex-1 justify-around">
          <div className="flex items-center gap-2 text-gray-800 md:justify-end">
            <div>© {new Date().getFullYear()}</div>
            <Link target="_blank" href={"https://www.patchwallet.com/"}>
              PatchWallet.com
            </Link>
            <div className="h-[5px] w-[5px] rounded-full bg-gray-800" />
            <Link target="_blank" href="/tos.html">
              Terms of use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
