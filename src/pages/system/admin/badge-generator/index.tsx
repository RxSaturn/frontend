import { EventsInput } from "@/components-setc/inputs/select-events";
import { OrderByInput } from "@/components-setc/inputs/select-order";
import { UserStatusInput } from "@/components-setc/inputs/select-status";
import { User } from "@/core/types/user";
import { useAxios } from "@/core/hooks/use-axios";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Flex, Heading, IconButton, Tooltip } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BadgeCard } from "./card";
import { Spinner } from "@/components/loaders/spinner";
import { BsPrinterFill } from "react-icons/bs";
import { Checkbox } from "@/components/inputs/checkbox";

interface QueryParams {
  event: string;
  params: { status: string; order: string };
}

export const BadgeGeneratorPage: React.FC = () => {
  const { axios } = useAxios();
  const { error } = useError();
  const methods = useForm({ mode: "onChange" });
  const t = useTranslate(["common", "validation"]);

  const [userList, setUserList] = useState<any[]>([]);

  useDocumentTitle(t("menu:badge-generator"));

  const order = methods.watch("order");
  const event = methods.watch("events");
  const status = methods.watch("status");
  const onlyOrganizers = methods.watch("onlyOrganizers");

  const subscribeUsersQuery = useMutation({
    mutationKey: ["get-subscribe-users"],
    mutationFn: (p: QueryParams) =>
      axios.getFn<User[]>(`event/${p.event}/users`, { params: p.params }),
  });

  const organizersQuery = useMutation({
    mutationKey: ["get-team-users"],
    mutationFn: (event: string) => axios.getFn<User[]>(`event/${event}/organizers`),
  });

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (subscribeUsersQuery.isError) error.dispatch(subscribeUsersQuery.error as AxiosError);
    if (subscribeUsersQuery.isSuccess) setUserList(subscribeUsersQuery.data || []);
  }, [subscribeUsersQuery.isError, subscribeUsersQuery.isSuccess]);

  useEffect(() => {
    if (organizersQuery.isError) error.dispatch(organizersQuery.error as AxiosError);
    if (organizersQuery.isSuccess) setUserList(organizersQuery.data || []);
  }, [organizersQuery.isError, organizersQuery.isSuccess]);

  useEffect(() => {
    if (event?.value && status?.value && order?.value) {
      if (onlyOrganizers) {
        organizersQuery.mutate(event.value);
      } else {
        subscribeUsersQuery.mutate({
          event: event.value,
          params: { status: status.value, order: order.value },
        });
      }
    }
  }, [event?.value, status, order, onlyOrganizers]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:badge-generator")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex justifyContent="space-between" alignItems="center" className="hide-on-print">
            <Flex width="900px" gridGap={3}>
              <EventsInput methods={methods} />
              <UserStatusInput methods={methods} defaultValue="0" />
              <OrderByInput methods={methods} defaultValue="name" />
            </Flex>

            <Tooltip label="Imprimir" shouldWrapChildren>
              <IconButton aria-label="" icon={<BsPrinterFill />} onClick={() => handlePrint()} />
            </Tooltip>
          </Flex>

          <Flex my={3} className="hide-on-print">
            <Checkbox name="onlyOrganizers" methods={methods}>
              Gerar dos organizadores
            </Checkbox>
          </Flex>

          <Flex mt={8} width="100%">
            {subscribeUsersQuery.isPending || organizersQuery.isPending ? (
              <Flex alignItems="center" justifyContent="center" height="inherit" mt={6}>
                <Spinner />
              </Flex>
            ) : (
              <Flex flexWrap="wrap" gridGap={3} alignItems="center" justifyContent="center">
                {userList.map((item, index) => {
                  return <BadgeCard key={index} user={item} isOrganizerBagde={onlyOrganizers} />;
                })}
              </Flex>
            )}
          </Flex>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
