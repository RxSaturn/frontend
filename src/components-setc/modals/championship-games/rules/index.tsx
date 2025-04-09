import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import { BsPatchCheck } from "react-icons/bs";
import { FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";

interface RulesStepProps {
  terms: boolean;
  setTerms: (value: boolean) => void;
}

export const RulesStep: React.FC<RulesStepProps> = ({ terms, setTerms }) => {
  return (
    <>
      <FaTrophy color="#FFD700" fontSize="64px" />
      <Flex flexDirection="column" gridGap={2} mt={5}>
        <Text my={4} textAlign="center" fontWeight="semibold">
          Antes de seguir, gostaríamos de explicar algumas regras!!
        </Text>

        <Flex alignItems="center" gridGap={5}>
          <Box width="20px" height="20px">
            <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          </Box>
          <Flex gridGap={1}>
            Leia o
            <Link
              to="https://setc.com.br/assets/docs/game-championship-edict.pdf"
              target="_blank"
              style={{ color: "var(--colors-blue-500)" }}
            >
              edital
            </Link>
            para entender as normas do campeonato
          </Flex>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <Box width="20px" height="20px">
            <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          </Box>
          <Text>Todos os membros devem estar cadastrados no evento</Text>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <Box width="20px" height="20px">
            <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          </Box>
          <Text>Será necessário um nome para a equipe</Text>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <Box width="20px" height="20px">
            <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          </Box>
          <Text>Apenas o capitão do time pode cadastrar os membros</Text>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <Box width="20px" height="20px">
            <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          </Box>
          <Text>Será necessário ter o SETC-ID de cada membro</Text>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <Box width="20px" height="20px">
            <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          </Box>
          <Text>Será necessario ter o RIOT-ID de cada membro</Text>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <Box width="20px" height="20px">
            <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          </Box>
          <Text>No jogo Valorant, é necessário ter a tagline de cada membro</Text>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <Box width="20px" height="20px">
            <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          </Box>
          <Text>
            O registro da equipe será confirmado apenas quando todos os membros tiverem efetuado o
            pagamento
          </Text>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <Box width="20px" height="20px">
            <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          </Box>
          <Text>
            O valor da inscrição da equipe é de <strong>R$ 50,00 (cinquenta reais)</strong> no pix ou <strong>R$ 40,00 (quarenta reais)</strong> em dinheiro.
          </Text>
        </Flex>
      </Flex>

      <Flex mt={6} justifyContent="flex-end" width="100%">
        <Flex alignItems="center" gridGap={3} maxWidth="400px">
          <Checkbox id="check-terms" isChecked={terms} onChange={() => setTerms(!terms)} />{" "}
          <Text as="label" htmlFor="check-terms" cursor="pointer">
            Li e concordo com as regras aqui descritas e com os termos descritos no edital.
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
