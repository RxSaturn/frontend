import { Input } from "@/components/inputs/input";
import { HookForm } from "@/core/types/hook-form";
import { useTranslate } from "@/core/hooks/use-translate";

export const BadgeNameInput: React.FC<HookForm> = ({ methods }) => {
  const t = useTranslate(["common", "validation"]);

  return (
    <Input
      name="badgeName"
      methods={methods}
      isRequired={true}
      label={t("common:badge-name")}
      hintText={t("common:badge-name-hint")}
      rules={{
        required: t("validation:required"),
        maxLength: {
          value: 25,
          message: t("validation:max-length", {
            field: t("common:badge-name"),
            number: 25,
          }),
        },
      }}
    />
  );
};
