import { SelectInput } from "@/components/inputs/select";
import { HookForm } from "@/core/types/hook-form";
import { useTranslate } from "@/core/hooks/use-translate";

export const TShirtSize: React.FC<HookForm> = ({ methods, defaultValue }) => {
  const t = useTranslate(["common", "validation"]);

  const tshirtSizeOptions = [
    { value: "P - 63x48", label: "P - 63x48" },
    { value: "M - 67x50", label: "M - 67x50" },
    { value: "G - 70x54", label: "G - 70x54" },
    { value: "GG - 73x58", label: "GG - 73x58" },
    { value: "XGG - 77x62", label: "XGG - 77x62" },
  ];

  return (
    <SelectInput
      required={true}
      name="tshirtSize"
      methods={methods}
      inputValue={defaultValue}
      options={tshirtSizeOptions}
      label={t("common:tshirt-size")}
      rules={{ required: t("validation:required") }}
    />
  );
};
