import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useTranslate } from "@/core/hooks/use-translate";
import { FaLaptopCode, FaTrophy } from "react-icons/fa";
import { ChampionshipType } from "@/core/enum/championship-type";

interface SelectChampionshipMarathonModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpenMarathonModal: (value: boolean) => void;
  setIsOpenChampionGamesModal: (value: boolean) => void;
}

export const SelectChampionshipMarathonModal: React.FC<SelectChampionshipMarathonModalProps> = ({
  isOpen,
  onClose,
  setIsOpenMarathonModal,
  setIsOpenChampionGamesModal,
}) => {
  const t = useTranslate(["common"]);

  const handleSelectModality = (type: ChampionshipType) => {
    switch (type) {
      case ChampionshipType.Game:
        setIsOpenChampionGamesModal(true);
        onClose();
        break;
      case ChampionshipType.Marathon:
        setIsOpenMarathonModal(true);
        onClose();
        break;
      default:
        break;
    }
  };

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
        <ModalCloseButton />

        <ModalBody
          py={8}
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="space-around"
        >
          <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%">
            <Heading fontSize="2xl" mb={6}>
              {t("common:select-modality")}
            </Heading>

            <Flex gridGap={5} justifyContent="space-around" width="100%">
              <Flex
                padding={4}
                gridGap={5}
                border="1px"
                width="186px"
                rounded="20px"
                cursor="pointer"
                alignItems="center"
                borderColor="gray.300"
                flexDirection="column"
                justifyContent="center"
                onClick={() => handleSelectModality(ChampionshipType.Game)}
              >
                <FaTrophy fontSize="72px" color="#FFD700" />

                <Text fontWeight="medium" textAlign="center">
                  {t("common:game-championship")}
                </Text>
              </Flex>

              <Flex
                padding={4}
                gridGap={5}
                border="1px"
                width="186px"
                rounded="20px"
                cursor="pointer"
                alignItems="center"
                borderColor="gray.300"
                flexDirection="column"
                justifyContent="center"
                onClick={() => handleSelectModality(ChampionshipType.Marathon)}
              >
                <FaLaptopCode fontSize="72px" color="var(--colors-blue-500)" />

                <Text fontWeight="medium" textAlign="center">
                  {t("common:marathon")}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
