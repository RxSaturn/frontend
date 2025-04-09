import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { HookForm } from "@/core/types/hook-form";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { SelectInput } from "@/components/inputs/select";
import { SelectOptions } from "@/core/types/select-input";
import { useTranslate } from "@/core/hooks/use-translate";
import { ActivityTypes } from "@/core/types/activity-types";

type ActivityTypeInputProps = HookForm & {
  defaultValue?: string;
};

export const ActivityTypeInput: React.FC<ActivityTypeInputProps> = ({
  methods,
  defaultValue = "",
}) => {
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common", "validation"]);

  const [activityTypeOptions, setActivityTypeOptions] = useState<SelectOptions[]>([]);

  const activityTypesQuery = useQuery({
    queryKey: ["activity-types"],
    queryFn: () => axios.getFn<ActivityTypes[]>(`activity-types`),
  });

  useEffect(() => {
    if (activityTypesQuery.isError) error.dispatch(activityTypesQuery.error as AxiosError);
    if (activityTypesQuery.isSuccess) {
      const list = activityTypesQuery.data.map((item: ActivityTypes) => {
        return {
          value: item.id,
          label: t(`common:${item.name}`),
        };
      });

      setActivityTypeOptions(list);
    }
  }, [activityTypesQuery.isError, activityTypesQuery.isSuccess]);

  return activityTypeOptions.length > 0 ? (
    <SelectInput
      name="type"
      methods={methods}
      label={t("common:type")}
      inputValue={defaultValue}
      options={activityTypeOptions}
      rules={{ required: t("validation:required") }}
    />
  ) : (
    <Flex alignItems="center" justifyContent="center" height="inherit">
      <Spinner />
    </Flex>
  );
};
