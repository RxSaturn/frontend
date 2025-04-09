import {
  Flex,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";


export const SubscribeModal = () => {
  return (
    <Flex>
      <Stack spacing={4}>
        <Text textAlign="justify">
          As palestras, minicursos e demais atividades estarão disponíves para a escolha na próxima semana. Você receberá um
          e-mail de aviso para selecionar as atividades das quais tem interesse. Este ano funcionará da seguinte forma. Na próxima semana,
          você poderá escolher as palestras, minicursos e demais atividades de seu interesse. Um e-mail de notificação será enviado para
          informá-lo(a) sobre o início da seleção das atividades. Este ano, o processo funcionará da seguinte maneira:
        </Text>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={MdCheckCircle} color='green.500' />
            <strong>Minicursos</strong>: Cada participante terá direito a um minicurso.
            Caso deseje participar de mais de um, será cobrado um valor adicional de <strong>R$ 5,00</strong> em dinheiro ou <strong>R$ 6,00</strong> via PIX por inscrição.
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color='green.500' />
            <strong>Palestras</strong>: Os participantes terão acesso a todas as palestras do evento.
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color='green.500' />
            <strong>Maratona de Programação</strong>: Nesta edição, a maratona terá duas modalidades: ensino técnico e superior. 
            A inscrição da equipe custará <strong>R$ 15,00</strong> em dinheiro ou <strong>R$ 18,00</strong> via Pix.
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color='green.500' />
            <strong>Campeonato de Jogos</strong>: Nesta edição, o campeonato de jogos será com o jogo Valorant. 
            A inscrição da equipe custará <strong>R$ 40,00</strong> em dinheiro ou <strong>R$ 50,00</strong> via Pix.
          </ListItem>
        </List>
      </Stack>
    </Flex>
  );
};