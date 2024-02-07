"use client";
import * as React from "react";
import { ArrowRight, MinusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import {
  ControllerRenderProps,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { UserId } from "@patchwallet/patch-sdk";
import { sendTx } from "@/libs/actions/tx";
import { useSendContextStore } from "@/hooks/useSendContextStore";
import { UserContext } from "@/context/user-provider";
import { InputToken, NFTToken, SocialProfile, Token } from "@/types";
import { useConstructTx } from "@/hooks/useConstructTx";
import { SelectTokenDropdown } from "./SelectTokenDropdown";
import { useEffect } from "react";
import { LoadingSpinner } from "./Spinner";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Image from "next/image";
import { minifyAddress } from "@/utils/checkUserId";
type Inputs = { tokens: InputToken[] };
type NftInputs = { nfts: NFTToken[] };

export function ChooseTokensSection({
  tokens,
  profile,
  nfts,
}: {
  tokens: Token[];
  nfts: NFTToken[];
  profile: SocialProfile;
}) {
  const router = useRouter();
  const to = useSendContextStore((state) => state.to);
  const setTo = useSendContextStore((state) => state.setTo);
  const { chain } = React.useContext(UserContext);
  const { bundleTxns, formatTxData } = useConstructTx();
  const form = useForm<Inputs>({ reValidateMode: "onChange" });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tokens",
  });

  useEffect(() => {
    return function () {
      form.reset();
      setTo(null);
    };
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!to) {
      return; // TODO: not likely case because the button is hidden on !to
    }

    const txData = await bundleTxns(data.tokens, to);
    const formattedTxData = formatTxData(txData);

    const tx = await sendTx(
      chain,
      profile.patchUserId,
      formattedTxData.to,
      formattedTxData.value,
      formattedTxData.data,
    );

    if (tx && tx.txHash) {
      router.push(`/success?txHash=${tx.txHash}&userId=${profile.patchUserId}`);
    }
  };

  const filteredTokens = tokens.filter((token) => {
    return !fields.some(
      (field) => field.contractAddress === token.contractAddress,
    );
  });

  const handleSelectToken = (token: Token) => {
    append({
      ...token,
      value: "",
    });
  };

  const handleDeleteToken = (index: number) => {
    remove(index);
  };

  return (
    <Tabs defaultValue="tokens" className="inline-block">
      <div className="mb-1 flex text-sm uppercase leading-4 text-gray-400">
        choose tokens
      </div>
      <TabsList className="grid w-full grid-cols-2 gap-1 bg-gray-1000">
        <TabsTrigger value="tokens" className="">
          Tokens
        </TabsTrigger>
        <TabsTrigger value="nfts" className="">
          NFTs
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tokens" defaultChecked>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              {fields?.map((item, index) => {
                return (
                  <FormField
                    defaultValue=""
                    key={item.id}
                    control={form.control}
                    rules={{
                      pattern: {
                        value: /^\d*\.?\d+$/,
                        message: "Please provide a valid number",
                      },
                      validate: {
                        sufficient: (v) =>
                          +v < +item.amount || "Insufficient balance",
                        positive: (v) =>
                          +v > 0 || "Please provide a positive number",
                      },
                    }}
                    name={`tokens.${index}.value`}
                    render={({ field, fieldState }) => {
                      return (
                        <div className="relative">
                          <div className=" mb-2 flex gap-2">
                            <FormItem className="flex-1">
                              <FormControl>
                                <TokenInput token={item} {...field} />
                              </FormControl>
                            </FormItem>
                            <MinusSquare
                              size={44}
                              className="cursor-pointer text-gray-700 hover:text-red-500"
                              onClick={() => handleDeleteToken(index)}
                            />
                          </div>
                          <p className="relative -bottom-6 left-2 top-0 text-sm text-red-600">
                            {fieldState.error?.message}
                          </p>
                        </div>
                      );
                    }}
                  />
                );
              })}
            </div>
            <SelectTokenDropdown
              tokens={filteredTokens}
              onTokenSelect={handleSelectToken}
              title="Add another Token"
            />
            <div className="mt-4 flex justify-end">
              <SendButton
                hidden={!to}
                disabled={
                  form.formState.isSubmitting ||
                  !!form.formState.errors.tokens?.length ||
                  !fields.length
                }
                isLoading={form.formState.isSubmitting}
              />
            </div>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="nfts">
        {/* <UserLookupServerForm by="address" /> */}
        <NFTTabContent nfts={nfts} />
      </TabsContent>
    </Tabs>
  );
}

const NFTTabContent = ({ nfts }: { nfts: NFTToken[] }) => {
  const form = useForm<NftInputs>({ reValidateMode: "onChange" });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "nfts",
  });

  const handleSelectToken = (token: NFTToken) => {
    append({
      ...token,
    });
  };

  const handleDeleteToken = (index: number) => {
    remove(index);
  };

  const onSubmit: SubmitHandler<NftInputs> = async (data) => {
    console.log("onSubmit");
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {fields?.map((item, index) => {
            return (
              <FormField
                defaultValue=""
                key={item.id}
                control={form.control}
                rules={
                  {
                    // pattern: {
                    //   value: /^\d*\.?\d+$/,
                    //   message: "Please provide a valid number",
                    // },
                    // validate: {
                    //   sufficient: (v) =>
                    //     +v < +item.amount || "Insufficient balance",
                    //   positive: (v) =>
                    //     +v > 0 || "Please provide a positive number",
                    // },
                  }
                }
                name={`nfts.${index}.tokenId`}
                render={({ field, fieldState }) => {
                  return (
                    <div className="relative">
                      <div className=" mb-2 flex gap-2">
                        <FormItem className="flex-1">
                          <FormControl>
                            <NftInput token={item} {...field} />
                          </FormControl>
                        </FormItem>
                        <MinusSquare
                          size={44}
                          className="cursor-pointer text-gray-700 hover:text-red-500"
                          onClick={() => handleDeleteToken(index)}
                        />
                      </div>
                      <p className="relative -bottom-6 left-2 top-0 text-sm text-red-600">
                        {fieldState.error?.message}
                      </p>
                    </div>
                  );
                }}
              />
            );
          })}
          <SelectTokenDropdown
            tokens={nfts}
            onTokenSelect={handleSelectToken}
            title="Add another NFT"
          />
        </form>
      </Form>
    </>
  );
};

interface ISendButton {
  hidden: boolean;
  isLoading: boolean;
  disabled: boolean;
}
const SendButton = ({ hidden, isLoading, disabled }: ISendButton) => {
  return (
    <Button
      type="submit"
      className={cn(
        "hidden text-gray-1000 bg-green-100 hover:bg-green-100/80 gap-2",
        {
          block: !hidden,
        },
      )}
      disabled={disabled}
    >
      {!isLoading ? (
        <div className="flex items-center gap-2">
          <div>Send</div> <ArrowRight />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          <div>Transaction Pending</div> <ArrowRight />
        </div>
      )}
    </Button>
  );
};

interface InputProps extends ControllerRenderProps<Inputs, any> {
  token: InputToken;
  name: string;
}

const TokenInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ token, name, ...rest }, ref) => {
    const _value = (rest.value ? +rest.value : 0) * +token?.price;

    return (
      <Input
        type="number"
        className="flex-1 pl-24"
        rightElement={<div>~${_value.toFixed(2)}</div>}
        leftButton={
          <div className="flex items-center rounded-lg border-[0.5px] border-gray-800 bg-gray-900 p-2.5 py-1 text-gray-600">
            <div>{token?.tickerSymbol}</div>
          </div>
        }
        {...rest}
        ref={ref}
      />
    );
  },
);
TokenInput.displayName = "TokenInput";

interface NftInputProps extends ControllerRenderProps<Inputs, any> {
  token: NFTToken;
  name: string;
}
const NftInput = React.forwardRef<HTMLInputElement, NftInputProps>(
  ({ token, name, ...rest }, ref) => {
    const _value = (rest.value ? +rest.value : 0) * +token?.price;

    return (
      <>
        <div className="flex h-full flex-1 items-center bg-gray-1000 rounded-xl px-1 ">
          <div className="flex justify-between flex-1 bg-gray-800 px-2 rounded-xl py-1.5">
            <div className="gap-2 flex">
              <Image
                // blurDataURL={token.}
                src={token.tokenUrl ?? "/app_icon.svg"}
                alt={token.tickerSymbol}
                width={24}
                height={24}
                unoptimized
              />
              <div>{token.tickerSymbol}</div>
            </div>
            <div className="flex gap-1">
              <div className="bg-gray-700  text-gray-200">#{token.tokenId}</div>
              <div>{minifyAddress(token.contractAddress)}</div>
            </div>
          </div>
        </div>
        <Input
          type="hidden"
          className="absolute w-0 h-0"
          wrapperClassName="absolute w-0 h-0"
          // className="flex-1 pl-24"
          // rightElement={<div>~${_value.toFixed(2)}</div>}
          // leftButton={
          //   <div className="flex items-center rounded-lg border-[0.5px] border-gray-800 bg-gray-900 p-2.5 py-1 text-gray-600">
          //     <div>{token?.tickerSymbol}</div>
          //   </div>
          // }
          {...rest}
          ref={ref}
        />
      </>
    );
  },
);
NftInput.displayName = "NftInput";
