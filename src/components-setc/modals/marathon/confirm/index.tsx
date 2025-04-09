import { useChampionshipListStore } from "@/core/stores/championship-list";
import { Alert, AlertIcon, Flex, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

interface ConfirmStepProps {
  price: number | undefined;
}

export const ConfirmStep: React.FC<ConfirmStepProps> = ({ price }) => {
  const { championshipList, setChampionshipList } = useChampionshipListStore((state) => state);

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <FaCheckCircle color="#25D366" fontSize="48px" />

      {price === 0 ? (
        <Text textAlign="justify" mt={7}>
          Parabéns, seu time foi o primeiro a ser registrado para o campeonato! E como brinde, o seu
          time não precisará pagar o valor da inscrição.
        </Text>
      ) : (
        <Text textAlign="justify" mt={7}>
          Seu time foi cadastrado com sucesso! A organização avaliará o nome da equipe 
          e, se estiver dentro dos termos permitidos, você receberá um e-mail com as 
          instruções para a participação na maratona.
        </Text>
      )}

      {championshipList.activityId == "40" ?
        <Text mt={5}>
          A inscrição para a maratona do ensino superior é totalmente gratuita.
        </Text>
        :
        <Text mt={5}>
          Você também receberá um e-mail com as instruções para realizar o pagamento e confirmar a participação da sua equipe na maratona.
        </Text>
      }

      <Text textAlign="justify" mt={5}>
        Muito obrigado por participarem da nossa maratona de programação! Qualquer dúvida estamos a
        disposição.
      </Text>

      <Text textAlign="center" mt={5} fontWeight="medium">
        Equipe SETC
      </Text>
    </Flex>
  );
};
