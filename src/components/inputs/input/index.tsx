import { HintQuestion } from "@/components/hint-question";
import { HookForm } from "@/core/types/hook-form";
import { applyMask, Mask } from "@/core/helpers/mask";
import {
  InputProps as BaseInputProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Input as ChakraInput,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Controller } from "react-hook-form";

export interface InputProps extends Omit<BaseInputProps, "defaultValue">, HookForm {
  name: string;
  mask?: Mask;
  label?: string;
  hintText?: string;
  leftAddon?: React.ReactNode;
  showBottomMessage?: boolean;
  showRequiredSymbol?: boolean;
  rightAddon?: React.ReactNode;
  ref?: React.LegacyRef<HTMLInputElement>;
  onChange?: any;
  onKeyUp?: any;
  onBlur?: any;
  tipText?: string;
}

export const Input = React.forwardRef(
  (props: InputProps, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
    const {
      mask,
      label,
      rules,
      methods,
      hintText,
      leftAddon,
      rightAddon,
      showBottomMessage = true,
      showRequiredSymbol = false,
      defaultValue,
      onChange,
      onKeyUp,
      onBlur,
      tipText,
      ...restProps
    } = props;

    const isRequired = !!rules?.required && showRequiredSymbol;

    const handleOnKeyUp = (e: any) => {
      if (mask) {
        const value = applyMask(mask, e.target.value);
        props.onKeyUp && props.onKeyUp(value);
      } else {
        props.onKeyUp && props.onKeyUp(e.target.value);
      }
    };

    const handleOnChange = (onChange: any, e: any) => {
      if (mask) {
        const value = applyMask(mask, e.target.value);
        onChange(value);
        props.onChange && props.onChange(value);
      } else {
        onChange(e.target.value);
        props.onChange && props.onChange(e.target.value);
      }
    };

    const handleOnBlur = (onBlur: any, e: any) => {
      if (mask) {
        const value = applyMask(mask, e.target.value);
        onBlur(value);
        props.onBlur && props.onBlur(value);
      } else {
        onBlur(e.target.value);
        props.onBlur && props.onBlur(e.target.value);
      }
    };

    return (
      <Controller
        rules={rules}
        name={props.name}
        control={methods.control}
        defaultValue={
          mask && defaultValue ? applyMask(mask, defaultValue.toString()) : defaultValue
        }
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }: any) => (
          <FormControl id={props.name} isRequired={isRequired} isInvalid={error}>
            {label && (
              <FormLabel gridGap={2} display="flex" alignItems="center" htmlFor={props.name}>
                {label}
                {hintText && <HintQuestion hintText={hintText} />}
                {tipText && <Text color="gray.400">({tipText})</Text>}
              </FormLabel>
            )}

            <InputGroup>
              {leftAddon && leftAddon}

              <ChakraInput
                ref={ref}
                color="black"
                value={value || ""}
                autoComplete="off"
                background="white"
                onKeyUp={(e: any) => handleOnKeyUp(e)}
                onBlur={(e: any) => handleOnBlur(onBlur, e)}
                onChange={(e: any) => handleOnChange(onChange, e)}
                {...restProps}
              />

              {rightAddon && rightAddon}
            </InputGroup>

            {showBottomMessage && error && (
              <FormErrorMessage mt={1}>{error?.message}</FormErrorMessage>
            )}
          </FormControl>
        )}
      />
    );
  },
);
