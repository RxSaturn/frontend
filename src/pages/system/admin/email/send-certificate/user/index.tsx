import { Spinner } from "@/components/loaders/spinner";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { transformObjectInFormData } from "@/core/helpers";
import { useState } from "react";

interface CertificateList {
  paths: string;
}

export const SendCertificateUserPage: React.FC = () => {
  const { axios } = useAxios();
  const { id } = useParams();
  const t = useTranslate(["common", "menu"]);

  const certificateList: string[] = [];

  useDocumentTitle(t("menu:send-certificate"));

  const usersCertificateList = useQuery({
    queryKey: ["users-certificate-list"],
    queryFn: () => axios.getFn<any[]>(`certificate/user/${id}/list`),
  });

  const sendQuery = useMutation({
    mutationKey: ["send-certificate-list"],
    mutationFn: (formdata: FormData) => axios.postFn<boolean>(`certificate/user/send`, formdata),
  });

  const handleSend = (path: string[]) => {
    const data = {
      attachment: path,
      name: "Guilherme Maciel da Rocha",
      email: "guimacielr@gmail.com",
    };

    const formdata = transformObjectInFormData(data);

    sendQuery.mutate(formdata);
  };

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:send-certificate")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          {usersCertificateList.data &&
            usersCertificateList.data.map((item, index) => {
              certificateList.push(item);

              return (
                <Flex key={index}>
                  <Text>{item}</Text>
                </Flex>
              );
            })}
          <Button onClick={() => handleSend(certificateList)}>Enviar</Button>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
