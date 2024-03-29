// import { TWITTER, TEL, SocialProfile, PASSPHRASE } from "types";
// import { useIsVerified } from "../hooks";
import Image from "next/image";
import ProfileImg from "./ProfileImg";
import { SocialProfile } from "@/types";
import { cn } from "@/libs/utils";
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

const formatPhoneNumber = (phoneNumberString: string) => {
  let phoneNumber;
  phoneNumberString = "+" + phoneNumberString.replace(/\s/g, "");
  try {
    phoneNumber = phoneUtil.parse(phoneNumberString);
  } catch (err) {
    console.error(err);
  }

  if (phoneNumber) {
    const formattedPhoneNumber = phoneUtil.format(
      phoneNumber,
      PhoneNumberFormat.INTERNATIONAL,
    );
    return formattedPhoneNumber;
  }
  return phoneNumberString;
};

type Props = {
  profile: SocialProfile;
  size?: number;
  small?: boolean;
  checkMark?: boolean;
};

// TODO
function ProfileInfo({ profile, size, small, checkMark }: Props) {
  // const { isVerified } = useIsVerified(); // TODO
  const { isVerified } = { isVerified: false }; // TODO
  const shouldShowNetworkLogo = profile?.network !== "passphrase";
  const formattedHandle =
    profile?.network === "twitter"
      ? `@${profile?.handle}`
      : profile?.network === "tel"
      ? formatPhoneNumber(profile?.handle)
      : profile?.handle;
  return (
    <div className="flex w-full flex-1 items-center">
      <ProfileImg
        size={size}
        imageSrc={profile.image || `/${profile.network}.svg`}
      />
      <div className="m-auto ml-2 flex-col items-center gap-5">
        <div className="flex w-full flex-1 justify-between">
          <div className="flex w-full flex-1 gap-1">
            {shouldShowNetworkLogo && (
              <Image
                className="shrink-0"
                src={`/${profile?.network}.svg`}
                alt={profile?.network as string}
                width={20}
                height={20}
              />
            )}
            <p
              className={cn(
                "flex-1 overflow-hidden text-ellipsis leading-5 text-gray-100 text-base md:text-xl whitespace-nowrap w-full",
                { "text-base": small },
              )}
            >
              {formattedHandle}
            </p>
            {isVerified && checkMark && (
              <Image
                src="/verified_check.svg"
                width={20}
                height={20}
                alt="Check"
              />
            )}
          </div>
        </div>
        <div className="flex items-center">
          <p
            className={cn("text-gray-600 text-sm md:text-base", {
              "text-sm": small,
            })}
          >
            {profile?.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
