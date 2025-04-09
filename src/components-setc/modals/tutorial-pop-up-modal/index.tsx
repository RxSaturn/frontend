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
  List,
} from '@chakra-ui/react'
import { GoStop } from 'react-icons/go';
import TutorialPopUp from './tutorial-pop-up';
interface TutorialPopUpModal {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialPopUpModal: React.FC<TutorialPopUpModal> = ({ isOpen, onClose }) => {

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Permissão Necessária</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex mb={4} justifyContent="center">
            <GoStop color="#FFD700" fontSize="64px" />
          </Flex>
          <Text textAlign="justify">Prezado(a) participante, Nosso site requer a habilitação de popups para que você possa acessar funcionalidades essenciais. Por favor, verifique as configurações do seu navegador e permita popups.</Text>
          <List mt={3} mb={3} spacing={3}>
            <Text fontWeight="bold">Siga os seguintes passos para habilitar os Pop-ups:</Text>
            <TutorialPopUp />
          </List>
        </ModalBody>

        <ModalFooter>
          <Button variant="solid" colorScheme='blue' onClick={onClose}>OK</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}