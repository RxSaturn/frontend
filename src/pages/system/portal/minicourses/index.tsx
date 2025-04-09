import { UpdateProfileModal } from "@/components-setc/modals/update-profile-modal";
import { Spinner } from "@/components/loaders/spinner";
import { useAxios } from "@/core/hooks/use-axios";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import { useAuthStore } from "@/core/stores/auth";
import { useEventStore } from "@/core/stores/event";
import { useFinishedSubscribeModalStore } from "@/core/stores/finished-subscribe-modal";
import { EventActivity } from "@/core/types/activity";
import { Event, Events } from "@/core/types/events";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Alert, AlertIcon, Button, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { transformObjectInFormData, transformValueInCurrencyBRLFormat } from "@/core/helpers";
import { Row } from "./row";
import { CustomAlertDialog } from "@/components/alert-dialog";
import { useToast } from "@/core/hooks/use-toast";
import { FinishedSubscribeModal } from "@/components-setc/modals/finished-subscribe";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/enum/routes";
import { useUserStore } from "@/core/stores/user";

const MinicourseSelectorPage: React.FC = () => {
  const values = {
    pix: 6,
    money: 5,
  };

  const toast = useToast();
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const t = useTranslate(["common"]);
  const methods = useForm({ mode: "onChange" });
  const { authData, setAuthData } = useAuthStore((state) => state);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [extraMinicourses, setExtraMinicourses] = useState<number>(0);
  const [lastCount, setLastCount] = useState<number>(0);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState<boolean>(false);
  const [activitiesSelected, setActivitiesSelected] = useState<string[]>([]);
  const [lastActivitySelected, setLastActivitySelected] = useState<string>();
  const [isOpenAlertDialogConfirm, setIsOpenAlertDialogConfirm] = useState<boolean>(false);
  const [isOpenFinishedSubscribeDialog, setIsOpenFinishedSubscribeDialog] =
    useState<boolean>(false);

  const canCleanSelection = true;
  const classActivityArray = [45, 46, 47, 48];

  useDocumentTitle(t("menu:events"));

  const { isOpenfinishedSubscribeModal, setIsOpenfinishedSubscribeModal } =
    useFinishedSubscribeModalStore((state) => state);

  const { setEventUserSelected } = useEventStore();
  const { user } = useUserStore();

  const eventActivitiesQuery = useMutation({
    mutationKey: ["event-activities"],
    mutationFn: () =>
      axios.getFn<{ [date: string]: { [type: string]: EventActivity[] } }>(`3/activities`),
  });

  const eventQuery = useMutation({
    mutationKey: ["event"],
    mutationFn: () => axios.getFn<Events>(`user/${user?.id}/events`),
  });

  const postEventRegisterQuery = useMutation({
    mutationKey: ["post-event-register"],
    mutationFn: (formdata: FormData) =>
      axios.postFn<string>(`user/${authData?.user}/select-activities`, formdata, false),
  });

  const handleChangeClassActivity = (array: Number[], id?: number) => {
    if (array.includes(Number(id))) {
      array.forEach((value) => {
        if (value !== Number(id)) {
          const input = document.querySelector<HTMLInputElement>(`input[value="${value}"]`);
          const wrapper = document.querySelector<HTMLInputElement>(
            `input[value="${value}"] + .check-wrapper`,
          );

          if (input && wrapper) {
            wrapper.style.opacity = "0.5";
            wrapper.style.pointerEvents = "none";
            input.setAttribute("disabled", "true");
          }
        }
      });
    } else if (!activitiesSelected.some((item) => array.includes(Number(item)))) {
      array.forEach((value) => {
        const input = document.querySelector<HTMLInputElement>(`input[value="${value}"]`);
        const wrapper = document.querySelector<HTMLInputElement>(
          `input[value="${value}"] + .check-wrapper`,
        );

        if (input && wrapper) {
          wrapper.style.opacity = "1";
          input.removeAttribute("disabled");
          wrapper.style.pointerEvents = "auto";
        }
      });
    }
  };

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

        // TODO: Remover gambiarra
        handleChangeClassActivity(classActivityArray, Number(firstCheckbox.id));
      }
    }

    const selectedCheckboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:checked',
    );

    const selectedValues = Array.from(selectedCheckboxes).map((checkbox) => checkbox.value);

    setActivitiesSelected(selectedValues);
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
      price: totalPrice.toString(),
      activities,
    };

    const formdata = transformObjectInFormData(form);

    postEventRegisterQuery.mutate(formdata);

    setIsOpenAlertDialog(false);
  };

  const handleOnConfirmFinisheDialog = () => {
    setIsOpenfinishedSubscribeModal(false);
    navigate(ROUTES.HOME);
  };

  useEffect(() => {
    if (eventActivitiesQuery.isError) error.dispatch(eventActivitiesQuery.error as AxiosError);
  }, [eventActivitiesQuery.isError]);

  useEffect(() => {
    if (postEventRegisterQuery.isError) error.dispatch(postEventRegisterQuery.error as AxiosError);
    if (postEventRegisterQuery.isSuccess) {
      if (postEventRegisterQuery.data) {
        setIsOpenfinishedSubscribeModal(true);
        setAuthData({ ...authData, selectedActivities: true });
      }
    }
  }, [postEventRegisterQuery.isSuccess, postEventRegisterQuery.isError]);

  useEffect(() => {
    if (eventActivitiesQuery?.data) {
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

      const minicourseLimit = 1;
      const count = filteredList.length;
      const totalExtraMinicourse = count > minicourseLimit ? count - minicourseLimit : 0;
      const hasIncrementation = count > lastCount;

      if (totalExtraMinicourse && hasIncrementation) {
        setIsOpenAlertDialogConfirm(true);
      }

      setLastCount(count);
      setExtraMinicourses(totalExtraMinicourse);
      handleChangeClassActivity(classActivityArray);
    }
  }, [activitiesSelected]);

  useEffect(() => {
    eventQuery.mutate();
    eventActivitiesQuery.mutate();
  }, []);

  useEffect(() => {
    if (!eventQuery.isError && eventQuery.data) {
      const event = eventQuery.data.userEvents[0];
      setEventUserSelected(event);
    }
  }, [eventQuery.data]);

  useEffect(() => {
    const minicourseAdditionalValue = values.pix * extraMinicourses;
    const total = minicourseAdditionalValue;

    setTotalPrice(total);
  }, [extraMinicourses]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>Minicursos</Heading>
        </HeaderPanel>

        <BodyPanel>
          {eventActivitiesQuery.isPending ? (
            <Spinner />
          ) : authData.selectedActivities ? (
            <>
              <Alert status="info" mb={5}>
                <AlertIcon />

                <Text>
                  Você já selecionou as atividades para esta edição da SETC. As atividades
                  selecionadas podem ser visualizadas na página principal, em sua agenda.
                </Text>
              </Alert>
            </>
          ) : (
            <>
              <Text fontSize="2xl" fontWeight="semibold" textAlign="center">
                Abaixo constam as atividades do evento que você poderá participar
              </Text>

              <Text my={6} textAlign="justify">
                Algumas atividades possuem horários conflitantes, o que significa que não será
                possível selecionar e participar de ambas ao mesmo tempo. Além disso, algumas
                atividades já foram pré-selecionadas quando você se inscreveu, como palestras e mesa
                redonda.
              </Text>

              <Alert status="info" mb={5}>
                <AlertIcon />

                <Text>
                  {`Você pode se inscrever em 1 minicurso. Se desejar participar de mais minicursos, 
                  será cobrada uma taxa adicional de ${transformValueInCurrencyBRLFormat(values.pix)} 
                  no Pix ou ${transformValueInCurrencyBRLFormat(values.money)} em dinheiro por cada 
                  minicurso extra.`}
                </Text>
              </Alert>

              <Grid width="100%" gridTemplateColumns="repeat(12, 1fr)" gridGap={4}>
                <GridItem colSpan={[12, 12, 12, 12, 9]}>
                  <Flex alignItems="center" flexDirection="column" justifyContent="center">
                    {eventActivitiesQuery.data && (
                      <Row
                        methods={methods}
                        data={eventActivitiesQuery.data}
                        isLoading={eventActivitiesQuery.isPending}
                        handleActivityChange={handleActivityChange}
                      />
                    )}
                  </Flex>
                </GridItem>

                <GridItem colSpan={[12, 12, 12, 12, 3]}>
                  <Flex
                    position="sticky"
                    top="20px"
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
                        <Text fontWeight="medium">{t("common:value")}:</Text>
                        <Text>{transformValueInCurrencyBRLFormat("0,00")}</Text>
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
                              {transformValueInCurrencyBRLFormat(values.pix * extraMinicourses)}
                            </Text>
                          </Flex>
                        </Flex>
                      )}

                      <hr />

                      <Flex justifyContent="space-between">
                        <Text fontWeight="medium">{t("common:total-value")}:</Text>
                        <Text>{`${transformValueInCurrencyBRLFormat(totalPrice)}`}</Text>
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
            </>
          )}

          {isOpenAlertDialog && (
            <CustomAlertDialog
              isOpen={isOpenAlertDialog}
              title={t("common:confirm-activities")}
              bodyText={t("common:confirm-activities-text")}
              alertText="Confirme sua escolha com cuidado, pois não será possível trocar os minicursos depois."
              confirmText="Confirmar"
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
        </BodyPanel>
      </Flex>

      <UpdateProfileModal />
      <FinishedSubscribeModal
        isOpen={isOpenfinishedSubscribeModal}
        onClose={handleOnConfirmFinisheDialog}
        valueMoney={(totalPrice - extraMinicourses).toString()}
        valuePix={totalPrice.toString()}
      />
    </MenuPanel>
  );
};

export default MinicourseSelectorPage;
