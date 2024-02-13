import { ConfettiEffect } from "@/components/ConfettiEffect";
import ShareButton from "@/components/ShareButton";
import ViewAddressBtn from "@/components/ViewAddressBtn";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { resolveSocialProfile } from "@/libs/actions/utils";
import { UserId } from "@patchwallet/patch-sdk";

export default async function Hello({
  searchParams,
}: {
  searchParams: { txHash: string; userId: UserId };
}) {
  const _userId = decodeURIComponent(searchParams.userId);

  const { profile } = await resolveSocialProfile(_userId as UserId);

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl px-8 py-4 pt-12">
      <ConfettiEffect />
      <div className="w-full flex-1 flex flex-col items-center">
        <div className="accent-outline absolute -top-12 text-5xl opacity-30 md:text-8xl  ">
          WOOH HOOO!
        </div>
        <h3
          className={` accent-outline flex justify-center !stroke-[2px_#090d02] stroke-2 text-5xl outline-2 outline-orange-200 md:text-[64px]`}
        >
          You did it!
        </h3>
        <div className="mt-2 grid w-full text-center text-xl md:grid-cols-1 md:text-2xl ">
          <div className="">You just claimed funds from</div>
          <div className="text-orange-300">
            {profile?.network === "twitter" ? "@" : ""}
            {profile?.handle}
            <span className="text-white">!</span>
          </div>
        </div>
      </div>
      <div className="mt-9 flex justify-center">
        <ShareButton type={"withdraw"} />
      </div>
      <DialogFooter className="mt-4">
        <div className="flex flex-1 justify-between">
          <ViewAddressBtn
            text="Block Explorer"
            url={`https://polygonscan.com/tx/${searchParams.txHash}`}
          />
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-green-100 text-gray-1000 hover:bg-green-100/80"
            >
              Done
            </Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </div>
  );
}
