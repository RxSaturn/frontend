import { TShirtSize } from "@/components-setc/inputs";
import { Alert, AlertIcon, Checkbox, Flex, Text } from "@chakra-ui/react";
import { GoStop } from "react-icons/go";

interface TShirtWarningProps {
  methods: any;
  tshirtIsChecked: boolean;
  setTshirtIsChecked: (isChecked: boolean) => void;
}

export const TShirtWarning: React.FC<TShirtWarningProps> = ({
  methods,
  tshirtIsChecked,
  setTshirtIsChecked,
}) => {
  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <GoStop fontSize="48px" />
      <Text fontSize="2xl" textAlign="center" my={3}>
        Como garantir sua camiseta da SETC
      </Text>

      <Text textAlign="justify" mb={2}>
        Para garantir a sua camiseta exclusiva da SETC, selecione o tamanho abaixo e marque a caixa
        de aceite. As camisetas são limitadas, então finalize seu cadastro e garanta já a sua
        inscrição! Por favor, note que a organização não se responsabiliza por escolhas incorretas
        de tamanho.
      </Text>

      <Text textAlign="justify" mb={6}>
        Somente os 150 primeiros inscritos no evento receberão a camiseta. Lembre-se de que as
        inscrições serão confirmadas apenas mediante pagamento.
      </Text>

      <TShirtSize methods={methods} />

      <Alert mt="10px" fontSize="12px">
        <AlertIcon />
        Não garantimos o tamanho da camiseta; por isso, inscreva-se e faça o credenciamento o quanto antes.
      </Alert>

      <Flex gridGap={3} alignItems="center" mt={8}>
        <Checkbox
          id="accept-terms"
          isChecked={tshirtIsChecked}
          onChange={(e) => setTshirtIsChecked(e.target.checked)}
        />

        <Text as="label" textAlign="justify" htmlFor="accept-terms" cursor="pointer">
          Compreendi que a minha camiseta será entregue somente se eu me inscrever entre os 150
          primeiros participantes evento, realizar o pagamento e retirá-la durante o processo de
          credenciamento no evento.
        </Text>
      </Flex>
    </Flex>
  );
};
