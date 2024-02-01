// import { TWITTER, TEL, SocialProfile, PASSPHRASE } from "types";
// import { useIsVerified } from "../hooks";
import { SocialProfile } from "@/types";
import Image from "next/image";
// import ProfileImg from "./ProfileImg";
// import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

// const phoneUtil = PhoneNumberUtil.getInstance();

// const formatPhoneNumber = (phoneNumberString: string) => {
//   let phoneNumber;
//   phoneNumberString = "+" + phoneNumberString.replace(/\s/g, "");
//   try {
//     phoneNumber = phoneUtil.parse(phoneNumberString);
//   } catch (err) {
//     console.error(err);
//   }
// TODO: fix this
//   if (phoneNumber) {
//     const formattedPhoneNumber = phoneUtil.format(
//       phoneNumber,
//       PhoneNumberFormat.INTERNATIONAL
//     );
//     return formattedPhoneNumber;
//   }
//   return phoneNumberString;
// };

type Props = {
  profile: SocialProfile;
  size?: number;
  small?: boolean;
  checkMark?: boolean;
};

function ProfileInfo({ profile, size, small, checkMark }: Props) {
//   const { isVerified } = useIsVerified(); todo: fix this
    const isVerified = false;
  const shouldShowNetworkLogo = profile?.network !== 'passphrase';
  const formattedHandle =
    profile?.network === 'twitter'
      ? `@${profile?.handle}`
      : profile?.network === 'tel'
    //   ? formatPhoneNumber(profile?.handle)
    //   : profile?.handle;
  return (
    <div className="flex">
      {/* <ProfileImg size={size} /> */}
      <div className="flex-col ml-2 gap-1 items-center m-auto">
        <div className="flex justify-between">
          <div className="flex gap-1 mb-1">
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
              className={`${
                small ? "text-base" : "text-xl"
              } text-gray-100 leading-5 overflow-hidden text-ellipsis`}
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
            className={`${small ? "text-sm" : ""} text-gray-600 leading-[16px]`}
          >
            {profile?.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
