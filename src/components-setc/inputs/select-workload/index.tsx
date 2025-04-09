import { HookForm } from "@/core/types/hook-form";
import { SelectInput } from "@/components/inputs/select";
import { useTranslate } from "@/core/hooks/use-translate";
import { Flex } from "@chakra-ui/react";
import { Spinner } from "@/components/loaders/spinner";

type SelectWorkloadProps = HookForm & {
  defaultValue?: string;
};

export const SelectWorkload = ({ methods, defaultValue = "" }: SelectWorkloadProps) => {
  const t = useTranslate(["common", "validation"]);

  const options = [];

  for (let i = 1; i <= 9; i++) {
    options.push({
      value: String(i * 3600),
      label: `${i}h`,
    });

    if (i !== 9) {
      options.push({
        value: String(i * 3600 + 1800),
        label: `${i}h30m`,
      });
    }
  }

  return options ? (
    <SelectInput
      name="duration"
      methods={methods}
      options={options}
      inputValue={defaultValue}
      label={t("common:workload")}
      rules={{ required: t("validation:required") }}
    />
  ) : (
    <Flex alignItems="center" justifyContent="center" height="inherit">
      <Spinner />
    </Flex>
  );
};
