import { Input } from "@/components/inputs/input";
import { HookForm } from "@/core/types/hook-form";
import { validateCpf } from "@/core/helpers/validator";
import { useTranslate } from "@/core/hooks/use-translate";
import { InputProps } from "@chakra-ui/react";

interface CPFInputProps extends HookForm, Omit<InputProps, "defaultValue"> {}

export const CPFInput: React.FC<CPFInputProps> = ({ methods, rules, ...restProps }) => {
  const t = useTranslate(["validation"]);

  const handleOnValidateCpf = (event: string) => {
    validateCpf(event) === false &&
      methods.setError("cpf", { type: "validate", message: "CPF inválido!" });
  };

  return (
    <Input
      mask="cpf"
      name="cpf"
      label="CPF"
      maxLength={14}
      methods={methods}
      isRequired={true}
      rules={rules || { required: t("validation:required") }}
      onBlur={handleOnValidateCpf}
      {...restProps}
    />
  );
};
