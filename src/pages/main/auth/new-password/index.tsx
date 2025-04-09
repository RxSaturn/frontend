import { PassswordInput } from "@/components-setc/inputs";
import LinkButton from "@/components/buttons/link-button";
import { Spinner } from "@/components/loaders/spinner";
import { NewPasswordSubmit } from "@/core/types/submit/new-password";
import { ROUTES } from "@/core/enum/routes";
import { transformObjectInFormData } from "@/core/helpers";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useToast } from "@/core/hooks/use-toast";
import { useTranslate } from "@/core/hooks/use-translate";
import Template from "@/layouts/main";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const NewPasssword: React.FC = () => {
  const toast = useToast();
  let { token } = useParams();
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const t = useTranslate(["common", "validation"]);
  const methods = useForm<NewPasswordSubmit>({ mode: "onChange" });

  const isInvalid = !methods.formState.isDirty || !methods.formState.isValid;

  const [time, setTime] = useState<number>(3);
  const [text, setText] = useState<string>("");
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const postUpdatePasswordQuery = useMutation({
    mutationKey: ["post-update-password"],
    mutationFn: (formdata: FormData) => axios.postFn<string>("update-password", formdata, false),
  });

  const newPasswordQuery = useMutation({
    mutationKey: ["get-new-password"],
    mutationFn: (token: string) => axios.getFn<string>(`new-password/${token}`, undefined, false),
  });

  const onSubmit = (data: NewPasswordSubmit) => {
    const formdata = transformObjectInFormData(data);
    formdata.append("tk", token || "");

    postUpdatePasswordQuery.mutate(formdata);
  };

  useEffect(() => {
    if (token) {
      newPasswordQuery.mutate(token);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isChanged && time > 0) {
        setTime((prev) => prev - 1);
      } else if (isChanged && time === 0) {
        navigate(ROUTES.LOGIN);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isChanged, time]);

  useEffect(() => {
    if (postUpdatePasswordQuery.isError)
      error.dispatch(postUpdatePasswordQuery.error as AxiosError, methods);

    if (postUpdatePasswordQuery.isSuccess) {
      toast.show("success", postUpdatePasswordQuery.data);
      setIsChanged(true);
    }
  }, [postUpdatePasswordQuery.isError, postUpdatePasswordQuery.isSuccess]);

  useEffect(() => {
    if (newPasswordQuery.isError) error.dispatch(newPasswordQuery.error as AxiosError, methods);

    if (newPasswordQuery.isSuccess) {
      setText(newPasswordQuery?.data);
    }
  }, [newPasswordQuery.isError, newPasswordQuery.isSuccess]);

  return (
    <Template
      height="inherit"
      alignItems="center"
      justifyContent="center"
      paddingLeft={[4, 6, 8]}
      paddingRight={[4, 6, 8]}
      title={t("common:new-password")}
    >
      {newPasswordQuery.isPending ? (
        <Spinner />
      ) : text ? (
        <Flex flexDirection="column" gridGap={4} alignItems="center">
          <Text color="gray">{text}</Text>
          <LinkButton to={ROUTES.LOGIN} children={t("common:go-to-login-page")} />
        </Flex>
      ) : (
        <Flex w="100%" maxWidth="1140px" alignItems="center" flexDirection="column">
          <Flex flexDirection="column" gridGap={4} maxWidth="450px" w="100%">
            <Text mt={3} fontSize="5xl" textAlign="center" color="#1664FF">
              {t("common:new-password")}
            </Text>

            <PassswordInput methods={methods} />
          </Flex>

          <Flex justifyContent="center" mt={4}>
            {isChanged && !postUpdatePasswordQuery.isPending ? (
              <Text fontSize="md" color="gray">
                {t("common:you-will-be-redirected-on")} {time}...
              </Text>
            ) : (
              <Button
                colorScheme="blue"
                onClick={methods.handleSubmit(onSubmit)}
                isLoading={postUpdatePasswordQuery.isPending}
                isDisabled={isInvalid || postUpdatePasswordQuery.isPending}
              >
                {t("common:save")}
              </Button>
            )}
          </Flex>
        </Flex>
      )}
    </Template>
  );
};

export default NewPasssword;
