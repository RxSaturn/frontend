import React from "react";
import ptBR from "date-fns/locale/pt-BR";
import enUS from "date-fns/locale/en-US";
import { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getLanguage } from "@/core/providers/i18n/language";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Controller, RegisterOptions, UseFormReturn } from "react-hook-form";

import { DatePickerContainer, Wrapper } from "./style";

export type ReactDatePickerProps = DatePickerProps & {
  name: string;
  methods: UseFormReturn<any>;
  label?: string;
  inputValue?: boolean;
  showTime?: boolean;
  defaultValue?: any;
  onChange?: any;
  showBottomMessage?: boolean;
  showRequiredSymbol?: boolean;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
};

export const CustomDatePicker: React.FC<ReactDatePickerProps> = ({
  label,
  name,
  rules,
  methods,
  showTime,
  defaultValue,
  showBottomMessage = true,
  onChange: onChangeFunction,
  showRequiredSymbol = false,
  ...restProps
}) => {
  const isRequired = !!rules?.required && showRequiredSymbol;
  const language = getLanguage().toLowerCase();
  const isBrazilian = language === "pt-br";
  const dateFormat = showTime
    ? isBrazilian
      ? "dd/MM/yyyy HH:mm"
      : "yyyy/MM/dd hh:mm aa"
    : isBrazilian
      ? "dd/MM/yyyy"
      : "yyyy/MM/dd";

  return (
    <Controller
      name={name}
      rules={rules}
      control={methods.control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }: any) => (
        <FormControl id={name} isRequired={isRequired} isInvalid={error}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

          <Wrapper>
            <DatePickerContainer
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={50}
              showMonthDropdown
              selected={value}
              locale={isBrazilian ? ptBR : enUS}
              className={`${error ? "invalid" : ""}`}
              timeCaption={isBrazilian ? "Horário" : "Time"}
              timeFormat={isBrazilian ? "HH:mm" : "hh:mm aa"}
              dateFormat={dateFormat}
              onChange={(date: any, e: any) => {
                onChange(date);
                onChangeFunction && onChangeFunction(date, e);
              }}
              style={{ display: "flexx" }}
              {...restProps}
            />
          </Wrapper>

          {showBottomMessage && error && (
            <FormErrorMessage mt={1}>{error?.message}</FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
};
