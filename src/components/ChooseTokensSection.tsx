"use client";
import * as React from "react";
import { ArrowRight, MinusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, isNFT } from "@/utils";
import {
  ControllerRenderProps,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Address } from "@patchwallet/patch-sdk";
import { useSendContextStore } from "@/hooks/useSendContextStore";
import { UserContext } from "@/context/user-provider";
import { InputToken, NFTToken, SocialProfile, Token } from "@/types";
import { useConstructTx } from "@/hooks/useConstructTx";
import { NftItem, SelectTokenDropdown } from "./SelectTokenDropdown";
import { useEffect } from "react";
import { LoadingSpinner } from "./Spinner";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { sendTx } from "@/libs/actions/tx";

type AssetInputs = { tokens: InputToken[]; nfts: NFTToken[] };

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
  const { chain, selectedAddress } = React.useContext(UserContext);
  const { bundleTxns, formatTxData } = useConstructTx();
  const form = useForm<AssetInputs>({ reValidateMode: "onChange" });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tokens",
  });
  const {
    fields: nftFields,
    append: nftAppend,
    remove: nftRemove,
  } = useFieldArray({
    control: form.control,
    name: "nfts",
  });

  useEffect(() => {
    resetForm(true);
  }, []);

  const resetForm = (withAddress = false) => {
    form.reset({ nfts: [], tokens: [] });
    withAddress && setTo(null);
  };

  const onSubmit: SubmitHandler<AssetInputs> = async (data) => {
    if (!to) {
      return; // TODO: not likely case because the button is hidden on !to
    }

    const txData = await bundleTxns(
      data.tokens,
      data.nfts,
      to,
      selectedAddress as Address,
    );
    const formattedTxData = formatTxData(txData);

    const tx = await sendTx(
      chain,
      profile.patchUserId,
      formattedTxData.to,
      formattedTxData.value,
      formattedTxData.data,
    );

    if (tx && tx.txHash) {
      resetForm();
      router.push(`/success?txHash=${tx.txHash}&userId=${profile.patchUserId}`);
    }
  };

  const filteredTokens = tokens.filter((token) => {
    return !fields.some(
      (field) => field.contractAddress === token.contractAddress,
    );
  });

  const filteredNfts = nfts.filter((nft) => {
    return !nftFields.some(
      (field) =>
        field.contractAddress === nft.contractAddress &&
        field.tokenId === nft.tokenId,
    );
  });

  const handleSelectToken = (token: Token | NFTToken) => {
    isNFT(token)
      ? nftAppend({
          ...token,
        })
      : append({
          ...token,
          value: "",
        });
  };

  const handleDeleteToken = (index: number, item: Token | NFTToken) => {
    isNFT(item) ? nftRemove(index) : remove(index);
  };

  return (
    <div className="flex w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
          <Tabs defaultValue="tokens" className="inline-block w-full">
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
                                onClick={() => handleDeleteToken(index, item)}
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
            </TabsContent>
            <TabsContent value="nfts">
              <div>
                {nftFields?.map((item, index) => {
                  return (
                    <FormField
                      defaultValue=""
                      key={item.id}
                      control={form.control}
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
                                onClick={() => handleDeleteToken(index, item)}
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
                  tokens={filteredNfts}
                  onTokenSelect={handleSelectToken}
                  title="Add another NFT"
                />
              </div>
            </TabsContent>
          </Tabs>
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
    </div>
  );
}

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

interface TokenInputProps extends ControllerRenderProps<AssetInputs, any> {
  token: InputToken;
  name: string;
}

const TokenInput = React.forwardRef<HTMLInputElement, TokenInputProps>(
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

interface NftInputProps extends ControllerRenderProps<AssetInputs, any> {
  token: NFTToken;
  name: string;
}
const NftInput = React.forwardRef<HTMLInputElement, NftInputProps>(
  ({ token, name, ...rest }, ref) => {
    return (
      <>
        <div className="flex h-full flex-1 items-center rounded-xl bg-gray-1000 px-1 ">
          <NftItem token={token} />
        </div>
        <Input
          type="hidden"
          wrapperClassName="absolute w-0 h-0"
          {...rest}
          ref={ref}
        />
      </>
    );
  },
);
NftInput.displayName = "NftInput";
