import { applyFormat } from "@/core/helpers/format";
import { useTranslate } from "@/core/hooks/use-translate";
import { Activities } from "@/core/types/activity";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Divider,
  Stack,
  Box,
  Flex,
  Badge,
  Heading
} from "@chakra-ui/react";
import { t } from "i18next";
import { FaCalendarAlt, FaUserGraduate } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const OverLay = () => (
  <ModalOverlay
    bg='blackAlpha.300'
    backdropFilter='blur(10px)'
  />
)

type ShowMoreActivityModalProps = {
  isOpen: boolean,
  onClose: () => void,
  activity: Activities
}

const handlerOnBadge = (activityType: number) => {
  switch(activityType){
    case 1:
      return <Badge colorScheme="purple" borderRadius="5px" fontSize='0.8em' p="2px 5px">{t("common:talk")}</Badge>
    case 2:
      return <Badge colorScheme="green" borderRadius="5px" fontSize='0.8em' p="2px 5px">{t("common:minicourse")}</Badge>
    case 3:
      return <Badge colorScheme="yellow" borderRadius="5px" fontSize='0.8em' p="2px 5px">{t("common:championship")}</Badge>
    case 5:
      return <Badge colorScheme="red" borderRadius="5px" fontSize='0.8em' p="2px 5px">{t("common:round-table")}</Badge>
    case 6:
      return <Badge colorScheme="blue" borderRadius="5px" fontSize='0.8em' p="2px 5px">{t("common:marathon")}</Badge>
    default:
      return <></>
  }
}

const ShowMoreActivityModal: React.FC<ShowMoreActivityModalProps> = ({ isOpen, onClose, activity }) => {
  const t = useTranslate(["common"])
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size={{base: "full", md: "lg"}}
      motionPreset='scale'
    >
      {OverLay()}
      <ModalContent>
        <ModalHeader>{t("common:more-informations")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {handlerOnBadge(Number(activity.type))}
          <Stack spacing={4} mt={1}>
            <Flex alignItems="center">
              <Heading size="md">{activity.title}</Heading>
            </Flex >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Flex alignItems="center" gap={1}>
                <FaUserGraduate />
                <Text>{activity.instructor}</Text>
              </Flex>
            </Box>
            <Flex alignItems="center" gap={1}>
              <FaLocationDot />
              <Text>{activity.local}</Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <FaCalendarAlt /> 
              <Text>{applyFormat("date", activity.date)}</Text>
            </Flex>
            <Divider/>
            <Box>
              <Heading size="md">{t("common:about")}</Heading>
              <Text textAlign="justify">
                {activity.description}
              </Text>
            </Box>
            <Divider/>

          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>{t("common:back")}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ShowMoreActivityModal;