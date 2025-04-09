import {
  TextareaProps as BaseTextareaProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea as ChakraTextarea,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Controller, RegisterOptions, UseFormReturn } from "react-hook-form";

export interface TextareaProps extends BaseTextareaProps {
  name: string;
  methods: UseFormReturn<any>;
  label?: string;
  inputValue?: boolean;
  onChange?: (e: any) => void;
  showBottomMessage?: boolean;
  showRequiredSymbol?: boolean;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  rules,
  methods,
  defaultValue,
  showBottomMessage = true,
  showRequiredSymbol = false,
  onChange: onChangeFunction,
  ...restProps
}) => {
  const isRequired = !!rules?.required && showRequiredSymbol;

  return (
    <Controller
      name={name}
      rules={rules}
      control={methods.control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }: any) => (
        <FormControl id={name} isRequired={isRequired} isInvalid={error}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

          <ChakraTextarea
            value={value || ""}
            onChange={(e) => {
              onChange(e.target.value);
              onChangeFunction && onChangeFunction(e.target.value);
            }}
            {...restProps}
          />

          {showBottomMessage && error && (
            <FormErrorMessage mt={1}>{error?.message}</FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
};
