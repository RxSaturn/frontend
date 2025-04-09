import { useTranslate } from "@/core/hooks/use-translate";
import { Flex, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaJournalWhills, FaLaptopCode, FaTrophy, FaUsers } from "react-icons/fa";
import { MdTableBar } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";
import { Spinner } from "@/components/loaders/spinner";
import { EventInfoActivities } from "@/core/types/user";

type EventItemProps = {
  id: number;
  name: string;
  color: string;
  value: number;
  icon: IconType;
};

type EventInfoCardProps = {
  isLoading: boolean;
  activities?: EventInfoActivities;
};

const EventInfoCard: React.FC<EventInfoCardProps> = ({ isLoading, activities }) => {
  const t = useTranslate(["common"]);

  const eventItems: Array<EventItemProps> = [
    {
      id: 0,
      name: t("common:minicourses"),
      color: "#5EBA7D",
      value: activities?.minicourse || 0,
      icon: FaUsers,
    },
    {
      id: 1,
      name: t("common:talk"),
      color: "#7106DC",
      value: activities?.talk || 0,
      icon: GiMicrophone,
    },

    {
      id: 2,
      name: t("common:round-table"),
      color: "#FF7A00",
      value: activities?.roundTable || 0,
      icon: MdTableBar,
    },
    {
      id: 3,
      name: t("common:championships"),
      color: "#FFD700",
      value: activities?.championship || 0,
      icon: FaTrophy,
    },
    {
      id: 4,
      name: t("common:marathon"),
      color: "var(--colors-blue-500)",
      value: activities?.marathon || 0,
      icon: FaLaptopCode,
    },
    {
      id: 5,
      name: t("common:editions"),
      color: "#EE163A",
      value: activities?.editions || 0,
      icon: FaJournalWhills,
    },
  ];

  return (
    <Flex
      bg="white"
      padding={3}
      boxShadow="lg"
      height="200px"
      borderRadius="10px"
      flexDirection="column"
    >
      {isLoading ? (
        <Flex alignItems="center" justifyContent="center" height="inherit">
          <Spinner />
        </Flex>
      ) : (
        <Grid templateColumns="repeat(12, 1fr)" height="100%" gridGap={6}>
          {eventItems.map((item, index) => {
            return (
              <GridItem key={index} colSpan={4}>
                <Flex alignItems="center" flexDirection="column" justifyContent="center">
                  <Icon as={item.icon} fontSize="24px" color={item.color} />

                  <Text fontSize="lg" fontWeight="bold" lineHeight="18px" mt={1}>
                    {item.value}
                  </Text>

                  <Text fontSize="sm" color="gray.400" textAlign="center">
                    {item.name}
                  </Text>
                </Flex>
              </GridItem>
            );
          })}
        </Grid>
      )}
    </Flex>
  );
};

export default EventInfoCard;
