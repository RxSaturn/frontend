import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";

import MenuPanel from "@/layouts/system";
import { ROUTES } from "@/core/enum/routes";
import { Input } from "@/components/inputs/input";
import { useToast } from "@/core/hooks/use-toast";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { Activities } from "@/core/types/activity";
import BodyPanel from "@/layouts/system/body-panel";
import { useMutation } from "@tanstack/react-query";
import { Permissions } from "@/core/enum/permissions";
import { Spinner } from "@/components/loaders/spinner";
import HeaderPanel from "@/layouts/system/header-panel";
import { Textarea } from "@/components/inputs/textarea";
import { useTranslate } from "@/core/hooks/use-translate";
import { transformObjectInFormData } from "@/core/helpers";
import { usePermission } from "@/core/hooks/use-permission";
import { ActivityTypeInput } from "@/components-setc/inputs";
import { BackButton } from "@/components/buttons/back-button";
import { CustomDatePicker } from "@/components/inputs/datepicker";
import { ActivitiesSubmit } from "@/core/types/submit/activities";
import { EventsInput } from "@/components-setc/inputs/select-events";
import { AudienceSelectInput } from "@/components-setc/inputs/audience";
import { SelectWorkload } from "@/components-setc/inputs/select-workload";
import { ActivitiesInput } from "@/components-setc/inputs/activities-input";
import { AddPlaceActivityModal } from "@/components-setc/modals/add-place-activity";
import { GiConsoleController } from "react-icons/gi";

export const EditActivityPage: React.FC = () => {
  const toast = useToast();
  const { id } = useParams();
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const t = useTranslate(["common", "validation"]);
  const methods = useForm<ActivitiesSubmit>({ mode: "onChange" });

  const event = methods.watch("event");
  const isInvalid = !methods.formState.isDirty || !methods.formState.isValid;

  const [initialValues, setInitialValues] = useState<Activities>();

  const { permission } = usePermission();

  const getActivityQuery = useMutation({
    mutationKey: ["get-activity"],
    mutationFn: () => axios.getFn<any>(`activity/${id}`),
  });

  const updateActivityQuery = useMutation({
    mutationKey: ["update-activity"],
    mutationFn: (formdata: FormData) => axios.postFn<void>(`activity/${id}`, formdata),
  });

  const onSubmit = (data: ActivitiesSubmit) => {
    if (permission.canEdit("activities")) {
      const formdata = transformObjectInFormData(data);
      updateActivityQuery.mutate(formdata);
    }
  };

  useEffect(() => {
    if (getActivityQuery.isError) error.dispatch(updateActivityQuery.error as AxiosError, methods);

    if (getActivityQuery.isSuccess) {
      setInitialValues(getActivityQuery.data);
    }
  }, [getActivityQuery.isError, getActivityQuery.isSuccess]);

  useEffect(() => {
    if (updateActivityQuery.isError)
      error.dispatch(updateActivityQuery.error as AxiosError, methods);

    if (updateActivityQuery.isSuccess) {
      toast.show("success", t("common:activity-updated-successfully"), {
        title: t("common:activity-created"),
      });

      methods.reset();
      navigate(ROUTES.ACTIVITIES);
    }
  }, [updateActivityQuery.isError, updateActivityQuery.isSuccess]);

  useEffect(() => {
    if (id && permission.canEdit(Permissions.Activities)) {
      getActivityQuery.mutate();
    }
  }, [id]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("common:edit-activity")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex justifyContent="end" gridGap={2}>
            <BackButton route={ROUTES.ACTIVITIES} />

            {id && <AddPlaceActivityModal activityId={id} />}

            <Button
              colorScheme="blue"
              onClick={methods.handleSubmit(onSubmit)}
              isLoading={updateActivityQuery.isPending}
              isDisabled={isInvalid || updateActivityQuery.isPending}
            >
              {t("common:save")}
            </Button>
          </Flex>

          {initialValues && !getActivityQuery.isPending ? (
            <Grid templateColumns="repeat(12, 1fr)" gap={5} mt={3}>
              <GridItem colSpan={[12, 12, 6, 4]}>
                <EventsInput name="event" methods={methods} defaultValue={initialValues.eventId} />
              </GridItem>

              <GridItem colSpan={[12, 12, 6, 4]}>
                <Input
                  name="title"
                  methods={methods}
                  isRequired={true}
                  label={t("common:title")}
                  defaultValue={initialValues.title}
                  rules={{ required: t("validation:required") }}
                />
              </GridItem>

              <GridItem colSpan={[12, 12, 6, 4]}>
                <Input
                  name="instructor"
                  methods={methods}
                  isRequired={true}
                  label={t("common:instructor-name")}
                  defaultValue={initialValues.instructor}
                  rules={{ required: t("validation:required") }}
                />
              </GridItem>

              <GridItem colSpan={[12, 12, 6, 6, 3]}>
                <ActivityTypeInput methods={methods} defaultValue={initialValues.type} />
              </GridItem>

              <GridItem colSpan={[12, 12, 6, 6, 4]}>
                <CustomDatePicker
                  showTime
                  name="date"
                  showTimeSelect
                  methods={methods}
                  label={t("common:date")}
                  defaultValue={new Date(initialValues?.date)}
                  rules={{ required: t("validation:required") }}
                />
              </GridItem>

              <GridItem colSpan={[12, 12, 6, 6, 2]}>
                <Input
                  type="number"
                  methods={methods}
                  isRequired={true}
                  isReadOnly={true}
                  isDisabled={true}
                  name="totalPlaces"
                  label={t("common:places-total")}
                  defaultValue={initialValues.places_total}
                  rules={{ required: t("validation:required") }}
                />
              </GridItem>

              <GridItem colSpan={[12, 12, 6, 6, 3]}>
                <SelectWorkload methods={methods} defaultValue={initialValues.duration} />
              </GridItem>

              <GridItem colSpan={[12, 12, 4]}>
                <Input
                  name="local"
                  methods={methods}
                  isRequired={true}
                  label={t("common:activity-local")}
                  defaultValue={initialValues.local}
                  rules={{ required: t("validation:required") }}
                />
              </GridItem>

              <GridItem colSpan={[12, 12, 4]}>
                <AudienceSelectInput methods={methods} defaultValue={initialValues.audience} />
              </GridItem>

              <GridItem colSpan={[12, 12, 4]}>
                <ActivitiesInput
                  methods={methods}
                  eventId={event?.value}
                  name="activity-relation"
                  defaultValue={initialValues.relation}
                  label={t("common:relation-another-activity")}
                  hintText={t("common:relation-another-activity-hint")}
                />
              </GridItem>

              <GridItem colSpan={[12]}>
                <Textarea
                  methods={methods}
                  isRequired={true}
                  minHeight="250px"
                  name="description"
                  label={t("common:description")}
                  defaultValue={initialValues.description}
                  rules={{ required: t("validation:required") }}
                />
              </GridItem>
            </Grid>
          ) : (
            <Flex alignItems="center" justifyContent="center" height="inherit">
              <Spinner />
            </Flex>
          )}
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
