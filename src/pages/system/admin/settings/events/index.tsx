import { Event } from "@/core/types/events";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Flex, Heading } from "@chakra-ui/react";
import { CardItem } from "./card-item";
import { Spinner } from "@/components/loaders/spinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosError } from "axios";

export const SettingsEventsPage: React.FC = () => {
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common", "permissions"]);

  const eventsQuery = useQuery({
    queryKey: ["get-settings-events"],
    queryFn: () => axios.getFn<Event[]>(`events`),
  });

  useEffect(() => {
    if (eventsQuery.isError) error.dispatch(eventsQuery.error as AxiosError);
    if (eventsQuery.isSuccess) {
    }
  }, [eventsQuery.isError, eventsQuery.isSuccess]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("permissions:settings-events")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          {eventsQuery.isLoading ? (
            <Flex alignItems="center" justifyContent="center" height="inherit" mt={6}>
              <Spinner />
            </Flex>
          ) : (
            <Flex flexWrap="wrap" mt={7} gridGap={5}>
              {eventsQuery.data?.map((item, index) => {
                return <CardItem key={index} data={item} />;
              })}
            </Flex>
          )}
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
