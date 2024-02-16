"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { formatUnits, isAddress, parseEther } from "viem";
import { useContext } from "react";
import { UserContext } from "@/context/user-provider";
import Image from "next/image";
import { NativeBalanceItem } from "@covalenthq/client-sdk";
import { useConstructTx } from "@/libs/hooks/useConstructTx";
import { Address, HexString, UserId } from "@patchwallet/patch-sdk";
import { sendTx } from "@/libs/actions/tx";
import { useRouter } from "next/navigation";
import { cn } from "@/libs/utils";
import { LoadingSpinner } from "@/components/Spinner";
import { useDialogActions } from "@/libs/hooks/useDialog";

const formSchema = z.object({
  to: z.string().refine((v) => isAddress(v), {
    message: "Invalid address",
  }),
  encodedData: z
    .string()
    .startsWith("0x", {
      message: "Invalid calldata",
    })
    .optional()
    .or(z.literal("")),
  value: z.string(),
});

export const CustomSendForm = ({
  nativeAsset,
  userId,
}: {
  nativeAsset: NativeBalanceItem;
  userId: UserId;
}) => {
  const balance = nativeAsset.balance ?? BigInt(0);
  //   const router = useRouter();
  const { open } = useDialogActions();
  const { chain } = useContext(UserContext);
  const { back } = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(
      formSchema.superRefine((data, ctx) => {
        if (
          +data.value > +formatUnits(balance, nativeAsset.contract_decimals)
        ) {
          ctx.addIssue({
            path: ["value"],
            message: "Sorry, your wallet balance is insufficient",
            code: "custom",
          });
        }
      }),
    ),
    defaultValues: {
      to: "",
      encodedData: "",
      value: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const txData = {
      to: [data.to],
      value: [String(parseEther(data.value))],
      data: ["0x"],
    };

    if (data.encodedData) {
      txData.data.push(data.encodedData);
      txData.value.push("0");
    }

    console.log("txData", txData);

    const tx = await sendTx(
      chain,
      userId,
      txData.to as Address[],
      txData.value,
      txData.data as HexString[],
    );

    if (tx && tx.txHash) {
      open("SuccessDialog", {
        hash: tx.txHash,
        userId,
        customOnClose: back,
      });
    }
  };

  return (
    <div className="flex flex-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1">
                <FormLabel className="uppercase text-gray-700">to</FormLabel>
                <FormControl>
                  <Input placeholder="Address..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="encodedData"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1">
                <FormLabel className="uppercase text-gray-700">data</FormLabel>
                <FormControl>
                  <Textarea placeholder="0x..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => {
              const _tempValue = (
                field.value ? +field.value * nativeAsset.quote_rate : 0
              ).toFixed(2);
              return (
                <FormItem className="flex flex-col space-y-1">
                  <FormLabel className="uppercase text-gray-700">
                    value
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Amount..."
                      type="number"
                      className="pl-12"
                      {...field}
                      leftButton={
                        <Image
                          src={`/${chain}.svg`}
                          width={35}
                          height={35}
                          alt={chain}
                          className="p-0.5"
                        />
                      }
                      rightElement={
                        <div className="pr-1 text-gray-700">${_tempValue}</div>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <DialogFooter className="mt-2">
            <SendButton isLoading={form.formState.isSubmitting} />
            {/* <Button className="flex flex-1 justify-center gap-1" type="submit">
              <div className="text-orange-1000">Submit</div>
              <ArrowRight className="text-orange-700" />
            </Button> */}
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

interface ISendButton {
  hidden?: boolean;
  isLoading: boolean;
}

const SendButton = ({ hidden, isLoading }: ISendButton) => {
  return (
    <Button
      type="submit"
      className={cn("flex flex-1", {
        block: !hidden,
      })}
      disabled={isLoading}
    >
      {!isLoading ? (
        <div className="flex flex-1 items-center justify-center gap-1">
          <div className="text-orange-1000">Submit</div>
          <ArrowRight className="text-orange-700" />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <LoadingSpinner />
          <div>Transaction Pending</div> <ArrowRight />
        </div>
      )}
    </Button>
  );
};
