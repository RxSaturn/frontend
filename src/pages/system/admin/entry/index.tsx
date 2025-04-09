import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import { useError } from "@/core/hooks/use-error";
import { useAxios } from "@/core/hooks/use-axios";
import { CardItem } from "./attendance-control/card-item";
import { EventActivities } from "@/core/types/activity";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { EventsInput } from "@/components-setc/inputs/select-events";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { AttendanceModal } from "@/components-setc/modals/attendance-modal";
import { Spinner } from "@/components/loaders/spinner";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { SearchInput } from "@/components/search-input";

export const EntryPage: React.FC = () => {
  const { error } = useError();
  const { axios } = useAxios();
  const methods = useForm({ mode: "onChange" });
  const t = useTranslate(["common", "validation"]);

  useDocumentTitle(t("menu:entry"));

  const event = methods.watch("event");

  const [activitySelected, setActivitySelected] = useState<EventActivities>();
  const [isOpenAttendanceModal, setIsOpenAttendanceModal] = useState(false);
  const [activityList, setActivityList] = useState<EventActivities[]>([]);

  const getKey = (item: EventActivities) => item.title;

  const handleOnUpdateActivityList = (list: EventActivities[]) => {
    if (list.length === 0 && activitiesQuery.data) {
      setActivityList(activitiesQuery.data);
      return;
    }

    setActivityList(list);
  };

  const activitiesQuery = useMutation({
    mutationKey: ["get-event-activities"],
    mutationFn: (event: string) => axios.getFn<EventActivities[]>(`event/${event}/activities`),
  });

  const onCloseModal = () => {
    setIsOpenAttendanceModal(false);
    activitiesQuery.mutate(event?.value);
  };

  const handleButtonSeeUserList = (id: EventActivities) => {
    setActivitySelected(id);
    setIsOpenAttendanceModal(true);
  };

  useEffect(() => {
    if (activitiesQuery.isError) error.dispatch(activitiesQuery.error as AxiosError);
    if (activitiesQuery.data) setActivityList(activitiesQuery.data);
  }, [activitiesQuery.isError, activitiesQuery.isSuccess, activitiesQuery.data]);

  useEffect(() => {
    if (event?.value) {
      activitiesQuery.mutate(event?.value);
    }
  }, [event]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:entry")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Stack spacing={4} maxW="400px">
            <Flex maxW="400px">
              <EventsInput name="event" methods={methods} />
            </Flex>
            {activitiesQuery.data && (
              <SearchInput
                getKey={getKey}
                list={activitiesQuery.data}
                setList={handleOnUpdateActivityList}
              />
            )}
          </Stack>

          {activitiesQuery.isPending ? (
            <Flex alignItems="center" justifyContent="center" height="inherit" mt={6}>
              <Spinner />
            </Flex>
          ) : (
            <Flex
              mt={7}
              pb={7}
              gridGap={5}
              flexWrap="wrap"
              overflow={{ base: "hidden", lg: "auto" }}
              maxHeight={{ base: "auto", lg: "calc(100vh - 290px)" }}
            >
              {activityList.map((item, index) => (
                <CardItem key={index} data={item} onClick={handleButtonSeeUserList} />
              ))}
            </Flex>
          )}
        </BodyPanel>

        {isOpenAttendanceModal && activitySelected && (
          <AttendanceModal
            onClose={onCloseModal}
            activity={activitySelected}
            isOpen={isOpenAttendanceModal}
          />
        )}
      </Flex>
    </MenuPanel>
  );
};
