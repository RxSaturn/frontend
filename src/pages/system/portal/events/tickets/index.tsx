import { useTranslate } from "@/core/hooks/use-translate";
import { useEventStore } from "@/core/stores/event";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Flex, Heading } from "@chakra-ui/react";
import { TicketCard } from "./card";
import { TimeLine } from "@/components/timeline";
import { EventTicket } from "@/core/types/eventTicket";
import { ROUTES } from "@/core/enum/routes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/loaders/spinner";
import { useAuthStore } from "@/core/stores/auth";

export const TicketsPage: React.FC = () => {
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const t = useTranslate(["common"]);

  const { eventUserSelected: event } = useEventStore((state) => state);
  const { authData } = useAuthStore((state) => state);

  const eventTicketsQuery = useMutation({
    mutationKey: ["event-tickets"],
    mutationFn: () => axios.getFn<EventTicket[]>(`${event?.id}/${authData.user}/tickets`),
  });

  const timeline = [
    {
      active: false,
      text: "Selecione um evento",
      finished: true,
    },
    {
      active: true,
      text: "Selecione um pacote",
      finished: false,
    },
    {
      active: false,
      text: "Selecione as atividades",
      finished: false,
    },
  ];

  useEffect(() => {
    if (eventTicketsQuery.isError) error.dispatch(eventTicketsQuery.error as AxiosError);
  }, [eventTicketsQuery.isError]);

  useEffect(() => {
    if (!event?.id) navigate(ROUTES.EVENTS);
    else eventTicketsQuery.mutate();
  }, [event]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("common:tickets")}</Heading>
        </HeaderPanel>

        <BodyPanel alignItems="center" flexDirection="column" justifyContent="center">
          <TimeLine timeline={timeline} />

          {eventTicketsQuery.isPending ? (
            <Spinner />
          ) : (
            <Flex gridGap={6} flexWrap="wrap">
              {eventTicketsQuery.data?.map((item, index) => {
                return <TicketCard key={index} ticket={item} />;
              })}
            </Flex>
          )}
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
