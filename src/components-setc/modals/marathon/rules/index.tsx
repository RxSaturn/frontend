import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import { BsPatchCheck } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";

interface RulesStepProps {
  terms: boolean;
  setTerms: (value: boolean) => void;
}

export const RulesStep: React.FC<RulesStepProps> = ({ terms, setTerms }) => {
  return (
    <>
      <FaLaptopCode color="var(--colors-blue-500)" fontSize="64px" />

      <Flex flexDirection="column" gridGap={2} mt={5}>
        <Text my={4} textAlign="center" fontWeight="semibold">
          Antes de seguir, gostaríamos de explicar algumas regras!
        </Text>

        <Flex alignItems="center" gridGap={5}>
          <Box width="20px" height="20px">
            <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          </Box>

          <Text>
            Leia o
            <Link
              target="_blank"
              to="https://setc.com.br/assets/docs/marathon-edict-technical.pdf"
              style={{ color: "var(--colors-blue-500)" }}
            >
              &nbsp;edital (Técnico),
            </Link>
            <Link
              target="_blank"
              to="https://setc.com.br/assets/docs/marathon-edict-bachelor.pdf"
              style={{ color: "var(--colors-blue-500)" }}
            >
              &nbsp;edital (Superior)&nbsp;
            </Link>
            para entender as normas da maratona
          </Text>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <Box width="20px" height="20px">
            <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          </Box>
          <Text>A equipe deve ser composta por 3 membros</Text>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <Box width="20px" height="20px">
            <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          </Box>
          <Text>Se o número mínimo de membros para formar uma equipe não for alcançado, a organização completará o time com participantes que se encontram na mesma situação, se necessário.</Text>
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
          <Text>
            O valor da inscrição da equipe é de <strong>R$ 18,00 (dezoito reais)</strong> no pix ou <strong>R$ 15,00 (quinze reais)</strong> em dinheiro.
          </Text>
        </Flex>

        <Flex alignItems="center" gridGap={5}>
          <Box width="20px" height="20px">
            <BsPatchCheck fontSize="20px" color="var(--colors-blue-500)" />
          </Box>
          <Text>
            Para equipes do ensino superior, a inscrição será gratuita.
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
