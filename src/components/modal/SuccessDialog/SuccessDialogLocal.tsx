"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import ShareButton from "@/components/ShareButton";
import { ConfettiEffect } from "@/components/ConfettiEffect";
import ViewAddressBtn from "@/components/ViewAddressBtn";
import { Button } from "@/components/ui/button";
import { SocialProfile } from "@/types";
import { useDialogIsOpen, useDialogMeta } from "@/libs/hooks/useDialog";

export default function SuccessDialogLocal() {
  const isOpen = useDialogIsOpen("SuccessDialog");

  const meta = useDialogMeta<
    | {
        hash: string;
        profile: SocialProfile;
        onClose: () => void;
      }
    | undefined
  >("SuccessDialog");

  return (
    <Dialog open={isOpen} onOpenChange={meta?.onClose}>
      <DialogContent className="flex min-w-[260px] max-w-[660px] flex-col justify-center overflow-hidden border-none bg-gray-900 bg-gradient-to-b from-[#213409] to-black p-0">
        <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl px-8 py-4 pt-12">
          <ConfettiEffect />
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="accent-outline absolute -top-12 text-5xl opacity-30 md:text-8xl  ">
              WOOH HOOO!
            </div>
            <h3
              className={
                "accent-outline flex justify-center !stroke-[2px_#090d02] stroke-2 text-5xl outline-2 outline-orange-200 md:text-[64px]"
              }
            >
              You did it!
            </h3>
            <div className="mt-2 grid w-full text-center text-xl md:grid-cols-1 md:text-2xl ">
              <div className="">You just sent funds from</div>
              <div className="text-orange-300">
                {meta?.profile?.network === "twitter" ? "@" : ""}
                {meta?.profile?.handle}
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
                url={`https://polygonscan.com/tx/${meta?.hash}`}
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
      </DialogContent>
    </Dialog>
  );
}
