import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useTranslate } from "@/core/hooks/use-translate";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { ModalSteps } from "@/components/modal-steps";
import { PendingPaymentModal } from "./pending-payment";
import { ChampionshipWarningModal } from "./championship-warning";

type FinishedSubscribeModalProps  = {
  isOpen: boolean;
  onClose: () => void;
  valuePix?: string | undefined
  valueMoney?: string
}

export const FinishedSubscribeModal: React.FC<FinishedSubscribeModalProps> = ({
  isOpen,
  onClose,
  valuePix,
  valueMoney="15"
}) => {
  const t = useTranslate(["common"]);

  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const renderByStep = (step: number) => {
    switch (step) {
      case 1:
        return <PendingPaymentModal valueMoney={valueMoney} valuePix={valuePix} />;
      case 2:
        return <ChampionshipWarningModal />;
      default:
        return <></>;
    }
  };

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          {step > 1 ? t("common:championship") : t("common:complete-payment")}
        </ModalHeader>

        {step > 1 && <ModalCloseButton />}

        <ModalBody>{renderByStep(step)}</ModalBody>

        <ModalFooter gridGap={3} justifyContent="space-between">
          <ModalSteps currentStep={step} totalSteps={2} />

          {step <= 1 && (
            <Button gridGap={2} colorScheme="blue" onClick={() => handleNextStep()}>
              {t("common:next")}
              <FaArrowRight color="white" />
            </Button>
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
