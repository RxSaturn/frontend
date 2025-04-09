import { Flex, Heading, Text } from "@chakra-ui/react";
import { useChampionshipListStore } from "@/core/stores/championship-list";
import { TbShield, TbShieldFilled } from "react-icons/tb";

interface ChooseCourseStepProps {
  step: number;
  setStep: (step: number) => void;
}

export const ChooseCourseStep: React.FC<ChooseCourseStepProps> = ({ step, setStep }) => {
  const { championshipList, setChampionshipList } = useChampionshipListStore((state) => state);

  const handleSelectGame = (id: string) => {
    setChampionshipList({ ...championshipList, activityId: id });
    setStep(step + 1);
  };

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%">
      <Heading fontSize="2xl" mb={6}>
        Selecione o curso
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
          onClick={() => handleSelectGame("41")}
        >
          <TbShield fontSize="72px" color="var(--colors-blue-500)" />
          <Text fontWeight="medium" textAlign="center">
            Técnico em Informática
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
          onClick={() => handleSelectGame("40")}
        >
          <TbShieldFilled fontSize="72px" color="var(--colors-blue-500)" />
          <Text fontWeight="medium" textAlign="center">
            Engenharia de Computação
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
