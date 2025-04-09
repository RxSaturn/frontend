import { SelectInput } from "@/components/inputs/select";
import { HookForm } from "@/core/types/hook-form";
import { useTranslate } from "@/core/hooks/use-translate";

export const AffiliationIFMGInput: React.FC<HookForm> = ({ methods, defaultValue }) => {
  const t = useTranslate(["common", "validation"]);

  const affiliationOptions = [
    { value: "professor", label: t("common:professor") },
    { value: "technical-administrative", label: t("common:technical-administrative") },
    { value: "student", label: t("common:student") },
    { value: "no-affiliation", label: t("common:no-affiliation") },
  ];

  return (
    <SelectInput
      methods={methods}
      name="affiliationIfmg"
      inputValue={defaultValue}
      options={affiliationOptions}
      label={t("common:affiliation-ifmg")}
      rules={{ required: t("validation:required") }}
    />
  );
};
