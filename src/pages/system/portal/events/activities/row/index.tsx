import { Flex, Text } from "@chakra-ui/react";
import { ActivityBox } from "../activity-box";
import { useTranslate } from "@/core/hooks/use-translate";
import { EventActivity } from "@/core/types/activity";
import { getLanguage } from "@/core/providers/i18n/language";
import { format, parse } from "date-fns";
import { pt } from "date-fns/locale";

type RowProps = {
  methods: any;
  isLoading: boolean;
  handleActivityChange: () => void;
  data: { [date: string]: { [type: string]: EventActivity[] } };
  optionsToShow?: string[];
};

export const Row = ({ data, methods, handleActivityChange, isLoading, optionsToShow=["talk", "minicourse"] }: RowProps) => {
  const t = useTranslate(["common"]);
  const groupedActivities: { [date: string]: { [type: string]: EventActivity[] } } = {};

  data &&
    Object.keys(data).forEach((date) => {
      const activitiesByDate = data[date];

      Object.keys(activitiesByDate).forEach((type) => {
        const activities = activitiesByDate[type];

        if (!groupedActivities[date]) {
          groupedActivities[date] = {};
        }

        if (!groupedActivities[date][type]) {
          groupedActivities[date][type] = [];
        }

        activities.forEach((activity: any) => {
          groupedActivities[date][type].push(activity);
        });
      });
    });

  return (
    <>
      {Object.keys(groupedActivities).map((date) => {
        const parsedDate = parse(date, "dd/MM/yyyy", new Date());
        const weekday = format(parsedDate, "EEEE", { locale: pt });
        if(groupedActivities[date]["minicourse"])
        return (
          <Flex
            pb={5}
            key={date}
            gridGap={3}
            flexDirection="column"
            _notLast={{ borderBottom: "1px solid gray" }}
          >
            <Text fontSize="xl" fontStyle="bold">
              Atividades dia {date} ({weekday})
            </Text>

            {Object.keys(groupedActivities[date]).map((type) => {
              if(optionsToShow.includes(type))
              return (
                <Flex key={type} flexDirection="column" gridGap={3}>
                  <Text fontSize="md" fontStyle="medium">
                    {t(`common:${type}`)}
                  </Text>

                  <Flex gridGap={4} flexWrap="wrap">
                    {groupedActivities[date][type].map((activity, index) => (
                      <ActivityBox
                        key={index}
                        methods={methods}
                        activity={activity}
                        isLoading={isLoading}
                        handleActivityChange={handleActivityChange}
                      />
                    ))}
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        );
      })}
    </>
  );
};
