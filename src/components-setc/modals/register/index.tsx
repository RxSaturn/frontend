import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import { ROUTES } from "@/core/enum/routes";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { ModalSteps } from "@/components/modal-steps";
import { useTranslate } from "@/core/hooks/use-translate";
import { transformObjectInFormData } from "@/core/helpers";
import { RegisterSubmit } from "@/core/types/submit/register";

import { CheckStep } from "./check";
import { ConfirmStep } from "./confirm";
import { TShirtWarning } from "./tshirt-warning";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  methods: any;
};

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, methods }) => {
  const { error: er } = useError();
  const { axios } = useAxios();
  const navigate = useNavigate();
  const t = useTranslate(["common"]);

  const [step, setStep] = useState<number>(1);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [tshirtIsChecked, setTshirtIsChecked] = useState<boolean>(false);

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ["post-register"],
    mutationFn: (formdata: FormData) => axios.postFn<string>("register", formdata, false),
  });

  const handleBackStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const renderByStep = (step: number) => {
    switch (step) {
      case 1:
        return <CheckStep methods={methods} isChecked={isChecked} setIsChecked={setIsChecked} />;
      case 2:
        return (
          <TShirtWarning
            methods={methods}
            tshirtIsChecked={tshirtIsChecked}
            setTshirtIsChecked={setTshirtIsChecked}
          />
        );
      case 3:
        return <ConfirmStep />;
      default:
        return <CheckStep methods={methods} isChecked={isChecked} setIsChecked={setIsChecked} />;
    }
  };

  const handleCloseModal = () => {
    onClose();
    navigate(ROUTES.LOGIN);
  };

  const onSubmit = (data: RegisterSubmit) => {
    data.cpf = data.cpf.replaceAll(".", "").replace("-", "");

    const formdata = transformObjectInFormData(data);

    mutate(formdata);
  };

  useEffect(() => {
    if (isError) er.dispatch(error as AxiosError, methods);

    if (isSuccess) {
      methods.reset({
        affiliationIfmg: { label: undefined, value: undefined },
        tshirtSize: { label: undefined, value: undefined },
        pwd: { label: undefined, value: undefined },
        pwdType: { label: undefined, value: undefined },
      });

      handleNextStep();
    }
  }, [isError, isSuccess]);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader />

        <ModalCloseButton isDisabled={isPending} />

        <ModalBody
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="space-around"
        >
          {renderByStep(step)}
        </ModalBody>

        <ModalFooter gridGap={3} justifyContent="space-between">
          <ModalSteps currentStep={step} totalSteps={3} />

          {step === 1 && (
            <Flex gridGap={3}>
              <Button variant="outline" isDisabled={isPending} onClick={onClose} colorScheme="blue">
                {t("common:cancel")}
              </Button>

              <Button
                colorScheme="blue"
                isLoading={isPending}
                onClick={() => handleNextStep()}
                isDisabled={!isChecked || isPending}
              >
                {t("common:next")}
              </Button>
            </Flex>
          )}

          {step === 2 && (
            <Flex gridGap={3}>
              <Button
                variant="outline"
                colorScheme="blue"
                isDisabled={isPending}
                onClick={handleBackStep}
              >
                {t("common:back")}
              </Button>

              <Button
                colorScheme="blue"
                isLoading={isPending}
                onClick={methods.handleSubmit(onSubmit)}
                isDisabled={!tshirtIsChecked || isPending}
              >
                {t("common:register")}
              </Button>
            </Flex>
          )}

          {step === 3 && (
            <Button onClick={handleCloseModal} colorScheme="blue">
              {t("common:close")}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
