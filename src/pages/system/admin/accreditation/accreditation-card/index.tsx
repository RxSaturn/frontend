import {
  Flex,
  Card,
  CardBody,
  Stack,
  Tooltip,
  Heading,
  CardFooter,
  ButtonGroup,
  Button,
  Badge,
} from "@chakra-ui/react";
import { t } from "i18next";
import { Text } from "@chakra-ui/react";
import { EventAccreditation } from "@/core/types/events";
import { BsFillPeopleFill } from "react-icons/bs";

export type EventStatus = "onhold" | "finished" | "inprogress";

export interface AccreditationCardProps {
  event: EventAccreditation;
  status: EventStatus;
  onClick: (data: EventAccreditation) => void;
}

export const AccreditationCard: React.FC<AccreditationCardProps> = ({ event, status, onClick }) => {
  const setBadge = () => {
    if (status == "finished")
      return (
        <Badge colorScheme="red" textAlign="center">
          Finalizado
        </Badge>
      );

    if (status == "inprogress")
      return (
        <Badge colorScheme="green" textAlign="center">
          Em andamento
        </Badge>
      );

    return (
      <Badge colorScheme="blue" textAlign="center">
        Não iniciado
      </Badge>
    );
  };

  return (
    <Flex>
      <Card maxW="sm" minW="sm">
        <CardBody>
          {setBadge()}

          <Stack mt="6" spacing="3">
            <Tooltip label={event.title} hasArrow placement="top-end" aria-label="A tooltip">
              <Heading size="md" noOfLines={1} cursor="help">
                {event.title}
              </Heading>
            </Tooltip>

            <Text fontSize="sm" color="gray.600" fontWeight="bold">
              {event.edition}° Edição
            </Text>

            <Text fontSize="sm" color="gray.600" fontWeight="bold">
              Ano: {event.year}
            </Text>

            <Flex color="gray.800" fontSize="xl" alignItems="center">
              <BsFillPeopleFill />
              <Text ml="2">
                {event?.accreditedParticipants}/{event?.participants}
              </Text>
            </Flex>

            <Flex justifyContent="end">
              <Button
                variant="solid"
                maxWidth="300px"
                colorScheme="blue"
                onClick={() => onClick(event)}
              >
                {t("common:btn-accreditation-control")}
              </Button>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
};
