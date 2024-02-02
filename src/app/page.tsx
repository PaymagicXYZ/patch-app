import WalletBanner from '@/components/WalletBanner';
import Image from 'next/image';
import walletLogo from '../../public/wallet_logo.svg';
import { UserInputClientForm } from '@/components/UserLookupForm';
import Link from 'next/link';
import ProfileBubble from '@/components/ProfileBubble';
import socialLogoCenter from '../../public/social_logo_center.svg';
import dottedLineLeft from '../../public/dotted_line_left.svg';
import dottedLineRight from '../../public/dotted_line_right.svg';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  return (
    <main className="m-5 flex flex-col items-center">
      <Image src={walletLogo} alt="PatchWallet" className="cursor-pointer" width={168} />
      <WalletBanner type="about"></WalletBanner>
      <p className="mt-4 text-center text-sm text-gray-600 md:w-[475px]">
        Use your Twitter, Email, or Phone as your personal crypto wallet without the complexity. Let anyone send you tokens via your social
        handle.
      </p>
      <div className="flex w-full justify-center pt-9">
        {/* It is advisable for components consuming 'useSearchParams' to be wrapped in 'Suspense*', ref- https://nextjs.org/docs/app/api-reference/functions/use-search-params */}
        <Suspense fallback={<Skeleton className="flex h-9 w-full sm:w-4/6 sm:max-w-[520px]" />}>
          <UserInputClientForm />
        </Suspense>
      </div>
      <div className="mx-6">
        <CentreSection />
        <div className="flex w-full flex-col items-center justify-center">
          <div className="mt-6 flex w-full flex-col flex-wrap justify-center gap-4 md:max-w-[680px] md:flex-row md:flex-nowrap">
            <ProfileBubble userId="github:gvanrossum" name="Guido van Rossum" imageUrl="/guido.jpeg" />
            <ProfileBubble userId="twitter:elonmusk" name="Elon Musk" imageUrl="/elon_musk.svg" />
            <ProfileBubble userId="email:urmom69@gmail.com" name="Mom" imageUrl="/mom.jpeg" />
          </div>
          <div className="mx-auto md:w-[680px]">
            <Separator className="mb-12 mt-12 md:mt-14" />
            <div className="flex flex-wrap gap-3 text-gray-200 md:flex-nowrap">
              <Feature
                btnHref={process.env.NEXT_PUBLIC_SOCIAL_DROP_HOST ?? 'http://localhost:3001'}
                btnTitle="Setup an airdrop"
                desc="Send an airdrop to your followers, friends, and fans just
                  by using their social handle (Twitter/Email/Github)"
                title="Create Social Airdrop"
              />
              <Feature
                btnHref="https://docs.patchwallet.com"
                btnTitle="Learn more"
                desc="Patch Wallet is a powerful protocol allowing your
                  customers to use their socials as their crypto wallets."
                title="Patch Wallets"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const CentreSection = () => {
  return (
    <div className="mt-3 flex flex-col-reverse items-center lg:flex-row">
      <div className="relative flex justify-center self-center md:flex-1 lg:-bottom-2 lg:-left-4 lg:w-full lg:items-end lg:self-end">
        <span className="mb-2 mt-10 w-full text-center text-[15px] text-gray-400 lg:mb-[-13px] lg:mr-4 lg:mt-0 lg:w-[148px] lg:text-right">
          Search for any social profile’s wallet
        </span>
        <Image src={dottedLineLeft} alt="dotted_line_left" className="mb-[-65px] mr-20 hidden lg:block" />
      </div>
      <Image src={socialLogoCenter} alt="social_logos" className="hidden shrink-0 self-center md:block" />
      <div className="flex justify-center md:hidden md:flex-1">
        <Image src={socialLogoCenter} alt="social_logos" />
      </div>
      <div className="flex w-10/12 items-center justify-center md:flex-1 md:justify-start">
        <Image src={dottedLineRight} alt="dotted_line_right" className="mr-4 mt-[68px] hidden lg:block" />
        <span className="mx-auto -mb-8 mt-8 w-full text-center text-[15px] text-gray-400 lg:mt-0 lg:w-[244px]">
          Accept tokens & NFTs via your social handle and withdraw to your external crypto wallet anytime
        </span>
      </div>
    </div>
  );
};

const Feature = ({ title, desc, btnTitle, btnHref }: { title: string; desc: string; btnTitle: string; btnHref: string }) => {
  return (
    <div className="rounded-2xl bg-gray-900 p-5">
      <h3 className="mb-3 text-xl font-medium">{title}</h3>
      <p className="mb-5 text-[15px] text-gray-500">{desc}</p>
      <Link target="_blank" href={btnHref} className="rounded-lg bg-gray-850 px-4 py-2">
        {btnTitle}
      </Link>
    </div>
  );
};
