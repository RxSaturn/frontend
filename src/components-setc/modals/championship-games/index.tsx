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
import { RulesStep } from "./rules";
import { useEffect, useState } from "react";
import { ModalSteps } from "@/components/modal-steps";
import { SelectGameStep } from "./select-game";
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

interface ChampionshipGamesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChampionshipGamesModal: React.FC<ChampionshipGamesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { error } = useError();
  const { axios } = useAxios();
  const t = useTranslate(["common"]);

  const [step, setStep] = useState<number>(1);
  const [terms, setTerms] = useState<boolean>(false);
  const [tooltipText, setTooltipText] = useState<string>();
  const [memberListButtonDisabled, setMemberListButtonDisabled] = useState<boolean>(false);

  const { user } = useUserStore((state) => state);
  const { memberList } = useMemberListStore((state) => state);
  const { championshipList, setChampionshipList } = useChampionshipListStore((state) => state);

  const registerTeamQuery = useMutation({
    mutationKey: ["team"],
    mutationFn: (formdata: FormData) => axios.postFn<{ price: number }>("team", formdata, false)
  });

  const handleNextStep = () => {
    if (step === 3 && user?.id) {
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

  const renderByStep = (step: number) => {
    switch (step) {
      case 1:
        return <RulesStep terms={terms} setTerms={setTerms} />;
      case 2:
        return <SelectGameStep step={step} setStep={setStep} />;
      case 3:
        return <AddMembersStep />;
      case 4:
        return <ChooseNameStep />;
      case 5:
        return <ConfirmStep price={registerTeamQuery.data?.price} />;
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (step === 3) {
      let text = "";
      const memberListWithoutReserve = memberList.filter((member) => member.isReserve !== true);
      const memberListHasReserve = memberList.filter((member) => member.isReserve === true);
      const memberListWithouRiotId = memberList.filter(
        (member) => member?.riotId?.length < 3 || member?.riotId === "Clique para editar",
      );

      const memberListWithouTagline = memberList.filter(
        (member) => member?.tagline?.length <= 2 || member?.tagline === "#",
      );

      if (memberListWithoutReserve.length < 5) {
        text = "É necessário ter pelo menos 5 membros no time.";
      } else if (memberListWithoutReserve.length > 6) {
        text = "Não é possível ter mais de 6 membros no time.";
      } else if (memberList.length >= 6 && memberListHasReserve.length === 0) {
        text = "É necesário ter membros reserva para essa quantidade.";
      } else if (memberListWithouRiotId.length > 0) {
        text = "Deve preencher o RIOT-ID de todos os membros.";
      } else if (championshipList.activityId === "7" && memberListWithouTagline.length > 0) {
        text = "Deve preencher a tagline de todos os membros.";
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
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size={step === 3 ? "4xl" : "xl"}
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

        <ModalFooter gridGap={3} justifyContent="space-between">
          <ModalSteps currentStep={step} totalSteps={4} />

          {step < 4 && (
            <Tooltip label={tooltipText}>
              <Button
                gridGap={2}
                colorScheme="blue"
                onClick={() => handleNextStep()}
                display={step == 2 ? "none" : "flex"}
                isDisabled={(step === 1 && !terms) || (step === 3 && memberListButtonDisabled)}
              >
                {t("common:next")}
                <FaArrowRight color="white" />
              </Button>
            </Tooltip>
          )}

          {step === 4 && (
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

          {step > 4 && (
            <Button colorScheme="blue" onClick={onClose}>
              {t("common:close")}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
