import { Flex, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

interface ConfirmStepProps {
  price: number | undefined;
}

export const ConfirmStep: React.FC<ConfirmStepProps> = ({ price }) => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <FaCheckCircle color="#25D366" fontSize="48px" />

      {price === 0 ? (
        <Text textAlign="justify" mt={7}>
          Parabéns, seu time foi o primeiro a ser registrado para está atividade! E como brinde, o
          seu time não precisará pagar o valor da inscrição.
        </Text>
      ) : (
        <Text textAlign="justify" mt={7}>
          Seu cadastro foi efetuado com sucesso! Você receberá um <strong>e-mail</strong> com as
          instruções de <strong>pagamento</strong>. Após feito o pagamento, em até 24h úteis, será
          confirmada a inscrição do time!
        </Text>
      )}

      <Text textAlign="justify" mt={5}>
        Muito obrigado por participarem de nossas atividades! Qualquer dúvida estamos a disposição.
      </Text>

      <Text textAlign="center" mt={5} fontWeight="medium">
        Equipe SETC
      </Text>
    </Flex>
  );
};
