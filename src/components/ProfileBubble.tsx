import { parseUserId } from "@/utils/checkUserId";
import { UserId } from "@patchwallet/patch-sdk";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  userId: UserId;
  name: string;
  imageUrl: string;
};

function ProfileBubble({ userId, name, imageUrl }: Props) {
  const { network, handle } = parseUserId(userId);

  return (
    <Link
    href={`/${userId}`}
      className="relative flex-1 flex-col items-center rounded-xl border-[1px] border-gray-800 bg-gray-900 px-5 py-4 md:w-auto md:px-7 md:py-5"
    >
      <div className="flex gap-2">
        <div className="flex md:absolute md:inset-x-0 md:-top-3 md:m-auto md:justify-center">
          <Image
          src={imageUrl}
          alt={name}
          width={80}
          height={80}
          className="h-12 w-12 rounded-full md:h-6 md:w-6"
          />
        </div>
        <ArrowRight size={20} className="absolute right-0 top-0 m-[6px] text-gray-700" />
        <div className="m-auto flex flex-1 flex-col items-start justify-center gap-1 md:items-center">
          <div className="mb-1 flex gap-1">
            <p
              className={`overflow-hidden text-ellipsis text-xl leading-5 text-gray-100 md:text-base`}
            >
              {name}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              className="shrink-0"
              src={`/${network}.svg`}
              alt={network as string}
              width={20}
              height={20}
            />
            <p
              className={`leading-4 text-gray-300 md:text-sm`}
            >
              {network === "twitter" ? "@" : ""}
              {handle}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}


export default ProfileBubble;
