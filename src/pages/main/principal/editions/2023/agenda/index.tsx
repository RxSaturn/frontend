import { SETCSchedule } from "@/core/types/principal";
import { useTranslate } from "@/core/hooks/use-translate";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Grid,
  GridItem,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { FaCalendar } from "react-icons/fa";

interface PrincipalAgendaProps {
  agenda: SETCSchedule | undefined;
}

export const PrincipalAgenda: React.FC<PrincipalAgendaProps> = ({ agenda }) => {
  const t = useTranslate(["common"]);

  return (
    <Flex
      px={8}
      id="schedule"
      as="section"
      width="100%"
      maxWidth="1320px"
      margin="16px auto"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      gridGap={{ base: 6, md: 6 }}
    >
      <Heading fontWeight="medium" textAlign="center">
        {t("common:schedule")}
      </Heading>

      <Text textAlign="center">{t("common:schedule-text")}</Text>

      <Flex width="100%" maxWidth="1320px" justifyContent="center">
        <Tabs variant="enclosed" width="100%">
          <TabList justifyContent={{ base: "initial", lg: "center" }} overflowY="hidden">
            {agenda &&
              Object.keys(agenda).map((key, index) => {
                const date = new Date(`${key}T00:00`);
                const formattedDate = date.toLocaleDateString();

                return (
                  <Tab key={`${key}-${index}`} gridGap={3}>
                    <FaCalendar />
                    {formattedDate}
                  </Tab>
                );
              })}
          </TabList>

          <TabPanels border="1px" borderColor="gray.200">
            {agenda &&
              Object.keys(agenda).map((key, index) => {
                return (
                  <TabPanel key={index}>
                    <Accordion allowToggle>
                      {agenda[key].map((item, index) => {
                        return (
                          <AccordionItem
                            key={`${key}-${index}`}
                            _first={{ borderTopWidth: 0 }}
                            _last={{ borderBottomWidth: 0 }}
                          >
                            <AccordionButton p={0}>
                              <Grid width="100%" gridTemplateColumns="repeat(12, 1fr)">
                                <GridItem
                                  p={3}
                                  minW="200px"
                                  color="white"
                                  display="flex"
                                  alignItems="center"
                                  flexDirection="column"
                                  justifyContent="center"
                                  colSpan={[12, 12, 2, 2]}
                                  minH={{ base: "100px", lg: "130px" }}
                                  background="linear-gradient(to right,rgba(16,43,175,0.95),rgba(22,100,255,0.95))"
                                >
                                  <Flex flexDirection="column" alignItems="start">
                                    <Text fontSize={["md", "lg", "xl"]}>{item.time}</Text>
                                    <Text fontSize={["md", "lg", "xl"]} textAlign="start">
                                      {t(`common:${item.type}`)}
                                    </Text>
                                  </Flex>
                                </GridItem>

                                <GridItem
                                  p={4}
                                  gridGap={2}
                                  display="flex"
                                  alignItems="start"
                                  flexDirection="column"
                                  justifyContent="center"
                                  colSpan={[12, 12, 10, 10]}
                                >
                                  <Heading fontSize={["md", "lg", "xl", "2xl"]} textAlign="start">
                                    {item.title}
                                  </Heading>

                                  <Text
                                    color="gray.500"
                                    textAlign="start"
                                    fontWeight="bold"
                                    fontSize={["md", "md", "lg"]}
                                  >
                                    {item.instructor}
                                  </Text>

                                  {item.target_audience && (
                                    <Text
                                      color="#1664ff"
                                      fontWeight="bold"
                                      textAlign="start"
                                      fontSize={["sm", "sm", "md"]}
                                    >
                                      {`${t(`common:recommendation`)}: ${item.target_audience}`}
                                    </Text>
                                  )}

                                  {item.local && (
                                    <Text color="gray.500" fontSize={["sm", "sm", "md"]}>
                                      {`${t(`common:local`)}: ${item.local}`}
                                    </Text>
                                  )}
                                </GridItem>
                              </Grid>
                            </AccordionButton>

                            {item.description && (
                              <AccordionPanel p={6} fontSize={["md", "lg", "xl"]}>
                                {item.description}
                              </AccordionPanel>
                            )}
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </TabPanel>
                );
              })}
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};
