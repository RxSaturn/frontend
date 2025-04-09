import { Input } from "@/components/inputs/input";
import { HookForm } from "@/core/types/hook-form";
import { useTranslate } from "@/core/hooks/use-translate";

interface EmailInputProps extends HookForm {
  label?: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({ methods, label, ...restProps }) => {
  const t = useTranslate(["common", "validation"]);

  return (
    <Input
      name="email"
      type="email"
      maxLength={100}
      methods={methods}
      isRequired={true}
      label={label || t("common:email")}
      rules={{
        required: t("validation:required"),
        maxLength: {
          value: 100,
          message: t("validation:max-length", {
            field: label || t("common:email"),
            number: 100,
          }),
        },
      }}
      {...restProps}
    />
  );
};
