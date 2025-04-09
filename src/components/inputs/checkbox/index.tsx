import {
  CheckboxProps as BaseCheckboxProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Checkbox as ChakraCheckbox,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Controller, RegisterOptions, UseFormReturn } from "react-hook-form";

export interface CheckboxProps extends Omit<BaseCheckboxProps, "defaultValue"> {
  name: string;
  methods: UseFormReturn<any>;
  label?: string;
  inputValue?: boolean;
  defaultValue?: boolean;
  onChange?: (e: any) => void;
  showBottomMessage?: boolean;
  showRequiredSymbol?: boolean;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  rules,
  methods,
  isChecked,
  defaultValue,
  showBottomMessage = true,
  showRequiredSymbol = false,
  onChange: onChangeFunction,
  ...restProps
}) => {
  const isRequired = !!rules?.required && showRequiredSymbol;

  useEffect(() => {
    methods.setValue(name, isChecked);
  }, [isChecked]);

  return (
    <Controller
      name={name}
      rules={rules}
      control={methods.control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }: any) => (
        <FormControl id={name} isRequired={isRequired} isInvalid={error}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

          <ChakraCheckbox
            isChecked={value}
            onChange={(e) => {
              onChange(e.target.checked);
              onChangeFunction && onChangeFunction(e.target.checked);
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
