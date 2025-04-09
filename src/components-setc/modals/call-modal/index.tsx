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
    ListIcon,
    ListItem,
    Heading,
    Link,
} from '@chakra-ui/react'
import { GoStop } from 'react-icons/go';
import { MdCheckCircle, MdSettings } from 'react-icons/md';
import { FcClock } from 'react-icons/fc';
import { AiFillClockCircle, AiOutlineClockCircle  } from 'react-icons/ai';
import { FiCheckCircle } from 'react-icons/fi';
import { FiClock } from 'react-icons/fi';
interface CallModal {
    isOpen: boolean;
    onClose: () => void;
}

export const CallModal: React.FC<CallModal> = ({ isOpen, onClose }) => {

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Inscrição para submissão e apresentação de trabalhos</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex mb={4} justifyContent="center">
                        <GoStop color="#FFD700" fontSize="64px" />
                    </Flex>
                    <Text textAlign="justify">Prezado(a) participante, está aberta as inscrições para submissão de trabalhos para apresentação de TCCs e projetos que acontecerá no evento da SETC na quinta-feira(29/06/2023)!</Text>
                    <Text>Leia o <Link href="https://setc.com.br/assets/docs/2023-STCEC-RegulamentoSimplificado-Retificação.pdf" target="_blank" style={{ color: "var(--colors-blue-500)" }}>edital</Link> (última atualização: <strong>23/06/2023</strong>) para entender melhor o regulamento</Text>
                    <List mt={3} mb={3} spacing={3}>
                        <Text fontWeight="bold">Serão três modalidades:</Text>
                        <ListItem>
                            <Heading size="sm">TCCs concluídos:</Heading>
                            <Text textAlign="justify">Serão selecionados 2 (dois) trabalhos nesta modalidade e cada apresentação terá duração mínima de 15 e máxima de 20 minutos, seguida por até 5 minutos de perguntas pelo público;</Text>
                        </ListItem>
                        <ListItem>
                            <Heading size="sm">Propostas de TCC aprovadas em 2023:</Heading>
                            <Text textAlign="justify">Serão selecionados 3 (três) trabalhos nesta modalidade e cada apresentação terá duração mínima de 10 e máxima de 15 minutos, seguida por até 5 minutos de perguntas pelo público;</Text>
                        </ListItem>
                        <ListItem>
                            <Heading size="sm">Projetos de Pesquisa, Inovação, Extensão e/ou Ensino concluídos:</Heading>
                            <Text textAlign="justify">Serão selecionados 3 (três) trabalhos nesta modalidade e cada apresentação terá duração mínima de 10 e máxima de 15 minutos, seguida por até 5 minutos de perguntas pelo público.</Text>
                        </ListItem>
                    </List>
                    <Text textAlign="justify">A apresentação de TCCs e projetos é uma oportunidade única para compartilhar seu conhecimento e contribuir para o avanço da ciência e do conhecimento em sua área de estudo. É um momento emocionante em que você pode expor suas descobertas, os resultados de suas pesquisas e suas conclusões, deixando sua marca no mundo acadêmico.</Text>
                    <br />
                    <Text>Caso tenha interesse e queira submeter o seu trabalho, acesse o <Link href="https://forms.gle/gPz1vBqgEcgH3raaA" target="_blank" style={{ color: "var(--colors-blue-500)" }}>Formulário de Inscrição</Link></Text>
                </ModalBody>

                <ModalFooter>
                    <Button variant="solid" colorScheme='blue' onClick={onClose}>OK</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}