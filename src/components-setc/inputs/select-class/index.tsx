import { HookForm } from "@/core/types/hook-form";
import { useTranslate } from "@/core/hooks/use-translate";

import { SelectInput } from "@/components/inputs/select";

export const ClassInput: React.FC<HookForm> = ({ methods, defaultValue }) => {
  const t = useTranslate(["common", "validation"]);

  const currentYear = new Date().getFullYear();
  const classInputOptions: { value: string; label: string }[] = [];

  for (let i = 0; i <= 10; i++) {
    const year = currentYear - i;
    classInputOptions.push({ value: `${year}.1`, label: `${year}.1` });
    classInputOptions.push({ value: `${year}.2`, label: `${year}.2` });
  }

  return (
    <SelectInput
      name="class"
      methods={methods}
      inputValue={defaultValue}
      label={t("common:class")}
      options={classInputOptions}
      rules={{ required: t("validation:required") }}
    />
  );
};
