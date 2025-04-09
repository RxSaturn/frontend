import { ButtonGroup, Button } from "@chakra-ui/button";
import { CardBody, CardFooter, Card } from "@chakra-ui/card";
import { Stack, Heading, Divider, Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { BsFillPeopleFill } from "react-icons/bs";
import { useTranslate } from "@/core/hooks/use-translate";
import { Badge, FormLabel, Switch, Tooltip } from "@chakra-ui/react";
import { getActivityColor } from "@/core/helpers";
import { Event } from "@/core/types/events";

export interface CardItemProps {
  data: Event;
}

export const CardItem: React.FC<CardItemProps> = ({ data }) => {
  const t = useTranslate(["common"]);

  return (
    <Flex maxW="sm" w={{ base: "100%", lg: "sm" }}>
      <Card w="100%" rounded="lg" border="1px solid #EDF2F7" boxShadow="lg">
        <CardBody>
          <Badge colorScheme={getActivityColor(data.finished)} textAlign="center">
            {t(`common:${data.finished}`)}
          </Badge>

          <Stack mt="6" spacing="3">
            <Tooltip label={data.title} hasArrow placement="bottom-start" aria-label="A tooltip">
              <Heading size="md" noOfLines={1} cursor="help" lineHeight="1.4">
                {data.title}
              </Heading>
            </Tooltip>

            <Flex color="gray.800" fontSize="xl" alignItems="center" gridGap={3}>
              <FormLabel htmlFor="isChecked" m={0}>
                {t("common:finished")}:
              </FormLabel>

              <Switch id="isChecked" />
            </Flex>

            <Flex color="gray.800" fontSize="xl" alignItems="center" gridGap={3}>
              <FormLabel htmlFor="isChecked" m={0}>
                {t("common:open-subscribe")}:
              </FormLabel>

              <Switch id="isChecked" />
            </Flex>
          </Stack>
        </CardBody>

        <Divider />
      </Card>
    </Flex>
  );
};
