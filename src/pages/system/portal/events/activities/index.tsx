import { useTranslate } from "@/core/hooks/use-translate";
import { useEventStore } from "@/core/stores/event";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Alert, AlertIcon, Button, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { ActivityBox } from "./activity-box";
import { EventActivity } from "@/core/types/activity";
import { TimeLine } from "@/components/timeline";
import { useMutation } from "@tanstack/react-query";
import { useError } from "@/core/hooks/use-error";
import { useAxios } from "@/core/hooks/use-axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/enum/routes";
import { AxiosError } from "axios";
import { Spinner } from "@/components/loaders/spinner";
import { transformObjectInFormData, transformValueInCurrencyBRLFormat } from "@/core/helpers";
import { CustomAlertDialog } from "@/components/alert-dialog";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/core/stores/auth";
import { useFinishedSubscribeModalStore } from "@/core/stores/finished-subscribe-modal";
import { useToast } from "@/core/hooks/use-toast";
import { Row } from "./row";

export const EventActivitiesPage: React.FC = () => {
  const toast = useToast();
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const t = useTranslate(["common"]);
  const methods = useForm({ mode: "onChange" });
  const { authData, setAuthData } = useAuthStore((state) => state);

  const canCleanSelection = true;

  const { setIsOpenfinishedSubscribeModal } = useFinishedSubscribeModalStore((state) => state);
  const {
    eventUserSelected: event,
    ticketUserSelected: ticket,
    setEventUserSelected,
  } = useEventStore((state) => state);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [extraMinicourses, setExtraMinicourses] = useState<number>(0);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState<boolean>(false);
  const [activitiesSelected, setActivitiesSelected] = useState<string[]>([]);
  const [lastActivitySelected, setLastActivitySelected] = useState<string>();
  const [isOpenAlertDialogConfirm, setIsOpenAlertDialogConfirm] = useState<boolean>(false);

  const eventActivitiesQuery = useMutation({
    mutationKey: ["event-activities"],
    mutationFn: () =>
      axios.getFn<{ [date: string]: { [type: string]: EventActivity[] } }>(
        `${event?.id}/activities`,
      ),
  });

  const postEventRegisterQuery = useMutation({
    mutationKey: ["post-event-register"],
    mutationFn: (formdata: FormData) =>
      axios.postFn<string>(`user/${authData?.user}/events`, formdata, false),
  });

  const timeline = [
    {
      active: false,
      text: "Selecione um evento",
      finished: true,
    },
    {
      active: false,
      text: "Selecione um pacote",
      finished: true,
    },
    {
      active: true,
      text: "Selecione as atividades",
      finished: false,
    },
  ];

  const handleActivityChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    if (event && event.target.checked) {
      const selectedCheckboxes = document.querySelectorAll<HTMLInputElement>(
        `input[name="${event.target.name}"]:checked`,
      );

      selectedCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      const firstCheckbox = document.querySelector<HTMLInputElement>(
        `input[id="${event.target.id}"]`,
      );

      if (firstCheckbox) {
        firstCheckbox.checked = true;
        setLastActivitySelected(firstCheckbox.id);
      }
    }

    const selectedCheckboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:checked',
    );

    const selectedValues = Array.from(selectedCheckboxes).map((checkbox) => checkbox.value);

    setActivitiesSelected(selectedValues);
  };

  const handleConfirmEventRegister = () => {
    const checkInputs = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:checked',
    );

    const activities = Array.from(checkInputs)
      .map((node) => parseInt(node.id, 10))
      .sort((a, b) => a - b);

    if (!activities?.length) {
      toast.show("warning", t("common:least-one-activity"));
      setIsOpenAlertDialog(false);
      return;
    }

    const form = {
      eventId: event?.id,
      ticketId: ticket?.id,
      price: totalPrice.toString(),
      activities,
    };

    const formdata = transformObjectInFormData(form);

    postEventRegisterQuery.mutate(formdata);

    setIsOpenAlertDialog(false);
  };

  const handleCleanSeletion = () => {
    methods.reset();

    const checkInputs = document.querySelectorAll<HTMLInputElement>('input[class="clear"]');

    checkInputs.forEach((input) => {
      input.checked = false;
    });

    handleActivityChange();
  };

  const handleAddMinicourseExtra = () => {
    setExtraMinicourses((prev) => prev - 1);

    const checkbox = document.querySelector<HTMLInputElement>(
      `input[id="${lastActivitySelected}"]`,
    );

    if (checkbox) {
      checkbox.checked = false;
    }

    setIsOpenAlertDialogConfirm(false);
  };

  useEffect(() => {
    if (eventActivitiesQuery.isError) error.dispatch(eventActivitiesQuery.error as AxiosError);
  }, [eventActivitiesQuery.isError]);

  useEffect(() => {
    if (postEventRegisterQuery.isError) {
      error.dispatch(postEventRegisterQuery.error as AxiosError);
      eventActivitiesQuery.mutate();
      methods.reset();
    }

    if (postEventRegisterQuery.isSuccess && event) {
      setAuthData({ ...authData, registeredEvent: true });
      setEventUserSelected({ ...event, price: totalPrice.toString() });
      setIsOpenfinishedSubscribeModal(true);
      navigate(ROUTES.EVENTS);
    }
  }, [postEventRegisterQuery.isError, postEventRegisterQuery.isSuccess]);

  useEffect(() => {
    if (!event?.id || !ticket?.id) navigate(ROUTES.EVENTS);
    else eventActivitiesQuery.mutate();
  }, [ticket]);

  useEffect(() => {
    if (eventActivitiesQuery?.data && ticket?.minicourse_limit !== "-1") {
      const filteredList: EventActivity[] = [];

      Object.values(eventActivitiesQuery.data).forEach((activitiesByDate) => {
        Object.values(activitiesByDate).forEach((activityArray) => {
          const filteredActivities = activityArray.filter(
            (activity: EventActivity) =>
              activitiesSelected.includes(activity.id) && activity.type === "minicourse",
          );

          filteredList.push(...filteredActivities);
        });
      });

      const count = filteredList.length;
      const totalExtraMinicourse =
        count > Number(ticket?.minicourse_limit) ? count - Number(ticket?.minicourse_limit) : 0;

      if (totalExtraMinicourse) {
        setIsOpenAlertDialogConfirm(true);
      }

      setExtraMinicourses(totalExtraMinicourse);
    }
  }, [activitiesSelected]);

  useEffect(() => {
    handleActivityChange();
  }, []);

  useEffect(() => {
    if (ticket?.id) {
      const price = Number(ticket.price);
      const discount = Number(ticket.discount);
      const minicourseAdditionalValue = Number(ticket?.additionValue) * extraMinicourses;
      const total = price + minicourseAdditionalValue - discount;

      setTotalPrice(total);
    }
  }, [ticket, extraMinicourses]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("common:activities")}</Heading>
        </HeaderPanel>

        <BodyPanel alignItems="center" flexDirection="column" justifyContent="center">
          <>
            <TimeLine timeline={timeline} />

            {eventActivitiesQuery.isPending ? (
              <Spinner />
            ) : (
              <>
                <Text fontSize="2xl" fontWeight="semibold" textAlign="center">
                  Abaixo constam as atividades do evento que você poderá participar
                </Text>

                <Text my={6} textAlign="justify">
                  Algumas atividades possuem horários conflitantes, o que significa que não será
                  possível selecionar e participar de ambas ao mesmo tempo. Além disso, algumas
                  atividades já foram pré-selecionadas, pois é necessário participar de pelo menos
                  75% delas para obter o certificado.
                </Text>

                {/* {ticket && (
                  <Alert status="info" mb={5}>
                    <AlertIcon />

                    <Text>
                      {`Com o pacote escolhido você consegue fazer ${
                        ticket?.minicourse_limit
                      } minicurso(s), caso você queira fazer mais minicursos será cobrado uma taxa de ${transformValueInCurrencyBRLFormat(
                        ticket?.additionValue,
                      )} como adicional. `}
                    </Text>
                  </Alert>
                )} */}

                {ticket && (
                  <Alert status="info" mb={5}>
                    <AlertIcon />

                    <Text>
                      Você pode escolher apenas 1 minicurso para participar durante a SETC 2024.
                    </Text>
                  </Alert>
                )}

                {event && ticket && eventActivitiesQuery.data && (
                  <Grid width="100%" gridTemplateColumns="repeat(12, 1fr)" gridGap={4}>
                    <GridItem colSpan={[12, 12, 12, 12, 9]}>
                      <Flex
                        padding={4}
                        border="1px"
                        gridGap="20px"
                        borderRadius="20px"
                        borderColor="gray.300"
                        justifyContent="center"
                        flexDirection="column"
                      >
                        <Row
                          methods={methods}
                          data={eventActivitiesQuery.data}
                          handleActivityChange={handleActivityChange}
                          isLoading={postEventRegisterQuery.isPending}
                        />
                      </Flex>
                    </GridItem>

                    <GridItem colSpan={[12, 12, 12, 12, 3]}>
                      <Flex
                        padding={4}
                        gridGap={4}
                        border="1px"
                        minHeight="300px"
                        borderRadius="20px"
                        borderColor="gray.300"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <Heading textAlign="center">{t("common:summary")}</Heading>

                        <Flex flexDirection="column" gridGap={6}>
                          <Flex justifyContent="space-between">
                            <Text fontWeight="medium">{t("common:ticket")}:</Text>
                            <Text>{ticket?.name}</Text>
                          </Flex>

                          <Flex justifyContent="space-between">
                            <Text fontWeight="medium">{t("common:value")}:</Text>
                            <Text>{transformValueInCurrencyBRLFormat(ticket.price)}</Text>
                          </Flex>

                          {extraMinicourses > 0 && (
                            <Flex flexDirection="column" gridGap={2}>
                              <Text fontWeight="medium">{t("common:addition")}:</Text>

                              <Flex justifyContent="space-between" alignItems="center">
                                <Text fontSize="sm" fontWeight="medium" color="gray.500">
                                  {extraMinicourses === 1
                                    ? `${extraMinicourses} ${t("common:extra-minicourse")}`
                                    : `${extraMinicourses} ${t("common:extra-minicourses")}`}
                                </Text>
                                <Text>
                                  {transformValueInCurrencyBRLFormat(
                                    Number(ticket?.additionValue) * extraMinicourses,
                                  )}
                                </Text>
                              </Flex>
                            </Flex>
                          )}

                          {ticket.discount !== "0" && (
                            <Flex flexDirection="column" gridGap={2}>
                              <Text fontWeight="medium">{t("common:discounts")}:</Text>

                              <Flex justifyContent="space-between" alignItems="center">
                                <Text fontSize="sm" fontWeight="medium" color="gray.500">
                                  {t("common:total-value")}
                                </Text>
                                <Text>{transformValueInCurrencyBRLFormat(ticket.discount)}</Text>
                              </Flex>
                            </Flex>
                          )}

                          <hr />

                          <Flex justifyContent="space-between">
                            <Text fontWeight="medium">{t("common:total-value")}:</Text>
                            <Text>
                              {ticket.price === "0"
                                ? t("common:free")
                                : `${transformValueInCurrencyBRLFormat(totalPrice)}`}
                            </Text>
                          </Flex>
                        </Flex>

                        {canCleanSelection && (
                          <Button
                            variant="outline"
                            colorScheme="blue"
                            onClick={() => handleCleanSeletion()}
                            isLoading={postEventRegisterQuery.isPending}
                            isDisabled={postEventRegisterQuery.isPending}
                          >
                            {t("common:clean-selection")}
                          </Button>
                        )}

                        <Button
                          colorScheme="blue"
                          onClick={() => setIsOpenAlertDialog(true)}
                          isLoading={postEventRegisterQuery.isPending}
                          isDisabled={postEventRegisterQuery.isPending}
                        >
                          {t("common:confirm")}
                        </Button>
                      </Flex>
                    </GridItem>
                  </Grid>
                )}
              </>
            )}

            {isOpenAlertDialog && (
              <CustomAlertDialog
                isOpen={isOpenAlertDialog}
                title={t("common:confirm-subscribe")}
                bodyText={t("common:confirm-subscribe-text")}
                onClickCancel={() => setIsOpenAlertDialog(false)}
                onClickConfirm={methods.handleSubmit(handleConfirmEventRegister)}
              />
            )}

            {isOpenAlertDialogConfirm && (
              <CustomAlertDialog
                isOpen={isOpenAlertDialogConfirm}
                onClickCancel={handleAddMinicourseExtra}
                title={t("common:confirm-add-minicourse-extra-title")}
                bodyText={t("common:confirm-add-minicourse-extra-text")}
                onClickConfirm={() => setIsOpenAlertDialogConfirm(false)}
              />
            )}
          </>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
