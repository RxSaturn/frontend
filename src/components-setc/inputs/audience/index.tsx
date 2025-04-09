import { SelectInput } from "@/components/inputs/select";
import { HookForm } from "@/core/types/hook-form";
import { useTranslate } from "@/core/hooks/use-translate";

interface AudienceSelectInputProps extends HookForm {
  defaultValue?: string;
}

export const AudienceSelectInput: React.FC<AudienceSelectInputProps> = ({
  methods,
  defaultValue = "",
}) => {
  const t = useTranslate(["common", "validation"]);

  const audienceSelectOptions = [
    { value: "Técnico", label: "Técnico" },
    { value: "Engenharia de Computação", label: "Engenharia de Computação" },
    { value: "Técnico e Engenharia de Computação", label: "Técnico e Engenharia de Computação" },
  ];

  return (
    <SelectInput
      name="audience"
      methods={methods}
      options={audienceSelectOptions}
      label={t("common:audience")}
      inputValue={defaultValue}
      rules={{ required: t("validation:required") }}
    />
  );
};
