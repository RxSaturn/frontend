import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MutateOptions, useMutation } from "@tanstack/react-query";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { Input } from "@/components/inputs/input";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useToast } from "@/core/hooks/use-toast";
import { useTranslate } from "@/core/hooks/use-translate";
import { transformObjectInFormData } from "@/core/helpers";
import { AddPlaceSubmit } from "@/core/types/submit/add-place-activity";

type AddPlaceActivityModalProps = {
  activityId: string;
};

export const AddPlaceActivityModal = ({ activityId }: AddPlaceActivityModalProps) => {
  const toast = useToast();
  const { axios } = useAxios();
  const navigate = useNavigate();
  const { error: er } = useError();
  const t = useTranslate(["common"]);
  const methods = useForm<AddPlaceSubmit>({ mode: "onChange" });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationKey: ["add-place-activity"],
    mutationFn: (formdata: FormData) =>
      axios.postFn<string>(`activity/${activityId}/add-place`, formdata),
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit = (data: AddPlaceSubmit) => {
    const formdata = transformObjectInFormData(data);
    mutate(formdata);
  };

  useEffect(() => {
    if (isError) er.dispatch(error as AxiosError, methods);

    if (isSuccess) {
      setIsOpen(false);
      toast.show("success", "Vagas adicionadas com sucesso!", { title: "Adição de vagas" });
      navigate(0);
    }
  }, [isError, isSuccess]);

  return (
    <>
      <Button
        variant="outline"
        colorScheme="blue"
        isLoading={isPending}
        isDisabled={isPending}
        onClick={() => setIsOpen(true)}
      >
        Adicionar vagas
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} size="md">
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Adicionar vaga</ModalHeader>

          <ModalCloseButton isDisabled={isPending} />

          <ModalBody>
            <Alert status="warning" mb={4}>
              <AlertIcon />
              Certifique-se de que ao aumentar o número de vagas, haverá espaço suficiente para
              acomodar todos os participantes.
            </Alert>

            <Input
              name="amount"
              type="number"
              methods={methods}
              isRequired={true}
              rules={{ required: t("validation:required") }}
              label="Digite o número de vagas que deseja adicionar"
            />
          </ModalBody>

          <ModalFooter gridGap={3}>
            <Button variant="outline" onClick={() => handleClose()} colorScheme="blue">
              {t("common:cancel")}
            </Button>

            <Button
              colorScheme="blue"
              isLoading={isPending}
              isDisabled={isPending}
              onClick={methods.handleSubmit(onSubmit)}
            >
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
