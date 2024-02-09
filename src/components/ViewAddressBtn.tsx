import { cn } from "@/libs/utils";
import { ArrowUpRight } from "lucide-react";

type Props = {
  url: string;
  text: string;
  disabled?: boolean;
};

function ViewAddressBtn({ url, text, disabled }: Props) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      className={cn(
        "flex justify-between text-gray-300 text-xs md:text-md rounded-lg bg-gray-850 items-center px-3 py-[10px] leading-[16px] whitespace-nowrap",
        {
          "opacity-30 pointer-events-none": disabled,
        },
      )}
      href={url}
    >
      {text}
      <ArrowUpRight size={20} />
    </a>
  );
}

export default ViewAddressBtn;
