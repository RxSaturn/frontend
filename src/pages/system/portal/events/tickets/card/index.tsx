import { EventTicket } from "@/core/types/eventTicket";
import { ROUTES } from "@/core/enum/routes";
import { transformValueInCurrencyBRLFormat } from "@/core/helpers";
import { useTranslate } from "@/core/hooks/use-translate";
import { useEventStore } from "@/core/stores/event";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BsPatchCheck } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type TicketCardProps = {
  ticket: EventTicket;
};

export const TicketCard = ({ ticket }: TicketCardProps) => {
  const navigate = useNavigate();
  const t = useTranslate(["common"]);

  const { setTicketUserSelected } = useEventStore((state) => state);

  const handleSelectTicket = () => {
    setTicketUserSelected(ticket);
    navigate(ROUTES.EVENT_ACTIVITIES);
  };

  const description = ticket.description.split("|");

  const color = "#ffbf00";
  const gradient = "radial-gradient(circle at center, #f7dc6f 0%, #f1c40f 100%)";

  return (
    <Flex
      width="300px"
      height="500px"
      alignItems="center"
      flexDirection="column"
      transition="transform .2s"
      boxShadow={`0 0 6px ${color}`}
      justifyContent="space-between"
      _hover={{ transform: "scale(1.05)", boxShadow: `0 0 8px ${color}` }}
    >
      <Flex
        width="100%"
        height="200px"
        border="4px solid"
        alignItems="center"
        borderColor={color}
        background={gradient}
        flexDirection="column"
        justifyContent="center"
      >
        <Flex
          width="100px"
          height="100px"
          opacity={0.3}
          background="white"
          borderRadius="50%"
          alignItems="center"
          justifyContent="center"
        >
          <FaCrown fontSize="72px" color={color} opacity={0.4} />
        </Flex>

        <Flex
          mt={4}
          gridGap={2}
          color="white"
          fontSize="lg"
          fontWeight="bold"
          alignItems="center"
          justifyContent="center"
        >
          {ticket.name}
        </Flex>
      </Flex>

      <Text fontWeight="medium" fontSize="2xl" color={color}>
        {ticket.price === "0"
          ? t("common:free")
          : `${transformValueInCurrencyBRLFormat(Number(ticket.price))}`}
      </Text>

      <Flex flexDirection="column" padding={4} alignItems="flex-start" gridGap={1}>
        {description.map((text, index) => {
          return (
            <Flex key={index} gridGap={3} alignItems="center" justifyContent="center">
              <BsPatchCheck fontSize="18px" color={color} />
              <Text fontSize="xs">{text}</Text>
            </Flex>
          );
        })}
      </Flex>

      <Box>
        <Flex fontSize="2xs" mb={3} textAlign="center" justifyContent="center">
          * {t("common:limited-places")}
        </Flex>

        <Button
          mb={4}
          color="white"
          background={color}
          onClick={() => handleSelectTicket()}
          _hover={{ background: color, color: "white" }}
        >
          {t("common:select")}
        </Button>
      </Box>
    </Flex>
  );
};
