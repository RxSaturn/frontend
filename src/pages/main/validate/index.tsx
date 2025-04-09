import { ValidateCertificateModal } from "@/components-setc/modals/validate-certificate";
import { Input } from "@/components/inputs/input";
import { transformObjectInFormData } from "@/core/helpers";
import { useAxios } from "@/core/hooks/use-axios";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { useError } from "@/core/hooks/use-error";
import { useToast } from "@/core/hooks/use-toast";
import { useTranslate } from "@/core/hooks/use-translate";
import Template from "@/layouts/main";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ValidateSubmit {
  code: string;
}

const Validate: React.FC = () => {
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common", "validation"]);
  const methods = useForm<ValidateSubmit>({ mode: "onChange" });

  useDocumentTitle(t("common:validate-certificate"));

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const validatePost = useMutation({
    mutationKey: ["validate-post"],
    mutationFn: (formdata: FormData) => axios.postFn<any>("certificate/validate", formdata, false),
  });

  const onSubmit = (data: ValidateSubmit) => {
    const formdata = transformObjectInFormData(data);

    validatePost.mutate(formdata);
  };

  useEffect(() => {
    if (validatePost.isSuccess) {
      setModalIsOpen(true);
    }

    if (validatePost.isError) {
      setModalIsOpen(true);
      error.dispatch(validatePost.error as AxiosError, methods);
    }
  }, [validatePost.isSuccess, validatePost.isError]);

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
        <Flex flexDirection="column" gridGap={4}>
          <Text mt={3} fontSize="4xl" textAlign="center" color="#1664FF">
            {t("common:validate-certificate")}
          </Text>

          <Text mt={3} fontSize="lg" textAlign="center">
            {t("common:validate-certificate-text")}
          </Text>

          <Input
            name="code"
            type="text"
            maxLength={6}
            methods={methods}
            rules={{ required: t("validation:required") }}
          />

          <Flex alignItems="center" justifyContent="center">
            <Button
              colorScheme="blue"
              onClick={methods.handleSubmit(onSubmit)}
              isLoading={validatePost.isPending}
              isDisabled={validatePost.isPending}
            >
              {t("common:validate")}
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {validatePost.data && (
        <ValidateCertificateModal
          data={validatePost.data}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      )}
    </Template>
  );
};

export default Validate;
