import { useTranslate } from "@/core/hooks/use-translate";
import { Flex, Text } from "@chakra-ui/react";
import { GiMicrophone } from "react-icons/gi";
import { Container } from "./styles";
import { EventActivity } from "@/core/types/activity";
import { getLanguage } from "@/core/providers/i18n/language";
import { transformDateInLocalDate } from "@/core/helpers";
import { FaUsers } from "react-icons/fa";
import { MdTableBar } from "react-icons/md";
import { ActivityType } from "@/core/enum/activities-type";

interface ActivityBoxProps {
  isLoading: boolean;
  activity: EventActivity;
  methods: any;
  handleActivityChange: () => void;
}

export const ActivityBox: React.FC<ActivityBoxProps> = ({
  isLoading,
  activity,
  methods,
  handleActivityChange,
}) => {
  const t = useTranslate(["common"]);

  const getIconByActivityType = (activityType: string) => {
    switch (activityType) {
      case "minicourse":
        return <FaUsers color="#5EBA7D" fontSize="32px" />;
      case "talk":
        return <GiMicrophone color="#7106DC" fontSize="32px" />;
      case "roundTable":
        return <MdTableBar color="#FF7A00" fontSize="32px" />;
      default:
        return <FaUsers color="#5EBA7D" fontSize="32px" />;
    }
  };

  const language = getLanguage();
  const date = transformDateInLocalDate(activity.date, false);
  const time = activity.time;
  const weekday = new Date(activity.date).toLocaleDateString(language, {
    weekday: "long",
  });
  const activityIcon = getIconByActivityType(activity.type);

  const isDisabled = Number(activity.places_available) === 0 || isLoading;

  return (
    <Container htmlFor={activity.id} title={isDisabled ? "Acabaram as vagas" : ""}>
      <input
        type="checkbox"
        id={activity?.id}
        value={activity?.id}
        style={{ display: "none" }}
        onClick={handleActivityChange}
        defaultChecked={!activity?.group && activity.places_available !== "0"}
        disabled={isDisabled || !activity?.group}
        className={activity.type === ActivityType.Minicourse ? "clear" : ""}
        {...methods?.register(activity?.group || activity?.id)}
      />

      <Flex
        padding={4}
        minHeight="230px"
        borderRadius="15px"
        alignItems="center"
        background="gray.200"
        flexDirection="column"
        justifyContent="center"
        className="check-wrapper"
        opacity={isDisabled ? 0.5 : 1}
        width={{ base: "100%", md: "350px" }}
        pointerEvents={isDisabled ? "none" : "auto"}
        _hover={{ cursor: isDisabled ? "default" : "pointer" }}
      >
        <Flex className="check" position="absolute" background="white" />

        <Flex
          width="48px"
          height="48px"
          marginBottom={2}
          borderRadius="50%"
          alignItems="center"
          background="gray.100"
          justifyContent="center"
        >
          {activityIcon}
        </Flex>

        <Text
          noOfLines={1}
          fontSize="sm"
          color="gray.800"
          fontWeight="semibold"
          title={activity.title}
        >
          {t(`common:${activity.type}`)}: {activity.title}
        </Text>

        <Text fontSize="sm" color="gray.800">
          {date} ({weekday})
        </Text>

        <Text fontSize="sm" color="gray.800">
          {time}
        </Text>

        <Text fontSize="sm" color="gray.800">
          {t(`common:places-available`)}:{" "}
          {Number(activity.places_available) < 0
            ? t(`common:unlimited`)
            : activity.places_available}
        </Text>

        <Text fontSize="sm" color="#1664ff" fontWeight="bold" textAlign="center" mt={2}>
          {t(`common:recommendation`)}: {activity.target_audience}
        </Text>
      </Flex>
    </Container>
  );
};
