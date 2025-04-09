import { useEffect } from "react";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { Accordion, Flex, Heading } from "@chakra-ui/react";

import MenuPanel from "@/layouts/system";
import { Events } from "@/core/types/events";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useAuthStore } from "@/core/stores/auth";
import BodyPanel from "@/layouts/system/body-panel";
import { useEventStore } from "@/core/stores/event";
import { Spinner } from "@/components/loaders/spinner";
import HeaderPanel from "@/layouts/system/header-panel";
import { useTranslate } from "@/core/hooks/use-translate";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { UpdateProfileModal } from "@/components-setc/modals/update-profile-modal";
import { FinishedSubscribeModal } from "@/components-setc/modals/finished-subscribe";
import { useFinishedSubscribeModalStore } from "@/core/stores/finished-subscribe-modal";

import { EventAccordionItem } from "./accordion-item";

export const EventsPage: React.FC = () => {
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common"]);
  const { authData } = useAuthStore((state) => state);
  const { setTicketUserSelected } = useEventStore((state) => state);

  useDocumentTitle(t("menu:events"));

  const { isOpenfinishedSubscribeModal, setIsOpenfinishedSubscribeModal } =
    useFinishedSubscribeModalStore((state) => state);

  const userEventsQuery = useMutation({
    mutationKey: ["userEvents"],
    mutationFn: () => axios.getFn<Events>(`user/${authData?.user}/events`),
  });

  useEffect(() => {
    if (userEventsQuery.isError) error.dispatch(userEventsQuery.error as AxiosError);
  }, [userEventsQuery.isError]);

  useEffect(() => {
    userEventsQuery.mutate();
    setTicketUserSelected(undefined);
  }, []);

  const userEvents = userEventsQuery.data?.userEvents.filter((item) => item.finished === "0");
  const userEventsFinished = userEventsQuery.data?.userEvents.filter(
    (item) => item.finished === "1",
  );
  const events = userEventsQuery.data?.events.filter(
    (event) => !userEvents?.find((userEvent) => userEvent.id === event.id),
  );

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("common:events")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex alignItems="center" flexDirection="column" justifyContent="center">
            {userEventsQuery.isPending ? (
              <Spinner marginTop={7} />
            ) : (
              <Accordion defaultIndex={[0, 1]} allowMultiple width="100%">
                <EventAccordionItem
                  events={userEvents}
                  title={t("common:user-event-accordion-title")}
                  notResult={t("common:user-event-accordion-not-result")}
                />

                <EventAccordionItem
                  events={events}
                  reload={userEventsQuery.mutate}
                  title={t("common:open-event-accordion-title")}
                  notResult={t("common:open-event-accordion-not-result")}
                />

                <EventAccordionItem
                  events={userEventsFinished}
                  title={t("common:close-event-accordion-title")}
                  notResult={t("common:close-event-accordion-not-result")}
                />
              </Accordion>
            )}
          </Flex>
        </BodyPanel>

        {isOpenfinishedSubscribeModal && (
          <FinishedSubscribeModal
            isOpen={isOpenfinishedSubscribeModal}
            onClose={() => setIsOpenfinishedSubscribeModal(false)}
          />
        )}
      </Flex>

      <UpdateProfileModal />
    </MenuPanel>
  );
};
