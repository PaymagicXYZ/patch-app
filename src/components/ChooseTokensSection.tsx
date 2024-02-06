// NOT WORKING
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
import { InputToken, Token } from "@/types";
import { useConstructTx } from "@/hooks/useConstructTx";
import { SelectTokenDropdown } from "./SelectTokenDropdown";
import { useEffect } from "react";
import { LoadingSpinner } from "./Spinner";

type Inputs = { tokens: InputToken[] };

export function TokenInputForm({
  tokens,
  userId,
}: {
  tokens: Token[];
  userId: UserId;
}) {
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
      userId,
      formattedTxData.to,
      formattedTxData.value,
      formattedTxData.data,
    );
    console.log("tx", tx);
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
        />
        <div className="mt-4 flex justify-end">
          <Button
            type="submit"
            className={cn("hidden text-gray-1000 bg-green-100 hover:bg-green-100/80 gap-2", {
              block: to,
            })}
            disabled={
              form.formState.isSubmitting ||
              !!form.formState.errors.tokens?.length ||
              !fields.length
            }
          >
            {!form.formState.isSubmitting ? (
              <div className="flex gap-2 items-center">
                <div>Send</div> <ArrowRight />
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <LoadingSpinner />
                <div>Transaction Pending</div> <ArrowRight />
              </div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

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
        rightElement={<div>~${_value.toFixed()}</div>}
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
