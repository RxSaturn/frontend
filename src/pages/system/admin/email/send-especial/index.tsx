import { useAxios } from "@/core/hooks/use-axios";
import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { useNavigate } from "react-router-dom";
import { transformObjectInFormData } from "@/core/helpers";
import { Input } from "@/components/inputs/input";
import { useForm } from "react-hook-form";

interface SendEspecialSubmit {
  name: string;
  email: string;
}

export const SendEspecialPage: React.FC = () => {
  const { axios } = useAxios();
  const navigate = useNavigate();
  const t = useTranslate(["common", "menu"]);
  const methods = useForm<SendEspecialSubmit>({ mode: "onChange" });

  useDocumentTitle(t("menu:send-especial"));

  const sendQuery = useMutation({
    mutationKey: ["send-certificate-list"],
    mutationFn: (formdata: FormData) =>
      axios.postFn<boolean>(`certificate/especial/send`, formdata),
  });

  const onSubmit = (data: SendEspecialSubmit) => {
    const formdata = transformObjectInFormData(data);

    sendQuery.mutate(formdata);
  };

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:send-especial")}</Heading>
        </HeaderPanel>

        <BodyPanel gridGap={3}>
          <Input label={t("common:name")} methods={methods} name="name" />
          <Input label={t("common:email")} methods={methods} name="email" />

          <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            isLoading={sendQuery.isPending}
            onClick={methods.handleSubmit(onSubmit)}
          >
            Enviar
          </Button>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
