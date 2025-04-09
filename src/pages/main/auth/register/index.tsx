import {
  AffiliationIFMGInput,
  CPFInput,
  ClassInput,
  CourseInput,
  EmailInput,
  NameInput,
  PassswordInput,
  PhoneInput,
  PwdInput,
} from "@/components-setc/inputs";
import { RegisterModal } from "@/components-setc/modals/register";
import LinkButton from "@/components/buttons/link-button";
import { CustomDatePicker } from "@/components/inputs/datepicker";
import { RegisterSubmit } from "@/core/types/submit/register";
import { ROUTES } from "@/core/enum/routes";
import { transformObjectInFormData } from "@/core/helpers";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import Template from "@/layouts/main";
import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RAInput } from "@/components-setc/inputs/ra-input";

const Register: React.FC = () => {
  const { error } = useError();
  const { axios } = useAxios();
  const t = useTranslate(["common", "validation"]);
  const methods = useForm<RegisterSubmit>({ mode: "onChange" });

  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState<boolean>(false);

  const isValid = !methods.formState.isDirty || !methods.formState.isValid;

  const postRegisterQuery = useMutation({
    mutationKey: ["post-register"],
    mutationFn: (formdata: FormData) => axios.postFn<string>("user-check", formdata, false),
  });

  const onCloseRegisterModal = () => {
    setIsOpenRegisterModal(false);
  };

  const onSubmit = (data: RegisterSubmit) => {
    data.cpf = data.cpf.replaceAll(".", "").replace("-", "");

    const formdata = transformObjectInFormData(data);

    postRegisterQuery.mutate(formdata);
  };

  useEffect(() => {
    if (postRegisterQuery.isError) error.dispatch(postRegisterQuery.error as AxiosError, methods);

    if (postRegisterQuery.isSuccess) {
      setIsOpenRegisterModal(true);
    }
  }, [postRegisterQuery.isError, postRegisterQuery.isSuccess]);

  const affiliation = methods.watch("affiliationIfmg");

  useEffect(() => {
    if (affiliation?.value !== "student") {
      methods.resetField("ra");
      methods.resetField("course");
      methods.resetField("class");
    }
  }, [affiliation]);

  return (
    <Template
      mb={[4, 4, 4, 0]}
      alignItems="center"
      justifyContent="center"
      paddingLeft={[4, 6, 8]}
      paddingRight={[4, 6, 8]}
      title={t("common:register")}
      height={{ base: "initial", md: "inherit" }}
    >
      <Flex w="100%" maxWidth="1140px" flexDirection="column" mb={6}>
        <Flex flexDirection="column" gridGap={4}>
          <Text mt={3} fontSize="5xl" textAlign="center" color="#1664FF">
            {t("common:register-se")}
          </Text>

          <Grid templateColumns="repeat(12, 1fr)" gap={5} mt={6}>
            <GridItem colSpan={[12, 12, 6, 4]}>
              <EmailInput methods={methods} />
            </GridItem>

            <GridItem colSpan={[12, 12, 6, 4]}>
              <NameInput methods={methods} />
            </GridItem>

            <GridItem colSpan={[12, 12, 6, 4]}>
              <CPFInput methods={methods} />
            </GridItem>

            <GridItem colSpan={[12, 12, 6, 4]}>
              <CustomDatePicker
                name="birthdate"
                methods={methods}
                maxDate={new Date()}
                label={t("common:birthdate")}
                rules={{ required: t("validation:required") }}
              />
            </GridItem>

            <GridItem colSpan={[12, 12, 6, 4]}>
              <PhoneInput methods={methods} />
            </GridItem>

            <GridItem colSpan={[12, 12, 6, 4]}>
              <AffiliationIFMGInput methods={methods} />
            </GridItem>

            {affiliation?.value === "student" && (
              <>
                <GridItem colSpan={[12, 12, 4, 4]}>
                  <RAInput methods={methods} />
                </GridItem>

                <GridItem colSpan={[12, 12, 4, 4]}>
                  <CourseInput methods={methods} />
                </GridItem>

                <GridItem colSpan={[12, 12, 4, 4]}>
                  <ClassInput methods={methods} />
                </GridItem>
              </>
            )}

            <PassswordInput methods={methods} />

            <PwdInput methods={methods} />
          </Grid>
        </Flex>
      </Flex>

      <Flex justifyContent="center" mt={6}>
        <Button
          colorScheme="blue"
          isLoading={postRegisterQuery.isPending}
          onClick={methods.handleSubmit(onSubmit)}
          isDisabled={isValid || postRegisterQuery.isPending}
        >
          {t("common:next")}
        </Button>
      </Flex>

      <Flex justifyContent="center" gridGap={1} mt={4}>
        <Text color="gray.800">{t("common:alreadyHaveAnAaccount")}?</Text>

        <LinkButton to={ROUTES.LOGIN} children={t("common:login")} />
      </Flex>

      {isOpenRegisterModal && (
        <RegisterModal
          methods={methods}
          isOpen={isOpenRegisterModal}
          onClose={onCloseRegisterModal}
        />
      )}
    </Template>
  );
};

export default Register;
