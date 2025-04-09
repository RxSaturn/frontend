import { useEffect } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";

import MenuPanel from "@/layouts/system";
import { Input } from "@/components/inputs/input";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import BodyPanel from "@/layouts/system/body-panel";
import { CPFInput } from "@/components-setc/inputs";
import HeaderPanel from "@/layouts/system/header-panel";
import { useTranslate } from "@/core/hooks/use-translate";
import { transformObjectInFormData } from "@/core/helpers";
import { usePermission } from "@/core/hooks/use-permission";
import { CustomDatePicker } from "@/components/inputs/datepicker";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { EventsInput } from "@/components-setc/inputs/select-events";
import { ActivitiesInput } from "@/components-setc/inputs/activities-input";
import { SelectCertificateInput } from "@/components-setc/inputs/select-certificate-type";

export const SingleCertificateGeneratorPage: React.FC = () => {
  const { axios } = useAxios();
  const { error: er } = useError();
  const { permission } = usePermission();
  const t = useTranslate(["common", "menu"]);
  const methods = useForm({ mode: "onChange" });

  const event = methods.watch("event");

  useDocumentTitle(t("menu:certificate-single"));

  const { data, isSuccess, isError, error, isPending, mutate } = useMutation({
    mutationKey: ["post-generator-single-certificate"],
    mutationFn: (formdata: FormData) =>
      axios.postFn<{ pdfBase64: string }>(`single/certificate`, formdata),
  });

  const handleOnBlurCPF = () => {
    console.log("teste");
  };

  const onSubmit = (data: any) => {
    if (permission.canCreate("certificate_generator")) {
      const formdata = transformObjectInFormData(data);
      mutate(formdata);
    }
  };

  useEffect(() => {
    if (isError) er.dispatch(error as AxiosError, methods);

    if (isSuccess && data.pdfBase64) {
      const byteCharacters = atob(data.pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);

      window.open(blobUrl);
    }
  }, [isSuccess, isError]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:certificate-single")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Grid templateColumns="repeat(12, 1fr)" gap={5} mb={4}>
            <GridItem colSpan={4}>
              <EventsInput
                name="event"
                methods={methods}
                label={t("common:event")}
                rules={{ required: t("validation:required") }}
              />
            </GridItem>

            <GridItem colSpan={4}>
              <CPFInput methods={methods} onBlur={handleOnBlurCPF} rules={{ required: false }} />
            </GridItem>

            <GridItem colSpan={4}>
              <Input
                name="name"
                methods={methods}
                label={t("common:name")}
                rules={{ required: t("validation:required") }}
              />
            </GridItem>

            <GridItem colSpan={3}>
              <Input
                mask="time"
                name="hour"
                maxLength={5}
                methods={methods}
                label={t("common:workload")}
                rules={{
                  required: t("validation:required"),
                  validate: (value) =>
                    value.length === 5 || "Formato inválido. Formato esperado 99:99",
                }}
              />
            </GridItem>

            <GridItem colSpan={3}>
              <SelectCertificateInput
                name="type"
                methods={methods}
                label={t("common:type")}
                rules={{
                  required: t("validation:required"),
                }}
              />
            </GridItem>

            <GridItem colSpan={3}>
              <ActivitiesInput
                name="activity"
                methods={methods}
                eventId={event?.value}
                label={t("common:activity")}
              />
            </GridItem>

            <GridItem colSpan={3}>
              <CustomDatePicker
                methods={methods}
                name="activityDate"
                label={t("common:activity-date")}
              />
            </GridItem>

            <GridItem colSpan={3}>
              <CustomDatePicker
                name="startDate"
                methods={methods}
                label={t("common:event-start-date")}
                rules={{ required: t("validation:required") }}
              />
            </GridItem>

            <GridItem colSpan={3}>
              <CustomDatePicker
                name="endDate"
                methods={methods}
                label={t("common:event-end-date")}
                rules={{ required: t("validation:required") }}
              />
            </GridItem>
          </Grid>

          <Flex justifyContent="flex-end" width="100%">
            <Button
              isLoading={isPending}
              colorScheme="blue"
              onClick={methods.handleSubmit(onSubmit)}
            >
              Gerar certificado
            </Button>
          </Flex>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
