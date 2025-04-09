import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import { useTranslate } from "@/core/hooks/use-translate";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Spinner } from "@/components/loaders/spinner";
import {
  PaymentActivitiesConfirmationUserReturn,
  PaymentConfirmation,
  PaymentConfirmationUserList,
  PaymentConfirmationUserReturn,
} from "@/core/types/payment-confirmation";
import { ActivityType } from "@/core/enum/activities-type";
import { ListRow } from "./list-row";
import { SearchInput } from "@/components/search-input";
import { Filter } from "@/components/filter";

interface PaymentConfirmationModalModalProps {
  event: string;
  isOpen: boolean;
  onClose: () => void;
  activity: PaymentConfirmation;
}

export const PaymentConfirmationModal: React.FC<PaymentConfirmationModalModalProps> = ({
  event,
  isOpen,
  onClose,
  activity,
}) => {
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common"]);

  const [userList, setUserList] = useState<PaymentConfirmationUserList[]>([]);
  const [filterList, setFilterList] = useState<PaymentConfirmationUserList[]>([]);
  const [useFilter, setUseFilter] = useState<boolean>(false);

  const getKey = (item: PaymentConfirmationUserList) => (item.teamName ? item.teamName : item.name);

  const query = useMutation({
    mutationKey: ["get-payment-users"],
    mutationFn: (url: string) => axios.getFn<PaymentConfirmationUserList[]>(url),
  });

  const actionQuery = useMutation({
    mutationKey: ["post-confirm-payment"],
    mutationFn: (url: string) => axios.postFn<PaymentConfirmationUserReturn>(url),
  });

  const handleConfirmButton = (userId: string, teamId: string) => {
    if (
      activity.type === ActivityType.Marathon ||
      activity.type === ActivityType.GameChampionship
    ) {
      actionQuery.mutate(`championship/confirm-payment/${teamId}`);
    } else {
      actionQuery.mutate(`event/confirm-payment/${event}/${userId}`);
    }
  };

  const handleRemoveButton = (userId: string, teamId: string) => {
    if (
      activity.type === ActivityType.Marathon ||
      activity.type === ActivityType.GameChampionship
    ) {
      actionQuery.mutate(`championship/delete-payment/${teamId}`);
    } else {
      actionQuery.mutate(`event/delete-payment/${event}/${userId}`);
    }
  };

  const getUsersList = () => {
    if (
      activity.type === ActivityType.Marathon ||
      activity.type === ActivityType.GameChampionship
    ) {
      query.mutate(`championship/${activity.id}/teams`);
    } else {
      query.mutate(`${activity.id}/users`);
    }
  };

  const activitiesQuery = useMutation({
    mutationKey: ["post-confirm-payment"],
    mutationFn: (url: string) => axios.postFn<PaymentActivitiesConfirmationUserReturn>(url),
  });

  const onClickRemovePaymentActivity = (subscribeId: string) => {
    activitiesQuery.mutate(`event/${event}/delete-payment/${subscribeId}/activities`);
  };

  const onClickConfirmPaymentActivity = (subscribeId: string) => {
    activitiesQuery.mutate(`event/${event}/confirm-payment/${subscribeId}/activities`);
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
            payday: actionQuery.data.payday,
          };
        }

        return item;
      });

      setUserList(updatedArray);
    }
  }, [actionQuery.isError, actionQuery.isSuccess]);

  useEffect(() => {
    if (activitiesQuery.isError) error.dispatch(activitiesQuery.error as AxiosError);
    if (activitiesQuery.isSuccess) {
      const updatedArray = userList.map((item) => {
        if (
          (item.id === activitiesQuery.data.id && item.teamId === activitiesQuery.data.teamId) ||
          (!item.teamId && item.id === activitiesQuery.data.id)
        ) {
          return {
            ...item,
            payday_activities: activitiesQuery.data.payday_activities,
          };
        }

        return item;
      });

      setUserList(updatedArray);
    }
  }, [activitiesQuery.isError, activitiesQuery.isSuccess]);

  const filterConfig = [
    {
      id: 1,
      active: true,
      key: "payday",
      label: "Todos",
      value: undefined,
      colorScheme: "blue",
    },
    {
      id: 2,
      value: "-1",
      key: "payday",
      colorScheme: "green",
      label: "Confirmados",
    },
    {
      id: 3,
      value: null,
      key: "payday",
      colorScheme: "red",
      label: "Não confirmados",
    },
  ];

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />

      <ModalContent height="100%">
        <ModalHeader>{activity.title}</ModalHeader>

        <ModalCloseButton isDisabled={actionQuery.isPending} />

        <ModalBody pb={5} height="inherit">
          {query.isPending ? (
            <Flex alignItems="center" justifyContent="center" height="inherit" mt={6}>
              <Spinner />
            </Flex>
          ) : (
            query.data && (
              <Flex flexDirection="column" gridGap={4} width="100%">
                <SearchInput list={query.data} setList={setUserList} getKey={getKey} />

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
                          onClickRemovePaymentActivity={onClickRemovePaymentActivity}
                          onClickConfirmPaymentActivity={onClickConfirmPaymentActivity}
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
                          onClickRemovePaymentActivity={onClickRemovePaymentActivity}
                          onClickConfirmPaymentActivity={onClickConfirmPaymentActivity}
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
