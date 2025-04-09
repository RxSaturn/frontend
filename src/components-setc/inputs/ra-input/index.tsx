import { Input } from "@/components/inputs/input";
import { HookForm } from "@/core/types/hook-form";
import { useTranslate } from "@/core/hooks/use-translate";

export const RAInput: React.FC<HookForm> = ({ methods, ...restProps }) => {
  const t = useTranslate(["common", "validation"]);

  return (
    <Input
      name="ra"
      label="RA"
      methods={methods}
      rules={{ required: t("validation:required") }}
      {...restProps}
    />
  );
};
