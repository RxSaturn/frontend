import { Checkbox, Flex, Text } from "@chakra-ui/react";
import { GoStop } from "react-icons/go";

type CheckStepProps = {
  methods: any;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
};

export const CheckStep: React.FC<CheckStepProps> = ({ methods, isChecked, setIsChecked }) => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <GoStop fontSize="48px" />
      <Text fontSize="2xl" textAlign="center" my={3}>
        Conferência de Dados
      </Text>

      <Text textAlign="justify" mb={2}>
        Por favor, verifique cuidadosamente seu <strong>nome</strong>, <strong>CPF</strong> e
        endereço de <strong>e-mail</strong>. O nome e CPF fornecidos serão utilizados na emissão do
        seu certificado, portanto, certifique-se de que está correto. O endereço de e-mail será
        necessário para acessos futuros ao nosso sistema. Garantir que ambos os dados estão corretos
        é essencial para evitar problemas posteriores.
      </Text>

      <Text>{methods?.getValues("cpf")}</Text>
      <Text>{methods?.getValues("name")}</Text>
      <Text>{methods?.getValues("email")}</Text>

      <Flex gridGap={3} alignItems="center" mt={8}>
        <Checkbox
          id="accept-terms"
          isChecked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />

        <Text as="label" textAlign="justify" htmlFor="accept-terms" cursor="pointer">
          Declaro que conferi e aceito que o nome, CPF e o endereço de e-mail fornecidos estão
          corretos para emissão do certificado e para acessos futuros ao sistema.
        </Text>
      </Flex>
    </Flex>
  );
};
