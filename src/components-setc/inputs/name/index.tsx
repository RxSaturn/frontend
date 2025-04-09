import { Input } from "@/components/inputs/input";
import { HookForm } from "@/core/types/hook-form";
import { useTranslate } from "@/core/hooks/use-translate";

export const NameInput: React.FC<HookForm> = ({ methods, ...restProps }) => {
  const t = useTranslate(["common", "validation"]);

  return (
    <Input
      name="name"
      methods={methods}
      isRequired={true}
      label={t("common:full-name")}
      hintText={t("common:full-name-hint")}
      rules={{ required: t("validation:required") }}
      {...restProps}
    />
  );
};
