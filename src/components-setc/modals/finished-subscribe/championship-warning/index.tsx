import { Text, Flex, Alert, AlertIcon } from "@chakra-ui/react";
import { useTranslate } from "@/core/hooks/use-translate";
import { FaCheckCircle, FaLaptopCode, FaTrophy } from "react-icons/fa";
import { BsPatchCheck } from "react-icons/bs";

export const ChampionshipWarningModal: React.FC = () => {
  const t = useTranslate(["common"]);

  return (
    <Flex gridGap={7} alignItems="center" flexDirection="column" justifyContent="space-around">
      <Flex mb={2} gridGap={10}>
        <FaTrophy fontSize="64px" color="#FFD700" />
        <FaLaptopCode fontSize="64px" color="var(--colors-blue-500)" />
      </Flex>

      <Text textAlign="justify">
        Se você deseja participar do <strong>campeonato de jogos</strong> ou da nossa{" "}
        <strong>maratona</strong>, você precisa ir no <strong>menu lateral</strong> e acessar a tela{" "}
        <strong>"Jogos/Maratonas"</strong> para cadastrar o seu time. Lembrando que apenas o capitão
        deve registrar a equipe. Confira alguns detalhes importantes:
      </Text>

      <Flex flexDirection="column" gridGap={2}>
        <Flex alignItems="center" gridGap={5}>
          <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          <Text>Todos os membros devem estar cadastrados no evento</Text>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          <Text>Apenas o capitão do time irá cadastrar a equipe</Text>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          <Text>Será necessário ter o SETC-ID de cada membro</Text>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          <Text>Será necessário um nome para a equipe</Text>
        </Flex>
      </Flex>

      <Text textAlign="justify">
        Conte com o nosso apoio e estamos ansiosos para recebê-lo(a) no evento! Não perca essa
        oportunidade e venha mostrar todo o seu talento!
      </Text>

      <Alert status="info">
        <AlertIcon />
        As inscrições para os o campeonato de jogos e maratonas serão cobradas separadamente, e todo
        o valor arrecadado se converterá em prêmios distribuídos entre as principais equipes
        vencedoras.
      </Alert>
    </Flex>
  );
};
