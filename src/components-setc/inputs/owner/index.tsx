import { SelectInput } from "@/components/inputs/select";
import { HookForm } from "@/core/types/hook-form";
import { Owners } from "@/core/types/owner";
import { SelectOptions } from "@/core/types/select-input";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useEffect, useState } from "react";

interface OwnerInputProps extends HookForm {
  defaultValue?: string;
}

export const OwnerInput: React.FC<OwnerInputProps> = ({ methods, defaultValue }) => {
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common", "validation"]);

  const [ownerOptions, setOwnerOptions] = useState<SelectOptions[]>([]);

  const ownersQuery = useQuery({
    queryKey: ["owners"],
    queryFn: () => axios.getFn<Owners[]>(`owners`),
  });

  useEffect(() => {
    if (ownersQuery.isError) error.dispatch(ownersQuery.error as AxiosError, methods);
    if (ownersQuery.isSuccess) {
      const list = ownersQuery.data.map((item: Owners) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setOwnerOptions(list);
    }
  }, [ownersQuery.isError, ownersQuery.isSuccess]);

  return (
    <SelectInput
      name="owner"
      methods={methods}
      options={ownerOptions}
      label={t("common:owner")}
      inputValue={defaultValue}
      rules={{ required: t("validation:required") }}
    />
  );
};
