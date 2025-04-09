import { CustomDatePicker } from "@/components/inputs/datepicker";
import { Input } from "@/components/inputs/input";
import { Textarea } from "@/components/inputs/textarea";
import { cleanCurrencyFormat, transformObjectInFormData } from "@/core/helpers";
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
import { ROUTES } from "@/core/enum/routes";
import { OwnerInput } from "@/components-setc/inputs/owner";
import { FinancesSubmit } from "@/core/types/submit/finances";
import { Permissions } from "@/core/enum/permissions";
import { useError } from "@/core/hooks/use-error";
import { useAuthStore } from "@/core/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "@/core/hooks/use-axios";
import { BackButton } from "@/components/buttons/back-button";

const NewFinancePage: React.FC = () => {
  const toast = useToast();
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const { permission } = usePermission();
  const t = useTranslate(["common", "validation"]);
  const methods = useForm<FinancesSubmit>({ mode: "onChange" });

  const isInvalid = !methods.formState.isDirty || !methods.formState.isValid;

  const { authData } = useAuthStore((state) => state);

  const postFinanceQuery = useMutation({
    mutationKey: ["post-finance"],
    mutationFn: (formdata: FormData) => axios.postFn<void>("finance", formdata),
  });

  const onSubmit = (data: FinancesSubmit) => {
    if (permission.canCreate(Permissions.Finance)) {
      data.value = cleanCurrencyFormat(data.value);
      data.createdBy = authData?.user;
      data.updatedBy = authData?.user;

      const formdata = transformObjectInFormData(data);

      postFinanceQuery.mutate(formdata);
    }
  };

  useEffect(() => {
    if (postFinanceQuery.isError) error.dispatch(postFinanceQuery.error as AxiosError, methods);

    if (postFinanceQuery.isSuccess) {
      toast.show("success", t("common:record-created-successfully"), {
        title: t("common:record-created"),
      });

      methods.reset();

      navigate(ROUTES.FINANCES);
    }
  }, [postFinanceQuery.isError, postFinanceQuery.isSuccess]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("common:new-record")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex justifyContent="end" gridGap={2}>
            <BackButton route={ROUTES.FINANCES} />

            <Button
              colorScheme="blue"
              isLoading={postFinanceQuery.isPending}
              onClick={methods.handleSubmit(onSubmit)}
              isDisabled={isInvalid || postFinanceQuery.isPending}
            >
              {t("common:save")}
            </Button>
          </Flex>

          <Grid templateColumns="repeat(12, 1fr)" gap={5}>
            <GridItem colSpan={[12, 12, 6, 6, 4]}>
              <CustomDatePicker
                name="date"
                showTimeSelect
                methods={methods}
                label={t("common:date")}
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
              />
            </GridItem>

            <GridItem colSpan={[12, 12, 12, 12, 6]}>
              <OwnerInput methods={methods} />
            </GridItem>

            <GridItem colSpan={12}>
              <Textarea
                methods={methods}
                isRequired={true}
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

export default NewFinancePage;
