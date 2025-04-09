import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import MenuPanel from "@/layouts/system";
import { Badge, Flex, Heading, Switch, Text } from "@chakra-ui/react";
import { useError } from "@/core/hooks/use-error";
import { useAxios } from "@/core/hooks/use-axios";
import BodyPanel from "@/layouts/system/body-panel";
import { EventActivities } from "@/core/types/activity";
import HeaderPanel from "@/layouts/system/header-panel";
import { useTranslate } from "@/core/hooks/use-translate";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { useToast } from "@/core/hooks/use-toast";
import { EventsInput } from "@/components-setc/inputs/select-events";
import { useForm } from "react-hook-form";
import { Spinner } from "@/components/loaders/spinner";
import { AlertDialog } from "@/components-setc/modals/alert-dialog";
import { transformObjectInFormData } from "@/core/helpers";

export const EventSettingsPage = () => {
  const toast = useToast();
  const { axios } = useAxios();
  const { error: er } = useError();
  const methods = useForm({ mode: "onChange" });
  const t = useTranslate(["common", "validation"]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>();

  const event = methods.watch("event");

  useDocumentTitle(t("menu:settings"));

  const query = useMutation({
    mutationKey: ["get-event-status"],
    mutationFn: () => axios.getFn<{ active: boolean }>(`event/${event.value}/status`),
  });

  const { isSuccess, isError, error, mutate } = useMutation({
    mutationKey: ["post-event-settings"],
    mutationFn: (formdata: FormData) =>
      axios.postFn<boolean>(`event/${event.value}/settings`, formdata),
  });

  const handleSwitch = () => {
    setIsOpen(true);
  };

  const handleConfirmButton = () => {
    let formData = new FormData();
    formData.append("status", String(!isChecked));
    mutate(formData);
  };

  const handleCloseButton = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isError) er.dispatch(error as AxiosError);
    if (isSuccess) {
      query.mutate();
      setIsOpen(false);
      setIsChecked(!isChecked);
      toast.show("success", "Status do evento alterado com sucesso.");
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (query.isError) er.dispatch(error as AxiosError);
    if (query.isSuccess) setIsChecked(query.data?.active);
  }, [query.isSuccess, query.isError]);

  useEffect(() => {
    if (event) {
      query.mutate();
    }
  }, [event]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:settings")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex maxW="400px">
            <EventsInput name="event" methods={methods} />
          </Flex>

          {!query.isPending && event?.value && query.data?.hasOwnProperty("active") ? (
            <Flex gridGap={3} mt={4}>
              <Text>Inscrições:</Text>

              {query.data?.active ? (
                <Badge colorScheme="green" display="flex" alignItems="center" rounded="4px">
                  Aberta
                </Badge>
              ) : (
                <Badge colorScheme="red" display="flex" alignItems="center" rounded="4px">
                  Fechada
                </Badge>
              )}

              <Switch size="md" isChecked={isChecked} onChange={() => handleSwitch()} />
            </Flex>
          ) : (
            <Flex alignItems="center" justifyContent="center" height="inherit">
              <Spinner />
            </Flex>
          )}
        </BodyPanel>

        {isOpen && (
          <AlertDialog
            isOpen={isOpen}
            onClose={handleCloseButton}
            title="Configuração de inscrições"
            onConfirm={() => handleConfirmButton()}
            bodyText={`Tem certeza que você quer ${isChecked ? "fechar" : "abrir"} as inscrições?`}
          />
        )}
      </Flex>
    </MenuPanel>
  );
};
