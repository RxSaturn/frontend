import { ROUTES } from '@/core/enum/routes';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  Stack,
} from '@chakra-ui/react'
import { GoStop } from 'react-icons/go';
import { useNavigate } from "react-router-dom";

type MinicourseAlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

export const MinicourseAlertModal: React.FC<MinicourseAlertModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const handleOnClickButton = () => navigate(ROUTES.SELECT_ACTIVITIES);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Seleção de Minicursos Disponível!</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex mb={4} justifyContent="center">
            <GoStop color="#FFD700" fontSize="64px" />
          </Flex>
          <Stack spacing={4} textAlign="justify">
            <Text>Estamos animados em informar que a seleção para os nossos minicursos já está aberta! Esta é a sua chance de ampliar seus conhecimentos em áreas de interesse específicas, com a orientação de profissionais experientes.</Text>
            <Text>Você poderá escolher os minicursos até o dia <strong>01/09</strong>. Seja qual for a sua escolha, garantimos que será uma oportunidade valiosa para o seu desenvolvimento pessoal e profissional.</Text>
            <Text>Para fazer sua inscrição e garantir sua vaga, clique no botão abaixo. Lembre-se, as vagas são limitadas, então inscreva-se o quanto antes para não perder essa oportunidade!</Text>
            <Text><strong>Não perca essa oportunidade única de aprender algo novo e se destacar ainda mais na sua área!</strong></Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="solid" colorScheme='blue' onClick={handleOnClickButton}>INSCREVER-SE NOS MINICURSOS AGORA</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default MinicourseAlertModal;