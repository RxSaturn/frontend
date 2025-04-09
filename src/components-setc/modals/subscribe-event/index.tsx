import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Flex,
} from "@chakra-ui/react";

import { Event } from "@/core/types/events";
import { useAxios } from "@/core/hooks/use-axios";
import { useToast } from "@/core/hooks/use-toast";
import { useError } from "@/core/hooks/use-error";
import { useAuthStore } from "@/core/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { ModalSteps } from "@/components/modal-steps";
import { useTranslate } from "@/core/hooks/use-translate";

import { SubscribeModal } from "./subscribe";
import { PendingPaymentModal } from "./pending-payment";

type SubscribeEventModalProps = {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
};

export const SubscribeEventModal = ({ event, isOpen, onClose }: SubscribeEventModalProps) => {
  const t = useTranslate(["common"]);
  const toast = useToast();
  const { axios } = useAxios();
  const { error: er } = useError();
  const { authData } = useAuthStore((state) => state);

  const eventId = event?.id;
  const userId = authData?.user;

  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const { isPending, isError, error, isSuccess, mutate } = useMutation({
    mutationKey: ["subscribe-event"],
    mutationFn: () => axios.postFn<boolean>(`event/${eventId}/user/${userId}/subscribe`),
  });

  const handleEventSubscribe = () => {
    mutate();
  };

  const renderByStep = (step: number) => {
    switch (step) {
      case 1:
        return <SubscribeModal />;
      case 2:
        return <PendingPaymentModal />;
      default:
        return <SubscribeModal />;
    }
  };

  useEffect(() => {
    if (isError) er.dispatch(error as AxiosError);

    if (isSuccess) {
      handleNextStep();
      toast.show("success", "Sua inscrição no evento foi realizada com sucesso.", {
        title: "Inscrição realizada com sucesso!",
      });
    }
  }, [isError, isSuccess]);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Inscrição</ModalHeader>

        <ModalBody
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="space-around"
        >
          {renderByStep(step)}
        </ModalBody>

        <ModalFooter gridGap={3} justifyContent="space-between">
          <ModalSteps currentStep={step} totalSteps={2} />

          {step === 1 && (
            <Flex gridGap={3}>
              <Button
                variant="outline"
                colorScheme="blue"
                isDisabled={isPending}
                onClick={() => onClose()}
              >
                {t("common:cancel")}
              </Button>

              <Button
                colorScheme="blue"
                isLoading={isPending}
                isDisabled={isPending}
                onClick={() => handleEventSubscribe()}
              >
                {t("common:subscribe")}
              </Button>
            </Flex>
          )}

          {step > 1 && (
            <Button colorScheme="blue" onClick={onClose}>
              {t("common:close")}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
