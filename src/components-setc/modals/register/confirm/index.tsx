import { Flex, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

export const ConfirmStep: React.FC = () => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <FaCheckCircle color="#25D366" fontSize="48px" />

      <Text fontSize="3xl" textAlign="center" my={3}>
        Conta registrada com sucesso!
      </Text>

      <Text textAlign="justify">
        Parabéns por dar o primeiro passo em direção ao maior evento de tecnologia da região!
        Enviamos um <strong>e-mail</strong> para você ativar sua conta e ter acesso completo ao
        nosso sistema. Depois de ativar sua conta, faça <strong>login</strong> e escolha o evento no
        qual deseja se <strong>inscrever</strong>. Não perca esta oportunidade!
      </Text>
    </Flex>
  );
};
