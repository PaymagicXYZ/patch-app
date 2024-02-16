import { ConfettiEffect } from "@/components/ConfettiEffect";
import ShareButton from "@/components/ShareButton";
import ViewAddressBtn from "@/components/ViewAddressBtn";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { resolveSocialProfile } from "@/libs/actions/utils";
import { Address, Chain, UserId } from "@patchwallet/patch-sdk";
import { ArrowRight } from "lucide-react";
import { CustomSendForm } from "../components/CustomSendForm";
import { client } from "@/libs/client";
import {
  fetchNativeTokenBalance,
  fetchTokenBalance,
} from "@/libs/actions/tokens";
import Image from "next/image";

export default async function SendCustom({
  params,
}: {
  params: { userId: UserId; chain: Chain };
}) {
  const _userId = decodeURIComponent(params.userId) as UserId;
  const address = (await client.resolve(_userId)) as Address;

  const { data, error } = await fetchNativeTokenBalance(address, params.chain);
  console.log("data", data);
  return (
    <div className="flex max-h-[890px] min-w-[260px] max-w-[740px] flex-col justify-center rounded-xl">
      {/* <ConfettiEffect /> */}

      <DialogHeader>
        <DialogTitle className="text-2xl">Custom Transaction</DialogTitle>
        <DialogDescription>
          Fill out information below to send a custom transaction
        </DialogDescription>
      </DialogHeader>
      <main className="mt-10 flex">
        <CustomSendForm
          nativeAsset={JSON.parse(JSON.stringify(data[0]))}
          userId={_userId}
        />
      </main>
    </div>
  );
}
