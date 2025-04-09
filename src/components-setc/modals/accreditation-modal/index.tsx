import { Spinner } from "@/components/loaders/spinner";
import { SearchInput } from "@/components/search-input";
import { EventUsersReturn, EventUsers } from "@/core/types/activity";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from "@chakra-ui/modal";
import { Flex, IconButton, ModalCloseButton, Tooltip } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { AccreditationListRow } from "./list-row";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import { useMutation } from "@tanstack/react-query";
import { ActivityType } from "@/core/enum/activities-type";
import { Filter } from "@/components/filter";
import { BsPrinterFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/core/stores/auth";
import { EventAccreditation } from "@/core/types/events";

interface AccreditationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventAccreditation;
}

export const AccreditationModal: React.FC<AccreditationModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const t = useTranslate(["common"]);
  const { authData } = useAuthStore((state) => state);

  const [useFilter, setUseFilter] = useState<boolean>(false);
  const [userList, setUserList] = useState<EventUsers[]>([]);
  const [filterList, setFilterList] = useState<EventUsers[]>([]);

  const getKey = (item: EventUsers) => item.name;

  const query = useMutation({
    mutationKey: ["get-event-users"],
    mutationFn: (url: string) => axios.getFn<EventUsers[]>(url),
  });

  const actionQuery = useMutation({
    mutationKey: ["post-confirm-accreditation"],
    mutationFn: (url: string) => axios.postFn<EventUsersReturn>(url),
  });

  const handleConfirmButton = (userId: string) => {
    actionQuery.mutate(`/event/${event.id}/accreditation/confirm/user/${userId}`);
  };

  const handleRemoveButton = (userId: string) => {
    actionQuery.mutate(`/event/${event.id}/accreditation/delete/user/${userId}`);
  };

  const getUsersList = () => {
    query.mutate(`/event/${event.id}/accreditation/users`);
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
        if (item.id === actionQuery.data.id) {
          return {
            ...item,
            accredited: actionQuery.data.accredited,
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
      key: "accredited",
      colorScheme: "blue",
    },
    {
      id: 2,
      value: "1",
      colorScheme: "green",
      key: "accredited",
      label: "Confirmados",
    },
    {
      id: 3,
      value: "0",
      key: "accredited",
      colorScheme: "red",
      label: "Não confirmados",
    },
  ];

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
        <ModalHeader pr={10}>{event.title}</ModalHeader>

        <ModalCloseButton isDisabled={actionQuery.isPending} />

        <ModalBody height="inherit">
          {query.isPending ? (
            <Flex alignItems="center" justifyContent="center" height="inherit" mt={6}>
              <Spinner />
            </Flex>
          ) : (
            query.data && (
              <Flex flexDirection="column" gridGap={4} width="100%">
                <Flex alignItems="center">
                  <SearchInput list={query.data} setList={setUserList} getKey={getKey} />
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
                        <AccreditationListRow
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
                        <AccreditationListRow
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
