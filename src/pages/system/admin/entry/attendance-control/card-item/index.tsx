import { ButtonGroup, Button } from "@chakra-ui/button";
import { CardBody, CardFooter, Card } from "@chakra-ui/card";
import { Stack, Heading, Divider, Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { BsFillPeopleFill } from "react-icons/bs";
import { useTranslate } from "@/core/hooks/use-translate";
import { Badge, Tooltip } from "@chakra-ui/react";
import { EventActivities } from "@/core/types/activity";
import { getActivityColor } from "@/core/helpers";

export interface CardItemProps {
  data: EventActivities;
  onClick: (data: EventActivities) => void;
}

export const CardItem: React.FC<CardItemProps> = ({ data, onClick }) => {
  const t = useTranslate(["common"]);

  return (
    <Flex maxW="sm" w={{ base: "100%", lg: "sm" }}>
      <Card w="100%" rounded="lg" border="1px solid #EDF2F7" boxShadow="lg">
        <CardBody>
          <Badge colorScheme={getActivityColor(data.type)} textAlign="center">
            {t(`common:${data.type || "event"}`)}
          </Badge>

          <Stack mt="6" spacing="3">
            <Tooltip label={data.title} hasArrow placement="top-end" aria-label="A tooltip">
              <Heading size="md" noOfLines={1} cursor="help" lineHeight="1.4">
                {data.title}
              </Heading>
            </Tooltip>

            <Text color="gray.500" fontWeight="bold" noOfLines={1} minH="24px">
              {data.instructor}
            </Text>

            <Flex color="gray.800" fontSize="xl" alignItems="center">
              <BsFillPeopleFill />
              <Text ml="2">
                {data.participantsPresent}/{data.participants}
              </Text>
            </Flex>
          </Stack>
        </CardBody>

        <Divider />

        <CardFooter justifyContent="flex-end" alignItems="center">
          <ButtonGroup>
            <Button variant="solid" colorScheme="blue" onClick={() => onClick(data)}>
              {t("common:btn-attendance-control")}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Flex>
  );
};
