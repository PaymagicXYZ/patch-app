import { cn } from "@/utils";
import Image from "next/image";

type Props = {
  size?: number;
  imageSrc?: string;
};

// TODO
function ProfileImg({ size, imageSrc }: Props) {
  return (
    <div
      className={cn("w-11 h-11 rounded-full overflow-hidden", {
        "w-[${size}px] h-[${size}px]": size,
      })}
    >
      <Image
        src={imageSrc as string}
        unoptimized // Note: better to whitelist the domain in the next.config.js
        alt={"test"}
        width={size || 44}
        height={size || 44}
      />
    </div>
  );
}

export default ProfileImg;
