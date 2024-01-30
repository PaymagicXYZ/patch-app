import WalletBanner from "@/components/WalletBanner";
import Image from "next/image";
import walletLogo from "../../public/wallet_logo.svg";
import { SearchUser } from "@/components/UserLookupForm";
import Link from "next/link";
import ProfileBubble from "@/components/ProfileBubble";
import socialLogoCenter from "../../public/social_logo_center.svg";
import dottedLineLeft from "../../public/dotted_line_left.svg";
import dottedLineRight from "../../public/dotted_line_right.svg";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const isMobile = false
  return (
    <main className="mx-2 mt-10 flex flex-col items-center">
      <Image src={walletLogo}
              alt="PatchWallet"
              className="cursor-pointer"
              width={168} />
      <WalletBanner type="about"></WalletBanner>
      <p className="mt-4 text-center text-sm text-gray-600 md:w-[475px]">
              Use your Twitter, Email, or Phone as your personal crypto wallet
              without the complexity. Let anyone send you tokens via your social
              handle.
      </p>
      <div className="flex w-full justify-center pt-9" >
        <SearchUser className="w-full md:w-3/4" />
      </div>
      <div className="mx-6">
        <div className="mt-3 md:flex">
          {isMobile && (
            <div className="flex justify-center">
              <p className="mb-[-27px] mt-12 w-10/12 text-center text-[15px] text-gray-400 md:mb-[-13px] md:mr-4 md:mt-0 md:w-[148px] md:text-right">
                Accept tokens & NFTs via your social handle and withdraw
                to your external crypto wallet anytime
              </p>
            </div>
          )}
          {!isMobile && (
            <div className="flex w-full items-end">
              <p className="mb-[-13px] mr-4 w-[148px] text-right text-[15px] text-gray-400">
                Search for any social profile’s wallet
              </p>
              <Image
                src={dottedLineLeft}
                alt="dotted_line_left"
                className="mb-[-65px] mr-20"
              />
            </div>
          )}
          <Image
            src={socialLogoCenter}
            alt="social_logos"
            className="shrink-0"
          />
          {isMobile && (
            <div className="flex justify-center">
              <p className="mb-11 mt-10 w-5/12 text-center text-[15px] text-gray-400 md:mb-[-13px] md:mr-4 md:mt-0 md:w-[148px] md:text-right">
                Search for any social profile’s wallet
              </p>
            </div>
          )}
          {!isMobile && (
            <div className="flex w-full items-center">
              <Image
                src={dottedLineRight}
                alt="dotted_line_right"
                className="mr-4 mt-[68px]"
              />
              <p className="w-[244px] text-[15px] text-gray-400">
                Accept tokens & NFTs via your social handle and withdraw
                to your external crypto wallet anytime
              </p>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="mt-6 flex w-full flex-col flex-wrap justify-center gap-4 md:max-w-[680px] md:flex-row md:flex-nowrap">
            <ProfileBubble
              userId="github:gvanrossum"
              name="Guido van Rossum"
              imageUrl="/guido.jpeg"
            />
            <ProfileBubble
              userId="twitter:elonmusk"
              name="Elon Musk"
              imageUrl="/elon_musk.svg"
            />
            <ProfileBubble
              userId="email:urmom69@gmail.com"
              name="Mom"
              imageUrl="/mom.jpeg"
            />
          </div>
          <div className="mx-auto md:w-[680px]">
          <Separator className="bg-gray-900 h-0.5 md:mt-14 mb-9" />
            <div className="flex flex-wrap gap-3 text-gray-200 md:flex-nowrap">
              <Feature btnHref={process.env.NEXT_PUBLIC_SOCIAL_DROP_HOST ?? "http://localhost:3001"} btnTitle="Setup an airdrop" desc="Send an airdrop to your followers, friends, and fans just
                  by using their social handle (Twitter/Email/Github)" title="Create Social Airdrop"/>
              <Feature btnHref="https://docs.patchwallet.com" btnTitle="Learn more" desc="Patch Wallet is a powerful protocol allowing your
                  customers to use their socials as their crypto wallets." title="Patch Wallets" />
            </div>
          </div>
        </div>
      </div>
  </main>
  );
}

const Feature = ({title, desc, btnTitle, btnHref}: {title: string; desc: string; btnTitle: string; btnHref: string}) => {
  return (
    <div className="rounded-2xl bg-gray-900 p-5">
        <h3 className="mb-3 text-xl font-medium">
          {title}
        </h3>
        <p className="mb-5 text-[15px] text-gray-500">
          {desc}
        </p>
        <Link
          target="_blank"
          href={btnHref}
          className="rounded-lg bg-gray-850 px-4 py-2"
        >
          {btnTitle}
        </Link>
    </div>
  )
}

