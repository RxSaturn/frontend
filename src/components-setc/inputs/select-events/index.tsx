import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flex, Spinner } from "@chakra-ui/react";

import { Event } from "@/core/types/events";
import { HookForm } from "@/core/types/hook-form";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { SelectInput } from "@/components/inputs/select";
import { SelectOptions } from "@/core/types/select-input";
import { useTranslate } from "@/core/hooks/use-translate";

type EventsInputProps = HookForm & {
  name?: string;
  label?: string;
  hintText?: string;
  defaultValue?: string;
};

export const EventsInput: React.FC<EventsInputProps> = ({
  name,
  label,
  rules,
  methods,
  hintText,
  defaultValue = "",
}) => {
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common", "validation"]);

  const [eventsOptions, setEventsOptions] = useState<SelectOptions[]>();
  const [eventSelected, setEventSelected] = useState<string>(defaultValue);

  const eventsQuery = useQuery({
    queryKey: ["get-events"],
    queryFn: () => axios.getFn<Event[]>(`events`),
  });

  useEffect(() => {
    if (eventsQuery.isError) error.dispatch(eventsQuery.error as AxiosError);
    if (eventsQuery.isSuccess) {
      const list = eventsQuery.data.map((item: Event) => {
        return {
          value: item.id,
          label: `${item.title} - ${item.year}`,
        };
      });

      setEventsOptions(list);

      if (list.length === 1) {
        setEventSelected(list[0].value);
      } else if (list.length > 0) {
        const last = list.slice(-1)[0];
        last && setEventSelected(last.value);
      }
    }
  }, [eventsQuery.isError, eventsQuery.isSuccess]);

  return eventsOptions ? (
    <SelectInput
      rules={rules}
      methods={methods}
      hintText={hintText}
      options={eventsOptions}
      name={name || "events"}
      inputValue={eventSelected}
      label={label || t("common:events")}
    />
  ) : (
    <Flex alignItems="center" justifyContent="center" height="inherit">
      <Spinner />
    </Flex>
  );
};
