import { SelectInput } from "@/components/inputs/select";
import { Activities } from "@/core/types/activity";
import { HookForm } from "@/core/types/hook-form";
import { SelectOptions } from "@/core/types/select-input";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useEffect, useState } from "react";

interface ActivitiesInputProps extends HookForm {
  eventId: string | undefined;
  name?: string;
  label?: string;
  hintText?: string;
  defaultValue?: string;
}

export const ActivitiesInput: React.FC<ActivitiesInputProps> = ({
  name,
  label,
  rules,
  eventId,
  methods,
  hintText,
  defaultValue = "",
}) => {
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common", "validation"]);

  const [activitiesOptions, setActivitiesOptions] = useState<SelectOptions[]>();

  const activitiesQuery = useMutation({
    mutationKey: ["activities"],
    mutationFn: (id: string) => axios.getFn<Activities[]>(`activities/${id}`),
  });

  useEffect(() => {
    if (activitiesQuery.isError) error.dispatch(activitiesQuery.error as AxiosError);
    if (activitiesQuery.isSuccess) {
      const list = activitiesQuery.data.map((item: Activities) => {
        return {
          value: item.id,
          label: item.title,
        };
      });

      setActivitiesOptions(list);
    }
  }, [activitiesQuery.isError, activitiesQuery.isSuccess]);

  useEffect(() => {
    if (eventId) {
      activitiesQuery.mutate(eventId);
    }
  }, [eventId]);

  return (
    <SelectInput
      rules={rules}
      methods={methods}
      hintText={hintText}
      name={name || "activity"}
      inputValue={defaultValue}
      options={activitiesOptions}
      label={label || t("common:type")}
    />
  );
};
