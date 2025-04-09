import { EmailInput, SinglePasswordInput } from "@/components-setc/inputs";
import LinkButton from "@/components/buttons/link-button";
import { LoginSubmit } from "@/core/types/submit/login";
import { Auth } from "@/core/types/auth";
import { ROUTES } from "@/core/enum/routes";
import { transformObjectInFormData } from "@/core/helpers";
import { useAuth } from "@/core/hooks/use-auth";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useToast } from "@/core/hooks/use-toast";
import { useTranslate } from "@/core/hooks/use-translate";
import Template from "@/layouts/main";
import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const toast = useToast();
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const t = useTranslate(["common", "validation"]);
  const methods = useForm<LoginSubmit>({ mode: "onChange" });

  const { auth } = useAuth();

  const isValid = !methods.formState.isDirty || !methods.formState.isValid;

  const loginQuery = useMutation({
    mutationKey: ["login"],
    mutationFn: (formdata: FormData) => axios.postFn<Auth>("login", formdata, false),
  });

  const resendEmailQuery = useMutation({
    mutationFn: async (token: string) =>
      await axios.getFn<string>(`resend/${token}`, undefined, false),
  });

  const resendEmail = (token: string) => {
    toast.closeAll();

    resendEmailQuery.mutate(token);
  };

  const renderMessage = (token: string) => {
    return (
      <Text>
        {t("validation:inactive-account-alert")}
        <Button variant="link" onClick={() => resendEmail(token)}>
          {t("common:click-here")}.
        </Button>
      </Text>
    );
  };

  const onSubmit = (data: LoginSubmit) => {
    const formdata = transformObjectInFormData(data);

    loginQuery.mutate(formdata);
  };

  useEffect(() => {
    if (loginQuery.isSuccess) {
      auth.login(loginQuery.data);
      navigate(`/${loginQuery.data?.role?.initialPage}`);
    }

    if (loginQuery.isError) {
      error.dispatch(loginQuery.error as AxiosError, undefined, renderMessage);
    }
  }, [loginQuery.isSuccess, loginQuery.isError]);

  useEffect(() => {
    if (resendEmailQuery.isSuccess) {
      toast.show("success", resendEmailQuery.data);
    }

    if (resendEmailQuery.isError) {
      error.dispatch(resendEmailQuery.error as AxiosError);
    }
  }, [resendEmailQuery.isSuccess, resendEmailQuery.isError]);

  return (
    <Template
      alignItems="center"
      justifyContent="center"
      paddingLeft={[4, 6, 8]}
      paddingRight={[4, 6, 8]}
      title={t("common:login")}
      marginBottom={{ base: 5, md: 0 }}
      height={{ base: "initial", md: "inherit" }}
    >
      <Flex width={{ base: "100%", sm: "375px" }} flexDirection="column">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Flex flexDirection="column" gridGap={4}>
            <Text mt={3} fontSize="5xl" textAlign="center" color="#1664FF">
              {t("common:login")}
            </Text>

            <Grid templateColumns="repeat(12, 1fr)" gap={5}>
              <GridItem colSpan={12}>
                <EmailInput methods={methods} />
              </GridItem>

              <GridItem colSpan={12}>
                <SinglePasswordInput methods={methods} />
              </GridItem>
            </Grid>

            <Flex justifyContent="flex-end">
              <LinkButton to={ROUTES.RECOVERY_PASSWORD} children={t("common:forgot-password")} />
            </Flex>
          </Flex>

          <Flex justifyContent="center" mt={4}>
            <Button
              colorScheme="blue"
              onClick={methods.handleSubmit(onSubmit)}
              isLoading={loginQuery.isPending || resendEmailQuery.isPending}
              isDisabled={isValid || loginQuery.isPending || resendEmailQuery.isPending}
              type="submit"
            >
              {t("common:login")}
            </Button>
          </Flex>
        </form>
      </Flex>

      <Flex justifyContent="center" gridGap={1} mt={4}>
        <Text color="gray.800">{t("common:noAccount")}?</Text>

        <LinkButton to={ROUTES.REGISTER} children={t("common:register-se")} />
      </Flex>
    </Template>
  );
};

export default Login;
