import { EventTicket } from "@/core/types/eventTicket";
import { ROUTES } from "@/core/enum/routes";
import { transformValueInCurrencyBRLFormat } from "@/core/helpers";
import { useTranslate } from "@/core/hooks/use-translate";
import { useEventStore } from "@/core/stores/event";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BsPatchCheck } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import { useNavigate } from "react-router-dom";

interface TicketCardProps {
  ticket: EventTicket;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const navigate = useNavigate();
  const t = useTranslate(["common"]);

  const { setTicketUserSelected } = useEventStore((state) => state);

  const handleSelectTicket = () => {
    setTicketUserSelected(ticket);
    navigate(ROUTES.EVENT_ACTIVITIES);
  };

  const description = ticket.description.split("|");

  return (
    <Flex
      height="500px"
      width="300px"
      alignItems="center"
      flexDirection="column"
      transition="transform .2s"
      boxShadow="0 0 6px #ffbf00"
      justifyContent="space-between"
      _hover={{ transform: "scale(1.05)", boxShadow: "0 0 8px #ffbf00" }}
    >
      <Flex
        width="100%"
        height="200px"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        border="4px solid #ffbf00"
        background="radial-gradient(circle at center, #f7dc6f 0%, #f1c40f 100%)"
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
          <FaCrown fontSize="72px" color="#ffbf00" opacity={0.4} />
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
          {ticket.name} <ImFire />
        </Flex>
      </Flex>

      <Text fontWeight="medium" fontSize="2xl" color="#ffbf00">
        {ticket.price === "0"
          ? t("common:free")
          : `${transformValueInCurrencyBRLFormat(ticket.price)}`}
      </Text>

      <Flex flexDirection="column" padding={4} alignItems="flex-start" gridGap={1}>
        {description.map((text, index) => {
          return (
            <Flex key={index} gridGap={3} alignItems="center" justifyContent="center">
              <BsPatchCheck fontSize="18px" color="#ffbf00" /> <Text fontSize="xs">{text}</Text>
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
          background="#ffbf00"
          onClick={() => handleSelectTicket()}
          _hover={{ background: "#ffbf00", color: "white" }}
        >
          {t("common:select")}
        </Button>
      </Box>
    </Flex>
  );
};
