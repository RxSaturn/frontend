import { EmailInput } from "@/components-setc/inputs";
import { RecoveryPassword } from "@/core/types/submit/recovery-password";
import { transformObjectInFormData } from "@/core/helpers";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useToast } from "@/core/hooks/use-toast";
import { useTranslate } from "@/core/hooks/use-translate";
import Template from "@/layouts/main";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const RecoveryPasssword: React.FC = () => {
  const toast = useToast();
  const { error } = useError();
  const { axios } = useAxios();
  const t = useTranslate(["common", "validation"]);
  const methods = useForm<RecoveryPassword>({ mode: "onChange" });

  const isValid = !methods.formState.isDirty || !methods.formState.isValid;

  const postRecoveryQuery = useMutation({
    mutationKey: ["post-recovery"],
    mutationFn: (formdata: FormData) => axios.postFn<string>("recovery", formdata, false),
  });

  const onSubmit = (data: RecoveryPassword) => {
    const formdata = transformObjectInFormData(data);

    postRecoveryQuery.mutate(formdata);
  };

  useEffect(() => {
    if (postRecoveryQuery.isError) error.dispatch(postRecoveryQuery.error as AxiosError, methods);

    if (postRecoveryQuery.isSuccess) {
      toast.show("success", postRecoveryQuery.data);

      methods.reset();
    }
  }, [postRecoveryQuery.isError, postRecoveryQuery.isSuccess]);

  return (
    <Template
      height="inherit"
      alignItems="center"
      justifyContent="center"
      paddingLeft={[4, 6, 8]}
      paddingRight={[4, 6, 8]}
      title={t("common:recover-password")}
    >
      <Flex w="100%" maxWidth="1140px" flexDirection="column">
        <Flex flexDirection="column" gridGap={4} maxWidth="450px" m="auto">
          <Text mt={3} fontSize="5xl" textAlign="center" color="#1664FF">
            {t("common:forgot-your-password")}
          </Text>

          <Text fontSize="xl" textAlign="center" color="gray">
            {t("common:forgot-your-password-description")}
          </Text>

          <EmailInput methods={methods} />
        </Flex>

        <Flex justifyContent="center" mt={4}>
          <Button
            colorScheme="blue"
            isLoading={postRecoveryQuery.isPending}
            onClick={methods.handleSubmit(onSubmit)}
            isDisabled={isValid || postRecoveryQuery.isPending}
          >
            {t("common:send")}
          </Button>
        </Flex>
      </Flex>
    </Template>
  );
};

export default RecoveryPasssword;
