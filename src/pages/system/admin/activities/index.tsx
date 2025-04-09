import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Flex, Heading, Text } from "@chakra-ui/react";

import MenuPanel from "@/layouts/system";
import { ROUTES } from "@/core/enum/routes";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { Activities } from "@/core/types/activity";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { useTranslate } from "@/core/hooks/use-translate";
import LinkButton from "@/components/buttons/link-button";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { EventsInput } from "@/components-setc/inputs/select-events";

import ActivitiesTable from "./activities-table";

const ActivitiesPage = () => {
  const { axios } = useAxios();
  const { error: er } = useError();
  const methods = useForm({ mode: "onChange" });
  const t = useTranslate(["menu", "common", "validation"]);

  useDocumentTitle(t("menu:activities"));

  const event = methods.watch("events");

  const { data, isPending, mutate, isError, error } = useMutation({
    mutationKey: ["activities"],
    mutationFn: () => axios.getFn<Activities[]>(`activities/${event.value}`),
  });

  useEffect(() => {
    if (isError) er.dispatch(error as AxiosError);
  }, [isError]);

  useEffect(() => {
    if (event?.value) {
      mutate(event?.value);
    }
  }, [event]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:activities")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex justifyContent="space-between" alignItems="center" gridGap={4}>
            <Flex width="400px">
              <EventsInput methods={methods} />
            </Flex>

            <LinkButton variant="solid" to={ROUTES.NEW_ACTIVITY} children={t("common:new")} />
          </Flex>

          <Flex flexDirection="column" alignItems="center">
            {!event?.value ? (
              <Text mt={8} fontSize="xl">
                {t("common:select-event-to-load-data")}
              </Text>
            ) : event?.value && data?.length === 0 ? (
              <Text mt={8} fontSize="xl">
                Nenhum registro encontrado.
              </Text>
            ) : (
              <ActivitiesTable isLoading={isPending} reloadData={mutate} activityList={data} />
            )}
          </Flex>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};

export default ActivitiesPage;
