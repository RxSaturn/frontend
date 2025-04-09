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
  Text,
} from "@chakra-ui/react";
import { useTranslate } from "@/core/hooks/use-translate";
import { FaArrowRight } from "react-icons/fa";
import { RulesStep } from "./rules";
import { useEffect, useState } from "react";
import { ModalSteps } from "@/components/modal-steps";
import { AddMembersStep } from "./add-members";
import { useMemberListStore } from "@/core/stores/member-list";
import { ChooseNameStep } from "./choose-name";
import { ConfirmStep } from "./confirm";
import { useChampionshipListStore } from "@/core/stores/championship-list";
import { useUserStore } from "@/core/stores/user";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { AxiosError } from "axios";
import { transformObjectInFormData } from "@/core/helpers";
import { Tooltip } from "@chakra-ui/react";
import { MarathonSteps } from "@/core/enum/marathon";
import { ChooseCourseStep } from "./choose-course";
import { IoIosAlert } from "react-icons/io";
import { ConfirmSingleUserStep } from "./confirm-single-user";
import { Spinner } from "@/components/loaders/spinner";
import { ConfirmButtonSteps } from "@/core/enum/confirm-button-steps";

interface MarathonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MarathonModal: React.FC<MarathonModalProps> = ({ isOpen, onClose }) => {
  const singleParticipantTeamId = import.meta.env.VITE_SETC_TEAM_ID;
  const { error } = useError();
  const { axios } = useAxios();
  const t = useTranslate(["common"]);

  const [stepConfirmSingleUser, setStepConfirmSingleUser] = useState<number>(1);
  const [step, setStep] = useState<number>(1);
  const [terms, setTerms] = useState<boolean>(false);
  const [tooltipText, setTooltipText] = useState<string>();
  const [memberListButtonDisabled, setMemberListButtonDisabled] = useState<boolean>(false);

  const { user } = useUserStore((state) => state);
  const { memberList } = useMemberListStore((state) => state);
  const { championshipList, setChampionshipList } = useChampionshipListStore((state) => state);

  const registerTeamQuery = useMutation({
    mutationKey: ["team"],
    mutationFn: (formdata: FormData) => axios.postFn<{ price: number }>("team", formdata, false),
  });

  const registerSingleParticipant = useMutation({
    mutationKey: ["simple-participant"],
    mutationFn: (userId: string) => axios.postFn<{ price: number }>(`championship/${singleParticipantTeamId}/user/${userId}`),
  });

  const handleNextStep = () => {
    if (step === MarathonSteps.AddMembers && user?.id) {
      setChampionshipList({ ...championshipList, captainId: user.id, users: memberList });
    }

    setStep((prev) => prev + 1);
  };

  const handleRegisterTeam = () => {
    if (championshipList?.users?.length) {
      const formdata = transformObjectInFormData(championshipList);

      registerTeamQuery.mutate(formdata);
    }
  };

  const handleRegisterUser = () => {
    if (user && stepConfirmSingleUser == ConfirmButtonSteps.Confirm) {
      registerSingleParticipant.mutate(user.id);
    }

    switch (stepConfirmSingleUser) {
      case ConfirmButtonSteps.Initial:
        setStepConfirmSingleUser(ConfirmButtonSteps.Confirm);
        break;
      case ConfirmButtonSteps.Confirm:
        setStepConfirmSingleUser(ConfirmButtonSteps.Initial);
        break;
    }

  }

  const renderByStep = (step: number) => {
    switch (step) {
      case MarathonSteps.Rules:
        return <RulesStep terms={terms} setTerms={setTerms} />;
      case MarathonSteps.ChooseCourse:
        return <ChooseCourseStep step={step} setStep={setStep} />;
      case MarathonSteps.AddMembers:
        return <AddMembersStep />;
      case MarathonSteps.ChooseName:
        return <ChooseNameStep />;
      case MarathonSteps.Confirm:
        return <ConfirmStep price={registerTeamQuery.data?.price} />;
      case MarathonSteps.ConfirmSingleUser:
        return <ConfirmSingleUserStep />
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (registerTeamQuery.isError) error.dispatch(registerTeamQuery.error as AxiosError);

    if (registerSingleParticipant.isSuccess) {
      setStep(MarathonSteps.ConfirmSingleUser);
    }

  }, [registerSingleParticipant.isSuccess, registerSingleParticipant.isError]);

  useEffect(() => {
    if (step === MarathonSteps.AddMembers) {
      let text = "";
      const memberListWithoutReserve = memberList.filter((member) => member.isReserve !== true);

      if (memberListWithoutReserve.length < 3) {
        text = "É necessário ter pelo menos 3 membros no time.";
      } else if (memberListWithoutReserve.length > 3) {
        text = "Não é possível ter mais de 3 membros no time.";
      } else {
        text = "";
      }

      setTooltipText(text);
      setMemberListButtonDisabled(!!text);
    }
  }, [memberList, step]);

  useEffect(() => {
    if (registerTeamQuery.isError) error.dispatch(registerTeamQuery.error as AxiosError);

    if (registerTeamQuery.isSuccess) {
      handleNextStep();
    }
  }, [registerTeamQuery.isError, registerTeamQuery.isSuccess]);

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{t("common:game-team-register")}</ModalHeader>

        <ModalCloseButton isDisabled={registerTeamQuery.isPending} />

        <ModalBody
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="space-around"
        >
          {renderByStep(step)}
        </ModalBody>
        {stepConfirmSingleUser == ConfirmButtonSteps.Confirm &&
          <Alert>
            <AlertIcon />
            <Text fontSize="12px">
              Ao confirmar, sua inscrição será efetivada, e você será alocado(a) em uma equipe definida pela organização do evento. Para finalizar, clique novamente no botão "Confirmar Inscrição Individual".
            </Text>
          </Alert>
        }
        <ModalFooter gridGap={3} justifyContent="space-between">
          <ModalSteps currentStep={step} totalSteps={4} />

          {(step == MarathonSteps.AddMembers && championshipList.activityId == "40") &&
            <Button
              variant="outline"
              leftIcon={!registerSingleParticipant.isPending ? <IoIosAlert /> : <Spinner w="24px" h="24px" />}
              colorScheme="blue"
              isDisabled={registerSingleParticipant.isPending}
              onClick={handleRegisterUser}
            >
              {stepConfirmSingleUser == ConfirmButtonSteps.Initial 
                ? "Inscrever-se individualmente"
                : "Confirmar inscrição individual"
              }
            </Button>
          }

          {step < MarathonSteps.ChooseName && (
            <Tooltip label={tooltipText}>
              <Button
                gridGap={2}
                colorScheme="blue"
                onClick={() => handleNextStep()}
                isDisabled={
                  (step === 1 && !terms) ||
                  (step === MarathonSteps.AddMembers && memberListButtonDisabled)
                }
              >
                {t("common:next")}
                <FaArrowRight color="white" />
              </Button>
            </Tooltip>
          )}

          {step === MarathonSteps.ChooseName && (
            <Button
              colorScheme="blue"
              onClick={() => handleRegisterTeam()}
              isLoading={registerTeamQuery.isPending}
              isDisabled={
                !championshipList?.teamName ||
                championshipList?.teamName?.length < 4 ||
                registerTeamQuery.isPending
              }
            >
              {t("common:save")}
            </Button>
          )}

          {step > MarathonSteps.ChooseName && (
            <Button colorScheme="blue" onClick={onClose}>
              {t("common:close")}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
