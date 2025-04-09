import { EventsInput } from "@/components-setc/inputs/select-events";
import { Spinner } from "@/components/loaders/spinner";
import { User } from "@/core/types/user";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Flex, Heading, Switch, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SendEmailTable } from "./table";
import { UserStatusInput } from "@/components-setc/inputs/select-status";
import { OrderByInput } from "@/components-setc/inputs/select-order";
import { useDocumentTitle } from "@/core/hooks/use-document-title";

type QueryParams = {
  event: string;
  params: { status: string; order: string };
};

export const SendEmailPage: React.FC = () => {
  const { axios } = useAxios();
  const { error: er } = useError();
  const t = useTranslate(["common", "menu"]);
  const methods = useForm({ mode: "onChange" });

  const [filter, setFilter] = useState<User[]>([]);
  const [certificateFilter, setCertificateFilter] = useState<boolean>(false);

  useDocumentTitle(t("menu:send-email"));

  const event = methods.watch("events");
  const status = methods.watch("status");
  const order = methods.watch("order");

  const { data, error, isError, isPending, mutate } = useMutation({
    mutationKey: ["get-subscribe-users"],
    mutationFn: (p: QueryParams) =>
      axios.getFn<User[]>(`event/${p.event}/users`, { params: p.params }),
    onSuccess: (data) => {
      if (certificateFilter) {
        const filtered = data.filter((item) => item.participation >= 75);
        setFilter(filtered);
      } else {
        setFilter(data);
      }
    },
  });

  useEffect(() => {
    if (isError) er.dispatch(error as AxiosError);
  }, [isError]);

  useEffect(() => {
    if (event?.value && status?.value && order?.value) {
      mutate({
        event: event.value,
        params: { status: status.value, order: order.value },
      });
    }
  }, [event?.value, status, order, certificateFilter]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:send-email")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex gridGap={3}>
            <EventsInput methods={methods} />
            <UserStatusInput methods={methods} defaultValue="0" />
            <OrderByInput methods={methods} defaultValue="name" />
            <Flex flexDirection="column" gap={3} minWidth="250px">
              <Text>Apenas com 75% das atividades</Text>
              <Switch
                size="md"
                isChecked={certificateFilter}
                onChange={() => setCertificateFilter(!certificateFilter)}
              />
            </Flex>
          </Flex>

          {isPending ? (
            <Flex alignItems="center" justifyContent="center" height="inherit" mt={6}>
              <Spinner />
            </Flex>
          ) : (
            <SendEmailTable users={filter} />
          )}
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
