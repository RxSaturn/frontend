import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { HookForm } from "@/core/types/hook-form";
import { HintQuestion } from "@/components/hint-question";
import { useTranslate } from "@/core/hooks/use-translate";
import Select, { Props as BaseSelectProps } from "react-select";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

import { SelectStyles } from "./sytle";

interface CustomSelectProps extends HookForm, Omit<BaseSelectProps, "inputValue" | "defaultValue"> {
  name: string;
  label?: string;
  hintText?: string;
  onChange?: (e: any) => void;
  showRequiredSymbol?: boolean;
  inputValue?: string | undefined | null;
}

export const SelectInput: React.FC<CustomSelectProps> = (props) => {
  const {
    name,
    label,
    rules,
    methods,
    options,
    hintText,
    inputValue,
    isClearable = true,
    isSearchable = true,
    showRequiredSymbol = false,
    onChange: onChangeFunction,
    ...restProps
  } = props;

  const t = useTranslate(["common"]);

  const isRequired = !!rules?.required && showRequiredSymbol;

  useEffect(() => {
    if (options && options.length && inputValue !== undefined) {
      if (inputValue) {
        const option = options.find((item: any) => {
          return item.value === inputValue.toString();
        });

        methods.setValue(name, option, {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else if (inputValue == null) {
        methods.setValue(name, inputValue, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
    }
  }, [inputValue]);

  return (
    <Controller
      name={name}
      rules={rules}
      control={methods.control}
      render={({ field: { onChange, value }, fieldState: { error } }: any) => (
        <FormControl id={name} isRequired={isRequired} isInvalid={error}>
          {label && (
            <FormLabel gridGap={2} display="flex" alignItems="center" htmlFor={props.name}>
              {label}
              {hintText && <HintQuestion hintText={hintText} />}
            </FormLabel>
          )}

          <Select
            value={value}
            options={options}
            styles={SelectStyles}
            isClearable={isClearable}
            isSearchable={isSearchable}
            loadingMessage={() => t("common:loading")}
            noOptionsMessage={() => t("common:no-options-select")}
            placeholder={!!rules?.required ? t("common:select-option-placeholder") : ""}
            onChange={(e: any) => {
              onChange(e);
              onChangeFunction && onChangeFunction(e?.value);
            }}
            {...restProps}
          />

          {error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
        </FormControl>
      )}
    />
  );
};
