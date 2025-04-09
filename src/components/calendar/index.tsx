import { useTranslate } from "@/core/hooks/use-translate";
import { useUserStore } from "@/core/stores/user";
import { Box, Button, Card, CardBody, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ShowMoreActivityModal from "@/components-setc/modals/show-more-modal";
import { Activities } from "@/core/types/activity";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "@/core/hooks/use-axios";
import { FaInfoCircle } from "react-icons/fa";
import { Spinner } from "../loaders/spinner";

type MonthOptions =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12";
type ScheduleType = "talk" | "minicourse" | "championship" | "roundTable";

export interface Schedule {
  id: number;
  date: string;
  title: string;
  instructor: string;
  local: string;
  type: string;
  participated: string;
}

export const Calendar: React.FC = () => {
  const t = useTranslate(["common"]);
  const { axios } = useAxios();
  const { user } = useUserStore((state) => state);
  
  const [scheduleList, setScheduleList] = useState<Schedule[]>(user?.schedule || []);
  const [loadingId, setLoadingId] = useState<number | undefined>();
  const [isOpenShowMoreModal, setIsOpenShowMoreModal] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<Activities | undefined>();

  const activityQuery = useMutation({
    mutationKey: ["activity"],
    mutationFn: (activityId: number) =>
      axios.getFn<Activities>(`activity/${activityId}`),
  });

  /**
   * Separa a data da atividade e formata para exibição.
   * @param date: Data da atividade [yy-mm-dd hh:mm:ss].
   * @returns Retorna um elemento com o dia, mês e ano em que será realizada a atividade.
   */
  const prepareDate = (date: string) => {
    const monthDictionary = {
      "01": "Jan",
      "02": "Fev",
      "03": "Mar",
      "04": "Abr",
      "05": "Mai",
      "06": "Jun",
      "07": "Jul",
      "08": "Ago",
      "09": "Set",
      "10": "Out",
      "11": "Nov",
      "12": "Dez",
    };

    const [year, month, day] = date.split(" ")[0].split("-");

    const convertedDate = {
      day: day,
      month: monthDictionary[month as MonthOptions],
      year: year,
    };

    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        textAlign="center"
        minHeight={"80px"}
        padding={"0 10px"}
      >
        <Heading as="h5" size="lg">
          {convertedDate.day}
        </Heading>
        <Text>{convertedDate.month}</Text>
        <Text>{convertedDate.year}</Text>
      </Box>
    );
  };

  /**
   * Separa o o horário da data da atividade.
   * @param date: Data da atividade [yy-mm-dd hh:mm:ss].
   * @returns Retorna a hora em que a atividade será realizada.
   */
  const prepareTime = (date: string) => {
    const splitedTime = date.split(" ")[1];
    return splitedTime.slice(0, 5);
  };

  /**
   * Cria o elemento de título da atividade.
   * @param schedule: Informações da atividade
   * @returns Retorna o titulo com as informações de hora da atividade e o seu tipo.
   */
  const prepareTitle = (schedule: Schedule) => {
    const typeDictionary = {
      talk: "talk",
      minicourse: "minicourse",
      championship: "championship",
      marathon: "marathon",
      roundTable: "roundTable",
    };

    const time = prepareTime(schedule.date);
    const title = `${time} - [${t(typeDictionary[schedule.type as ScheduleType])}] ${
      schedule.title
    }`;

    return (
      <Heading size="md" noOfLines={2} lineHeight={1.3}>
        {title}
      </Heading>
    );
  };

  /**
   * Define a cor do evento de acordo com a situação da atividade.
   * @param schedule: Informações da atividade
   * @returns cor da situação da atividade (verde(participou), vermelho(faltou) ou azul(agendado))
   */
  const setEventColor = (schedule: Schedule): string => {
    const colors = {
      blue: "#1664FF",
      red: "#EE163A",
      green: "#28A745",
    };
    const MISSED = "0";

    const now = new Date();
    const scheduleDate = new Date(schedule.date);

    if (scheduleDate.getTime() > now.getTime()) {
      // Atividade ainda não aconteceu
      return colors.blue;
    } else {
      // Atividade aconteceu
      if (schedule.participated == MISSED) {
        // Faltou na atividade
        return colors.red;
      }

      // Participou da atividade
      return colors.green;
    }
  };

  const handlerOnCloseModal = () => {
    setIsOpenShowMoreModal(false);
    setSelectedActivity(undefined);
  }

  const handlerOnShowMore = (id: number | string) => {
    id = typeof id == "string" ? Number(id) : id;

    setLoadingId(id);
    
    activityQuery.mutate(id, {
      onSettled: () => setLoadingId(undefined)
    });
  }

  useEffect(() => {
    if(activityQuery.data){
      setSelectedActivity(activityQuery.data);
    }
  }, [activityQuery.isSuccess]);

  useEffect(() => {
    if(selectedActivity){
      setIsOpenShowMoreModal(true);
    }
  }, [selectedActivity])

  useEffect(() => {
    if (user?.schedule) {
      setScheduleList(user?.schedule);
    }
  }, [user?.schedule]);

  return (
    <Stack
      spacing="4"
      minWidth="100%"
      paddingRight="5px"
      paddingBottom="10px"
      overflow={{ base: "hidden", lg: "auto" }}
      maxHeight={{ base: "auto", lg: "calc(100vh - 375px)" }}
    >
      {scheduleList?.map((schedule, index) => (
        <Card key={`${schedule.id}-${index}`} size="sm" border={"3px solid #ecf3f8"} borderRadius={"10px"}>
          <CardBody display="flex" justifyContent="space-between" gap={2}>
            <Box display="flex" borderLeft={`4px solid ${setEventColor(schedule)}`} gap={4}>
              {prepareDate(schedule.date)}
              <Box display="flex" flexDirection="column" justifyContent="space-around">
                {prepareTitle(schedule)}
                <Text fontSize="sm" noOfLines={1} color="gray.500" fontWeight="bold">
                  {schedule.instructor}
                </Text>
                <Text fontSize="sm">Local: {schedule.local}</Text>
              </Box>
            </Box>
            <Box display="flex">
              <IconButton
                h="100%"
                icon={loadingId == schedule.id ? <Spinner w="24px" h="24px" /> : <FaInfoCircle width="24px" height="24px" />}
                colorScheme="blue"
                aria-label={`Ver mais sobre ${schedule.title}`}
                borderRightRadius="10px"
                onClick={() => !loadingId && handlerOnShowMore(schedule.id)}
                isDisabled={!!loadingId}
              />
            </Box>
          </CardBody>
        </Card>
      ))}
      {selectedActivity &&
        <ShowMoreActivityModal 
          activity={selectedActivity}
          isOpen={isOpenShowMoreModal}
          onClose={handlerOnCloseModal}
        />
      }
    </Stack>
    
  );
};
