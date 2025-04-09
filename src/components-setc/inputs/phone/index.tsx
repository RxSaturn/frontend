import { Input } from "@/components/inputs/input";
import { HookForm } from "@/core/types/hook-form";
import { useTranslate } from "@/core/hooks/use-translate";

export const PhoneInput: React.FC<HookForm> = ({ methods, ...restProps }) => {
  const t = useTranslate(["common", "validation"]);

  return (
    <Input
      mask="phone"
      name="phone"
      maxLength={15}
      methods={methods}
      isRequired={true}
      label={t("common:phone")}
      rules={{ required: t("validation:required") }}
      {...restProps}
    />
  );
};
