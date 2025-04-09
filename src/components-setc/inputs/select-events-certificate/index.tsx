import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flex, Link, Spinner, Text } from "@chakra-ui/react";

import { Event } from "@/core/types/events";
import { HookForm } from "@/core/types/hook-form";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { SelectInput } from "@/components/inputs/select";
import { SelectOptions } from "@/core/types/select-input";
import { useTranslate } from "@/core/hooks/use-translate";
import { useAuthStore } from "@/core/stores/auth";
import { ROUTES } from "@/core/enum/routes";

type CertificateEventsSelectProps = HookForm & {
  name?: string;
  label?: string;
  hintText?: string;
  defaultValue?: string;
};

export const CertificateEventsSelect = ({
  name,
  label,
  rules,
  methods,
  hintText,
  defaultValue = "",
}: CertificateEventsSelectProps) => {
  const { axios } = useAxios();
  const { error: er } = useError();
  const t = useTranslate(["common", "validation"]);
  const { authData } = useAuthStore((state) => state);

  const [options, setOptions] = useState<SelectOptions[]>();
  const [eventSelected, setEventSelected] = useState<string>(defaultValue);

  const { data, isSuccess, isError, error, isPending } = useQuery({
    queryKey: ["get-certificate-events"],
    queryFn: () => axios.getFn<Event[]>(`user/${authData?.user}/certificate/events`),
  });

  useEffect(() => {
    if (isError) er.dispatch(error as AxiosError);
    if (isSuccess) {
      const list = data.map((item: Event) => {
        return {
          value: item.id,
          label: item.title,
        };
      });

      setOptions(list);

      if (list.length === 1) {
        setEventSelected(list[0].value);
      } else if (list.length > 0) {
        const last = list.slice(-1)[0];
        last && setEventSelected(last.value);
      }
    }
  }, [isError, isSuccess]);

  return !options?.length && !isPending ? (
    <Flex alignItems="center" justifyContent="center">
      <Text fontWeight="medium">
        Não há certificados disponíveis para visualização no momento. Em caso de dúvidas, por favor,
        entre em contato com o nosso{" "}
        <Link href={ROUTES.SUPPORT} color="blue.500">
          suporte
        </Link>
        .
      </Text>
    </Flex>
  ) : isPending ? (
    <Flex alignItems="center" justifyContent="center" height="inherit">
      <Spinner />
    </Flex>
  ) : (
    <Flex maxWidth="600px">
      <SelectInput
        rules={rules}
        methods={methods}
        options={options}
        hintText={hintText}
        isClearable={false}
        name={name || "events"}
        inputValue={eventSelected}
        label={label || t("common:events")}
      />
    </Flex>
  );
};
