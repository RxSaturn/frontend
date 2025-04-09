import LinkButton from "@/components/buttons/link-button";
import { ROUTES } from "@/core/enum/routes";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import Template from "@/layouts/main";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActiveAccount: React.FC = () => {
  let { token } = useParams();
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common", "validation"]);

  const [text, setText] = useState<string>(t("common:we-are-activating-your-account"));

  const activeQuery = useMutation({
    mutationKey: ["active"],
    mutationFn: (token: string) => axios.getFn<string>(`active/${token}`, undefined, false),
  });

  useEffect(() => {
    if (token) {
      activeQuery.mutate(token);
    }
  }, [token]);

  useEffect(() => {
    if (activeQuery.isError) error.dispatch(activeQuery.error as AxiosError);
    if (activeQuery.isSuccess) {
      setText(activeQuery.data);
    }
  }, [activeQuery.isError, activeQuery.isSuccess]);

  return (
    <Template
      height="inherit"
      alignItems="center"
      justifyContent="center"
      paddingLeft={[4, 6, 8]}
      paddingRight={[4, 6, 8]}
      title={t("common:activate-account")}
    >
      {activeQuery.isPending ? (
        <Spinner size="xl" speed="0.65s" thickness="4px" color="blue.500" emptyColor="gray.200" />
      ) : (
        <Flex w="100%" gridGap={4} maxWidth="1140px" alignItems="center" flexDirection="column">
          <Text fontSize="md" color="gray">
            {text}
          </Text>

          <LinkButton to={ROUTES.LOGIN} children={t("common:go-to-login-page")} />
        </Flex>
      )}
    </Template>
  );
};

export default ActiveAccount;
