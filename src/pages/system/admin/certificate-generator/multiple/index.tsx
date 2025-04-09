import { ROUTES } from "@/core/enum/routes";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface UsersResponse {
  id: number;
  name: string;
}

export const MultipleCertificateGeneratorPage = () => {
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const t = useTranslate(["common", "menu"]);

  const usersCertificateGet = useQuery({
    queryKey: ["users-certificate"],
    queryFn: () => axios.getFn<UsersResponse[]>(`certificate/users`),
  });

  const handleAccess = (id: number, name: string) => {
    navigate(`${ROUTES.CERTIFICATE_USER}/${id}`, { state: { name } });
  };

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:certificate-multiple")}</Heading>
        </HeaderPanel>

        <BodyPanel gridGap={3}>
          {usersCertificateGet.data &&
            usersCertificateGet.data.map((item, index) => {
              return (
                <Flex
                  key={index}
                  alignItems="center"
                  justifyContent="space-between"
                  gridGap={4}
                  _hover={{ backgroundColor: "#f2f2f2" }}
                >
                  <Text>
                    {item.id} - {item.name}
                  </Text>
                  <Button
                    size="sm"
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => handleAccess(item.id, item.name)}
                  >
                    Acessar
                  </Button>
                </Flex>
              );
            })}
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
