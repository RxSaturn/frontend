import {  Flex, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

export const ConfirmSingleUserStep: React.FC = () => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <FaCheckCircle color="#25D366" fontSize="48px" />


      <Text textAlign="justify" mt={7}>
        Você se cadastrou com sucesso para a participação da maratona. Como você optou pela inscrição individual, a organização definira a sua
        equipe com outros participantes que também escolheram essa opção.
      </Text>

      <Text textAlign="justify" mt={5}>
        Muito obrigado por participar da nossa maratona de programação! Qualquer dúvida estamos a
        disposição.
      </Text>

      <Text textAlign="center" mt={5} fontWeight="medium">
        Equipe SETC
      </Text>
    </Flex>
  );
};
