import { CustomDatePicker } from "@/components/inputs/datepicker";
import { Input } from "@/components/inputs/input";
import { Textarea } from "@/components/inputs/textarea";
import {
  cleanCurrencyFormat,
  transformObjectInFormData,
  transformValueInCurrencyBRLFormat,
} from "@/core/helpers";
import { useToast } from "@/core/hooks/use-toast";
import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { usePermission } from "@/core/hooks/use-permission";
import { ROUTES } from "@/core/enum/routes";
import { OwnerInput } from "@/components-setc/inputs/owner";
import { FinancesSubmit } from "@/core/types/submit/finances";
import { Finances, FinancesEdit } from "@/core/types/finances";
import { Permissions } from "@/core/enum/permissions";
import { useError } from "@/core/hooks/use-error";
import Audit from "@/components/audit";
import { IAudit } from "@/core/types/audit";
import { useAuthStore } from "@/core/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "@/core/hooks/use-axios";
import { BackButton } from "@/components/buttons/back-button";

const EditFinancePage: React.FC = () => {
  const toast = useToast();
  const { id } = useParams();
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const { permission } = usePermission();
  const t = useTranslate(["common", "validation"]);
  const methods = useForm<FinancesSubmit>({ mode: "onChange" });

  const isInvalid = !methods.formState.isDirty || !methods.formState.isValid;

  const [audit, setAudit] = useState<IAudit[]>([]);
  const [initialValues, setInitialValues] = useState<Finances>();

  const { authData } = useAuthStore((state) => state);

  const getFinanceQuery = useMutation({
    mutationKey: ["get-finance-id"],
    mutationFn: () => axios.getFn<FinancesEdit>(`finance/${id}`),
  });

  const editFinanceQuery = useMutation({
    mutationKey: ["edit-finance"],
    mutationFn: (formdata: FormData) => axios.postFn<void>(`finance/${id}`, formdata),
  });

  const onSubmit = (data: FinancesSubmit) => {
    if (id && permission.canEdit(Permissions.Finance)) {
      data.value = cleanCurrencyFormat(data.value);
      data.createdBy = initialValues?.created_by;
      data.updatedBy = authData?.user;

      const formdata = transformObjectInFormData(data);

      editFinanceQuery.mutate(formdata);
    }
  };

  useEffect(() => {
    if (id && permission.canEdit(Permissions.Finance)) {
      getFinanceQuery.mutate();
    }
  }, [id]);

  useEffect(() => {
    if (editFinanceQuery.isError) error.dispatch(editFinanceQuery.error as AxiosError, methods);

    if (editFinanceQuery.isSuccess) {
      toast.show("success", t("common:record-updated-successfully"), {
        title: t("common:record-updated"),
      });

      navigate(ROUTES.FINANCES);
    }
  }, [editFinanceQuery.isError, editFinanceQuery.isSuccess]);

  useEffect(() => {
    if (getFinanceQuery.isError) error.dispatch(getFinanceQuery.error as AxiosError, methods);

    if (getFinanceQuery.isSuccess) {
      setInitialValues(getFinanceQuery.data?.values);
      setAudit(getFinanceQuery.data?.audit);
    }
  }, [getFinanceQuery.isError, getFinanceQuery.isSuccess]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{`${t("common:editing-record")} ${id}`}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <>
            <Flex justifyContent="end" gridGap={2}>
              <BackButton route={ROUTES.FINANCES} />

              <Button
                colorScheme="blue"
                onClick={methods.handleSubmit(onSubmit)}
                isLoading={getFinanceQuery.isPending || editFinanceQuery.isPending}
                isDisabled={isInvalid || getFinanceQuery.isPending || editFinanceQuery.isPending}
              >
                {t("common:save")}
              </Button>
            </Flex>

            {initialValues ? (
              <Grid templateColumns="repeat(12, 1fr)" gap={5}>
                <GridItem colSpan={[12, 12, 6, 6, 4]}>
                  <CustomDatePicker
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
                    name="value"
                    mask="currency"
                    methods={methods}
                    label={t("common:value")}
                    rules={{ required: t("validation:required") }}
                    defaultValue={transformValueInCurrencyBRLFormat(initialValues?.value)}
                  />
                </GridItem>

                <GridItem colSpan={[12, 12, 12, 12, 6]}>
                  <OwnerInput methods={methods} defaultValue={initialValues.owner} />
                </GridItem>

                <GridItem colSpan={12}>
                  <Textarea
                    methods={methods}
                    isRequired={true}
                    name="description"
                    label={t("common:description")}
                    defaultValue={initialValues?.description}
                    rules={{ required: t("validation:required") }}
                  />
                </GridItem>
              </Grid>
            ) : (
              <></>
            )}

            {audit && id && <Audit audit={audit} entityId={id} />}
          </>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};

export default EditFinancePage;
