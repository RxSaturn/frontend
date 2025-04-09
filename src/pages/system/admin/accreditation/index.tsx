import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Box, Flex, Heading, Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { t } from "i18next";
import { AccreditationCard, AccreditationCardProps, EventStatus } from "./accreditation-card";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { BsPlusLg } from "react-icons/bs";
import { HiMinus } from "react-icons/hi";
import { EventAccreditation } from "@/core/types/events";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { AccreditationModal } from "@/components-setc/modals/accreditation-modal";

type FilterTypes = "Finalizado" | "Em andamento" | "Não iniciado";

interface FilterProps {
  name: FilterTypes;
  icon: IconType;
  color: string;
  variant: "outline" | "subtle";
  isActive: boolean;
}

export const AccreditationPage: React.FC = () => {
  const { error } = useError();
  const { axios } = useAxios();

  const [eventSelected, setEventSelected] = useState<EventAccreditation>();
  const [isOpenAccreditationModal, setIsOpenAccreditationModal] = useState(false);

  const eventQuery = useMutation({
    mutationKey: ["get-event-users"],
    mutationFn: () => axios.getFn<EventAccreditation[]>("/accreditation/events"),
  });

  const filterOptionsInstance: FilterProps[] = [
    {
      name: "Finalizado",
      icon: HiMinus,
      color: "red",
      variant: "subtle",
      isActive: true,
    },
    {
      name: "Em andamento",
      icon: HiMinus,
      color: "green",
      variant: "subtle",
      isActive: true,
    },
    {
      name: "Não iniciado",
      icon: HiMinus,
      color: "blue",
      variant: "subtle",
      isActive: true,
    },
  ];
  const [selectedFilters, setSelectedFilters] = useState(["finished", "inprogress", "onhold"]);
  const [filterOptions, setFilterOptions] = useState(filterOptionsInstance);

  const updateSelectedFilters = (filter: FilterTypes) => {
    const dictionaryFilters = {
      Finalizado: "finished",
      "Em andamento": "inprogress",
      "Não iniciado": "onhold",
    };

    const translatedFilter = dictionaryFilters[filter];

    const selectedFiltersCopy = selectedFilters.slice();
    const indexToRemove = selectedFiltersCopy.findIndex((item) => item === translatedFilter);

    if (indexToRemove > -1) {
      selectedFiltersCopy.splice(indexToRemove, 1);
    } else {
      selectedFiltersCopy.push(translatedFilter);
    }

    setSelectedFilters(selectedFiltersCopy);
  };

  const updateFilter = (filter: FilterProps) => {
    const filterCopy = filterOptions.slice();
    const indexToUpdate = filterCopy.findIndex((value) => value.name === filter.name);

    if (indexToUpdate > -1) {
      if (!filter.isActive || selectedFilters.length - 1 > 0) {
        filter.isActive = !filter.isActive;
        filter.variant = filter.isActive ? "subtle" : "outline";
        filter.icon = filter.isActive ? HiMinus : BsPlusLg;
        filterCopy[indexToUpdate] = filter;

        setFilterOptions(filterCopy);
        updateSelectedFilters(filter.name);
      }
    }
  };

  const getEventStatus = (start_date: string, end_date: string): EventStatus => {
    const now = new Date().getTime();
    const startDate = new Date(start_date).getTime();
    const endDate = new Date(end_date).getTime();

    if (startDate <= now && now <= endDate) {
      return "inprogress";
    }

    if (now >= endDate) {
      return "finished";
    }

    return "onhold";
  };

  const handleButtonSeeUserList = (event: EventAccreditation) => {
    setEventSelected(event);
    setIsOpenAccreditationModal(true);
  };

  const onCloseModal = () => {
    setIsOpenAccreditationModal(false);
    eventQuery.mutate();
  };

  const setAccreditationCard = () => {
    return eventQuery.data?.map((item) => {
      const status = getEventStatus(item.start_date, item.end_date);

      if (selectedFilters.includes(status)) {
        return (
          <Box margin="10px" key={item.id}>
            <AccreditationCard event={item} status={status} onClick={handleButtonSeeUserList} />
          </Box>
        );
      }
    });
  };

  useEffect(() => {
    eventQuery.mutate();
  }, []);

  useEffect(() => {
    if (eventQuery.isError) error.dispatch(eventQuery.error as AxiosError);
  }, [eventQuery.isError, eventQuery.isSuccess]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("common:accreditation")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex direction="column" gridGap={3}>
            <Heading size="md">{t("common:filtertools")}</Heading>
            <Flex flexWrap="wrap" gridGap={3}>
              {filterOptions.map((value, id) => (
                <Tag
                  key={id}
                  size="md"
                  cursor="pointer"
                  userSelect="none"
                  variant={value.variant}
                  colorScheme={value.color}
                  transition=".2s ease-in all"
                  onClick={() => updateFilter(value)}
                >
                  <TagLeftIcon boxSize="12px" as={value.icon} />
                  <TagLabel>{value.name}</TagLabel>
                </Tag>
              ))}
            </Flex>
          </Flex>
          <Flex
            flexWrap="wrap"
            overflow={{ base: "hidden", lg: "auto" }}
            maxHeight={{ base: "auto", lg: "calc(100vh - 200px)" }}
          >
            {setAccreditationCard()}
          </Flex>
        </BodyPanel>

        {isOpenAccreditationModal && eventSelected && (
          <AccreditationModal
            event={eventSelected}
            isOpen={isOpenAccreditationModal}
            onClose={onCloseModal}
          />
        )}
      </Flex>
    </MenuPanel>
  );
};
