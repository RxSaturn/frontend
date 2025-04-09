import { Spinner } from "@/components/loaders/spinner";
import { SearchInput } from "@/components/search-input";
import { ActivityUsers, ActivityUsersReturn, EventActivities } from "@/core/types/activity";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from "@chakra-ui/modal";
import { Flex, IconButton, ModalCloseButton, Tooltip } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ListRow } from "./list-row";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import { useMutation } from "@tanstack/react-query";
import { ActivityType } from "@/core/enum/activities-type";
import { Filter } from "@/components/filter";
import { BsPrinterFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/core/stores/auth";

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: EventActivities;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({ isOpen, onClose, activity }) => {
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const t = useTranslate(["common"]);
  const { authData } = useAuthStore((state) => state);

  const [userList, setUserList] = useState<ActivityUsers[]>([]);
  const [filterList, setFilterList] = useState<ActivityUsers[]>([]);
  const [useFilter, setUseFilter] = useState<boolean>(false);

  const getKey = (item: ActivityUsers) => item.name;

  const query = useMutation({
    mutationKey: ["get-activity-users"],
    mutationFn: (url: string) => axios.getFn<ActivityUsers[]>(url),
  });

  const actionQuery = useMutation({
    mutationKey: ["post-confirm-paymet"],
    mutationFn: (url: string) => axios.postFn<ActivityUsersReturn>(url),
  });

  const handleConfirmButton = (userId: string, teamId: string) => {
    if (
      activity.type === ActivityType.Marathon ||
      activity.type === ActivityType.GameChampionship
    ) {
      actionQuery.mutate(`championship/confirm-participated/${teamId}/${userId}`);
    } else {
      actionQuery.mutate(`activity/${activity.id}/confirm-participated/${userId}`);
    }
  };

  const handleRemoveButton = (userId: string, teamId: string) => {
    if (
      activity.type === ActivityType.Marathon ||
      activity.type === ActivityType.GameChampionship
    ) {
      actionQuery.mutate(`championship/delete-participated/${teamId}/${userId}`);
    } else {
      actionQuery.mutate(`activity/${activity.id}/delete-participated/${userId}`);
    }
  };

  const getUsersList = () => {
    if (
      activity.type === ActivityType.Marathon ||
      activity.type === ActivityType.GameChampionship
    ) {
      query.mutate(`championship/${activity.id}/users`);
    } else {
      query.mutate(`activity/${activity.id}/users`);
    }
  };

  useEffect(() => {
    if (query.isError) error.dispatch(query.error as AxiosError);
    if (query.isSuccess) {
      setUserList(query.data);
    }
  }, [query.isError, query.isSuccess]);

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    if (actionQuery.isError) error.dispatch(actionQuery.error as AxiosError);
    if (actionQuery.isSuccess) {
      const updatedArray = userList.map((item) => {
        if (
          (item.id === actionQuery.data.id && item.teamId === actionQuery.data.teamId) ||
          (!item.teamId && item.id === actionQuery.data.id)
        ) {
          return {
            ...item,
            participated: actionQuery.data.participated,
          };
        }

        return item;
      });

      setUserList(updatedArray);
    }
  }, [actionQuery.isError, actionQuery.isSuccess]);

  const filterConfig = [
    {
      id: 1,
      value: undefined,
      active: true,
      label: "Todos",
      key: "participated",
      colorScheme: "blue",
    },
    {
      id: 2,
      value: "1",
      colorScheme: "green",
      key: "participated",
      label: "Confirmados",
    },
    {
      id: 3,
      value: "0",
      key: "participated",
      colorScheme: "red",
      label: "Não confirmados",
    },
  ];

  const handlePrint = () => {
    navigate("/lista", { state: { users: userList, activityName: activity.title } });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      size={{ base: "full", lg: "3xl" }}
    >
      <ModalOverlay />

      <ModalContent height="100%">
        <ModalHeader pr={10}>{activity.title}</ModalHeader>

        <ModalCloseButton isDisabled={actionQuery.isPending} />

        <ModalBody height="inherit">
          {query.isPending ? (
            <Flex alignItems="center" justifyContent="center" height="inherit" mt={6}>
              <Spinner />
            </Flex>
          ) : (
            query.data && (
              <Flex flexDirection="column" gridGap={4} width="100%">
                <Flex alignItems="center" gridGap={3}>
                  <SearchInput list={query.data} setList={setUserList} getKey={getKey} />

                  {authData.role?.name === "Administrador" && (
                    <Tooltip label="Imprimir" shouldWrapChildren>
                      <IconButton
                        aria-label=""
                        icon={<BsPrinterFill />}
                        onClick={() => handlePrint()}
                      />
                    </Tooltip>
                  )}
                </Flex>

                {userList && (
                  <Filter
                    list={userList}
                    config={filterConfig}
                    setList={setFilterList}
                    setUseFilter={setUseFilter}
                  />
                )}

                {useFilter
                  ? filterList.map((item, index) => {
                      return (
                        <ListRow
                          key={index}
                          data={item}
                          isLoading={actionQuery.isPending}
                          onClickRemove={handleRemoveButton}
                          onClickConfirm={handleConfirmButton}
                        />
                      );
                    })
                  : !!userList.length &&
                    userList.map((item, index) => {
                      return (
                        <ListRow
                          key={index}
                          data={item}
                          isLoading={actionQuery.isPending}
                          onClickRemove={handleRemoveButton}
                          onClickConfirm={handleConfirmButton}
                        />
                      );
                    })}
              </Flex>
            )
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
