import { Input } from "@/components/inputs/input";
import { useChampionshipListStore } from "@/core/stores/championship-list";
import { Alert, AlertIcon, Flex, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export const ChooseNameStep: React.FC = () => {
  const methods = useForm({ mode: "onChange" });
  const { championshipList, setChampionshipList } = useChampionshipListStore((state) => state);

  const handleTeamName = (value: string) => {
    setChampionshipList({ ...championshipList, teamName: value });
  };

  console.log(championshipList);

  return (
    <Flex flexDirection="column" gridGap={5}>
      <Text fontWeight="semibold" fontSize="2xl" mb={3}>
        Digite o nome de sua equipe
      </Text>

      <Input
        name="teamName"
        methods={methods}
        onChange={(value: string) => handleTeamName(value)}
      />

      <Alert>
        <AlertIcon />
        <Text fontSize="12px">
          Nomes de equipes que sejam ofensivos ou pejorativos não serão aprovados.
        </Text>
      </Alert>
    </Flex>
  );
};
