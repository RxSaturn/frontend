import { ActivityTypeInput } from "@/components-setc/inputs";
import { CustomDatePicker } from "@/components/inputs/datepicker";
import { Input } from "@/components/inputs/input";
import { Textarea } from "@/components/inputs/textarea";
import { ActivitiesSubmit } from "@/core/types/submit/activities";
import { transformObjectInFormData } from "@/core/helpers";
import { useToast } from "@/core/hooks/use-toast";
import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePermission } from "@/core/hooks/use-permission";
import { ActivitiesInput } from "@/components-setc/inputs/activities-input";
import { ROUTES } from "@/core/enum/routes";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useMutation } from "@tanstack/react-query";
import { EventsInput } from "@/components-setc/inputs/select-events";
import { AudienceSelectInput } from "@/components-setc/inputs/audience";
import { BackButton } from "@/components/buttons/back-button";
import { SelectWorkload } from "@/components-setc/inputs/select-workload";

export const NewActivityPage: React.FC = () => {
  const toast = useToast();
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const t = useTranslate(["common", "validation"]);
  const methods = useForm<ActivitiesSubmit>({ mode: "onChange" });

  const event = methods.watch("event");
  const isInvalid = !methods.formState.isDirty || !methods.formState.isValid;

  const { permission } = usePermission();

  const postActivitiesQuery = useMutation({
    mutationKey: ["post-activities"],
    mutationFn: (formdata: FormData) => axios.postFn<void>("activities", formdata),
  });

  const onSubmit = (data: ActivitiesSubmit) => {
    if (permission.canCreate("activities")) {
      const formdata = transformObjectInFormData(data);
      postActivitiesQuery.mutate(formdata);
    }
  };

  useEffect(() => {
    if (postActivitiesQuery.isError)
      error.dispatch(postActivitiesQuery.error as AxiosError, methods);

    if (postActivitiesQuery.isSuccess) {
      toast.show("success", t("common:activity-created-successfully"), {
        title: t("common:activity-created"),
      });

      methods.reset();
      navigate(ROUTES.ACTIVITIES);
    }
  }, [postActivitiesQuery.isError, postActivitiesQuery.isSuccess]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("common:new-activity")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex justifyContent="end" gridGap={2}>
            <BackButton route={ROUTES.ACTIVITIES} />

            <Button
              colorScheme="blue"
              onClick={methods.handleSubmit(onSubmit)}
              isLoading={postActivitiesQuery.isPending}
              isDisabled={isInvalid || postActivitiesQuery.isPending}
            >
              {t("common:save")}
            </Button>
          </Flex>

          <Grid templateColumns="repeat(12, 1fr)" gap={5}>
            <GridItem colSpan={[12, 12, 6, 4]}>
              <EventsInput name="event" methods={methods} />
            </GridItem>

            <GridItem colSpan={[12, 12, 6, 4]}>
              <Input
                name="title"
                methods={methods}
                isRequired={true}
                label={t("common:title")}
                rules={{ required: t("validation:required") }}
              />
            </GridItem>

            <GridItem colSpan={[12, 12, 6, 4]}>
              <Input
                name="instructor"
                methods={methods}
                isRequired={true}
                label={t("common:instructor-name")}
                rules={{ required: t("validation:required") }}
              />
            </GridItem>

            <GridItem colSpan={[12, 12, 6, 6, 3]}>
              <ActivityTypeInput methods={methods} />
            </GridItem>

            <GridItem colSpan={[12, 12, 6, 6, 4]}>
              <CustomDatePicker
                showTime
                name="date"
                showTimeSelect
                methods={methods}
                label={t("common:date")}
                rules={{ required: t("validation:required") }}
              />
            </GridItem>

            <GridItem colSpan={[12, 12, 6, 6, 2]}>
              <Input
                type="number"
                methods={methods}
                isRequired={true}
                name="totalPlaces"
                label={t("common:places-total")}
                rules={{ required: t("validation:required") }}
              />
            </GridItem>

            <GridItem colSpan={[12, 12, 6, 6, 3]}>
              <SelectWorkload methods={methods} />
            </GridItem>

            <GridItem colSpan={[12, 12, 4]}>
              <Input
                name="local"
                methods={methods}
                isRequired={true}
                label={t("common:activity-local")}
                rules={{ required: t("validation:required") }}
              />
            </GridItem>

            <GridItem colSpan={[12, 12, 4]}>
              <AudienceSelectInput methods={methods} />
            </GridItem>

            <GridItem colSpan={[12, 12, 4]}>
              <ActivitiesInput
                methods={methods}
                eventId={event?.value}
                name="activity-relation"
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
                rules={{ required: t("validation:required") }}
              />
            </GridItem>
          </Grid>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
