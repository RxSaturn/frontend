import { Input } from "@/components/inputs/input";
import { ActivitiesSubmit } from "@/core/types/submit/activities";
import { Permissions } from "@/core/enum/permissions";
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
import { ROUTES } from "@/core/enum/routes";
import { useError } from "@/core/hooks/use-error";
import { useAxios } from "@/core/hooks/use-axios";
import { useMutation } from "@tanstack/react-query";
import { BackButton } from "@/components/buttons/back-button";

const NewEditPermissionPage: React.FC = () => {
  const toast = useToast();
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();

  const methods = useForm<ActivitiesSubmit>({ mode: "onChange" });
  const t = useTranslate(["common", "validation"]);

  const isInvalid = !methods.formState.isDirty || !methods.formState.isValid;

  const { permission } = usePermission();

  const postPermissionQuery = useMutation({
    mutationKey: ["post-permission"],
    mutationFn: (formdata: FormData) => axios.postFn<string>("permission", formdata),
  });

  const onSubmit = (data: ActivitiesSubmit) => {
    if (permission.canCreate(Permissions.Permission)) {
      const formdata = transformObjectInFormData(data);

      postPermissionQuery.mutate(formdata);
    }
  };

  useEffect(() => {
    if (postPermissionQuery.isError)
      error.dispatch(postPermissionQuery.error as AxiosError, methods);
    if (postPermissionQuery.isSuccess) {
      toast.show("success", t("common:permission-created-successfully"), {
        title: t("common:permission-created"),
      });

      methods.reset();
      navigate(ROUTES.PERMISSIONS);
    }
  }, [postPermissionQuery.isError, postPermissionQuery.isSuccess]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("common:new-permission")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex justifyContent="end" gridGap={2}>
            <BackButton route={ROUTES.PERMISSIONS} />

            <Button
              colorScheme="blue"
              onClick={methods.handleSubmit(onSubmit)}
              isLoading={postPermissionQuery.isPending}
              isDisabled={isInvalid || postPermissionQuery.isPending}
            >
              {t("common:save")}
            </Button>
          </Flex>

          <Grid templateColumns="repeat(12, 1fr)" gap={5}>
            <GridItem colSpan={12}>
              <Input
                name="name"
                methods={methods}
                isRequired={true}
                label={t("common:name")}
                rules={{ required: t("validation:required") }}
              />
            </GridItem>
          </Grid>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};

export default NewEditPermissionPage;
