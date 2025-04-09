import { useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Badge, Box, Button, Flex, Text } from "@chakra-ui/react";

import { Event } from "@/core/types/events";
import { ROUTES } from "@/core/enum/routes";
import { useEventStore } from "@/core/stores/event";
import { useTranslate } from "@/core/hooks/use-translate";
import { getLanguage } from "@/core/providers/i18n/language";
import { UserEventStatus } from "@/core/enum/user-event-status";
import { SubscribeEventModal } from "@/components-setc/modals/subscribe-event";
import { useFinishedSubscribeModalStore } from "@/core/stores/finished-subscribe-modal";

type EventCardProps = {
  event: Event;
  reload?: () => void;
};

export const EventCard = ({ event, reload }: EventCardProps) => {
  const navigate = useNavigate();
  const t = useTranslate(["common"]);
  const [isOpen, setIsOpen] = useState(false);

  const { setEventUserSelected } = useEventStore((state) => state);
  const { setIsOpenfinishedSubscribeModal } = useFinishedSubscribeModalStore((state) => state);

  const transformDateFormat = (startEventDate: string, endEventDate: string) => {
    const language = getLanguage();

    const startDate = new Date(startEventDate);
    const endDate = new Date(endEventDate);

    if (
      !(startDate instanceof Date && !isNaN(startDate.valueOf())) ||
      !(endDate instanceof Date && !isNaN(endDate.valueOf()))
    ) {
      return "";
    }

    const startDateFormatted = new Intl.DateTimeFormat(language, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(startDate);

    const endDateFormatted = new Intl.DateTimeFormat(language, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(endDate);

    return `${startDateFormatted} ~ ${endDateFormatted}`;
  };

  const handleMoreInfo = (id: string) => {
    console.log(id);
  };

  const handleEventSubscribe = (event: Event) => {
    setEventUserSelected(event);
    setIsOpen(true);
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case UserEventStatus.NotRegistered:
        return "purple";
      case UserEventStatus.Registered:
        return "green";
      case UserEventStatus.AwaitingPayment:
        return "yellow";
      case UserEventStatus.Canceled:
        return "red";
      default:
        return "purple";
    }
  };

  const handleOpenPaymentModal = () => {
    setEventUserSelected(event);
    setIsOpenfinishedSubscribeModal(true);
  };

  const handleCloseSubscribeModal = () => {
    setIsOpen(false);
    reload && reload();
  };

  return (
    <>
      <Flex
        padding={5}
        gridGap={7}
        border="1px"
        boxShadow="lg"
        maxWidth="300px"
        minHeight="350px"
        borderRadius="20px"
        borderColor="gray.100"
        flexDirection="column"
        justifyContent="space-around"
      >
        <Flex justifyContent="space-between">
          <Flex
            width="50px"
            height="50px"
            borderRadius="50%"
            alignItems="center"
            background="blue.500"
            justifyContent="center"
          >
            <FaCalendar color="white" />
          </Flex>

          <Box>
            <Badge
              px={3}
              py={1}
              fontSize="xs"
              borderRadius="20px"
              colorScheme={getEventStatusColor(event?.status)}
            >
              {event?.status ? t(`common:${event?.status}`) : t(`common:not-registered`)}
            </Badge>
          </Box>
        </Flex>

        <Flex flexDirection="column">
          <Text color="gray.500">
            {t("common:date")}: {transformDateFormat(event.start_date, event.end_date)}
          </Text>

          <Text fontSize="lg" fontWeight="bold">
            {event.title} - Semana de Engenharia, Tecnologia e Computação
          </Text>
        </Flex>

        <Flex flexDirection="column" gridGap={3}>
          {event?.status === undefined && (
            <Button size="sm" colorScheme="blue" onClick={() => handleEventSubscribe(event)}>
              {t("common:subscribe")}
            </Button>
          )}

          {event?.status === UserEventStatus.AwaitingPayment && (
            <Button size="sm" colorScheme="green" onClick={() => handleOpenPaymentModal()}>
              {t("common:complete-payment")}
            </Button>
          )}

          {(event?.status === UserEventStatus.Registered ||
            event?.status === UserEventStatus.AwaitingPayment) && (
            <Button size="sm" colorScheme="blue" onClick={() => navigate(ROUTES.HOME)}>
              {t("common:see-schedule")}
            </Button>
          )}

          {/* <Button
            size="sm"
            variant="outline"
            color="blue.500"
            colorScheme="blue"
            onClick={() => handleMoreInfo(event?.id)}
          >
            {t("common:more-informations")}
          </Button> */}
        </Flex>
      </Flex>

      {isOpen && (
        <SubscribeEventModal event={event} isOpen={isOpen} onClose={handleCloseSubscribeModal} />
      )}
    </>
  );
};
