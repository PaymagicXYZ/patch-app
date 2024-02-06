import { ConfettiEffect } from "@/components/ConfettiEffect";
import ViewAddressBtn from "@/components/ViewAddressBtn";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";

export default function Hello({
  searchParams,
}: {
  searchParams: { txHash: string };
}) {
  return (
    <div className="">
      <ConfettiEffect width={600} />
      <h3 className={`flex justify-center text-5xl md:text-[64px]`}>
        You did it!
      </h3>
      <DialogFooter className="mt-4">
        <div className="flex flex-1 justify-between">
          <ViewAddressBtn
            text="Block Explorer"
            url={`https://polygonscan.com/tx/${searchParams.txHash}`}
          />
          <DialogClose asChild>
            <Button type="button" className="">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </div>
  );
}
