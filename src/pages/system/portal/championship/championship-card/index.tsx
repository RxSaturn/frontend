import { Championship } from "@/core/types/championship";
import { ActivityTypeCode } from "@/core/enum/activities-type";
import { UserEventStatus } from "@/core/enum/user-event-status";
import { useTranslate } from "@/core/hooks/use-translate";
import { getLanguage } from "@/core/providers/i18n/language";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { FaLaptopCode, FaTrophy } from "react-icons/fa";

interface ChampionshipCardProps {
  championship: Championship;
}

export const ChampionshipCard: React.FC<ChampionshipCardProps> = ({ championship }) => {
  const t = useTranslate(["common"]);

  const transformDateFormat = (startEventDate: string) => {
    const language = getLanguage();

    const startDate = new Date(startEventDate);

    if (!(startDate instanceof Date && !isNaN(startDate.valueOf()))) {
      return "";
    }

    const startDateFormatted = new Intl.DateTimeFormat(language, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(startDate);

    return `${startDateFormatted}`;
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case UserEventStatus.NotRegistered:
        return "purple";
      case UserEventStatus.Registered:
        return "green";
      case UserEventStatus.AwaitingPayment:
        return "yellow";
      case UserEventStatus.Canceled:
        return "red";
      default:
        return "purple";
    }
  };

  const getTextStatusBadge = () => {
    switch(championship.status){
      case "registered":
        return "inscrito";
      case "awaiting-payment":
        return championship.activityName.includes("Superior") ? "em avaliação" : "aguardando pagamento";
    }
  }

  return (
    <>
      <Flex
        padding={5}
        gridGap={7}
        border="1px"
        boxShadow="lg"
        width="350px"
        minHeight="350px"
        borderRadius="20px"
        borderColor="gray.100"
        flexDirection="column"
        justifyContent="space-around"
      >
        <Flex justifyContent="space-between">
          <Flex
            width="50px"
            height="50px"
            borderRadius="50%"
            alignItems="center"
            background="blue.500"
            justifyContent="center"
          >
            {championship.type === ActivityTypeCode.Marathon ? (
              <FaLaptopCode color="white" fontSize="24px" />
            ) : (
              <FaTrophy color="white" />
            )}
          </Flex>

          <Box>
            {championship.type == "6"
              ? (
              <Badge
                px={3}
                py={1}
                fontSize="xs"
                borderRadius="20px"
                colorScheme={getEventStatusColor(championship?.status)}
              >
                {getTextStatusBadge()}
              </Badge>)
              : (
              <Badge
                px={3}
                py={1}
                fontSize="xs"
                borderRadius="20px"
                colorScheme={getEventStatusColor(championship?.status)}
              >
                {championship?.status
                  ? t(`common:${championship?.status}`)
                  : t(`common:not-registered`)}
              </Badge>)
            }
          </Box>
        </Flex>

        <Flex flexDirection="column">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            {championship.activityName}
          </Text>

          <Text color="gray.900" fontWeight="medium">
            {t("common:date")}:{" "}
            <Text as="span" color="gray.500">
              {transformDateFormat(championship.startDate)}
            </Text>
          </Text>

          <Text color="gray.900" fontWeight="medium">
            Capitão:{" "}
            <Text as="span" color="gray.500">
              {championship.captainName}
            </Text>
          </Text>

          <Text color="gray.900" fontWeight="medium">
            Nome do time:{" "}
            <Text as="span" color="gray.500">
              {championship.teamName}
            </Text>
          </Text>

          <Text color="gray.900" fontWeight="medium">
            Quantidade de membros:{" "}
            <Text as="span" color="gray.500">
              {championship.members}
            </Text>
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
