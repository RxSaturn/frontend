import { Spinner } from "@/components/loaders/spinner";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/enum/routes";
import { transformObjectInFormData } from "@/core/helpers";

interface UsersResponse {
  id: number;
  name: string;
  email: string;
}

export const SendCertificatePage: React.FC = () => {
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const t = useTranslate(["common", "menu"]);

  useDocumentTitle(t("menu:send-certificate"));

  const usersCertificateGet = useQuery({
    queryKey: ["users-certificate"],
    queryFn: () => axios.getFn<UsersResponse[]>(`certificate/users`),
  });

  const sendQuery = useMutation({
    mutationKey: ["send-certificate-list"],
    mutationFn: (params: { userId: number; formdata: FormData }) =>
      axios.postFn<boolean>(`certificate/user/${params.userId}/send`, params.formdata),
  });

  const handleAccess = (id: number) => {
    navigate(`${ROUTES.SEND_CERTIFICATE_USER}/${id}`);
  };

  const handleSend = (userId: number, name: string, email: string) => {
    const data = {
      name: name,
      email: email,
    };

    const formdata = transformObjectInFormData(data);

    sendQuery.mutate({ userId, formdata });
  };

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:send-certificate")}</Heading>
        </HeaderPanel>

        <BodyPanel gridGap={3}>
          {usersCertificateGet.isLoading ? (
            <Flex alignItems="center" justifyContent="center" height="inherit" mt={6}>
              <Spinner />
            </Flex>
          ) : (
            usersCertificateGet.data &&
            usersCertificateGet.data.map((item, index) => {
              return (
                <Flex
                  key={index}
                  justifyContent="space-between"
                  gridGap={4}
                  _hover={{ backgroundColor: "#f2f2f2" }}
                >
                  <Flex gridGap={3}>
                    <Text>
                      {item.id} - {item.name} ({item.email})
                    </Text>
                  </Flex>

                  <Flex gridGap={3}>
                    <Button
                      size="sm"
                      variant="solid"
                      colorScheme="blue"
                      isLoading={sendQuery.isPending}
                      onClick={() => handleSend(item.id, item.name, item.email)}
                    >
                      Enviar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="blue"
                      onClick={() => handleAccess(item.id)}
                    >
                      Acessar
                    </Button>
                  </Flex>
                </Flex>
              );
            })
          )}
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
