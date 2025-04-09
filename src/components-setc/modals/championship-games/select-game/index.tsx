import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import LOLImage from "@/assets/img/games/lol.webp";
import ValorantImage from "@/assets/img/games/valorant.png";
import { useChampionshipListStore } from "@/core/stores/championship-list";

interface SelectGameStepProps {
  step: number;
  setStep: (step: number) => void;
}

export const SelectGameStep: React.FC<SelectGameStepProps> = ({ step, setStep }) => {
  const { championshipList, setChampionshipList } = useChampionshipListStore((state) => state);

  const handleSelectGame = (id: string) => {
    setChampionshipList({ ...championshipList, activityId: id });
    setStep(step + 1);
  };

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%">
      <Heading fontSize="2xl" mb={6}>
        Selecione um jogo
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
          onClick={() => handleSelectGame("43")}
        >
          <Image src={ValorantImage} width="100px" height="100px" alt="Valorant" />
          <Text fontWeight="medium" textAlign="center">
            Valorant
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
