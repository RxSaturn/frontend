import { useEffect } from "react";
import { AxiosError } from "axios";
import { MutateOptions, useMutation } from "@tanstack/react-query";
import { Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

import { ROUTES } from "@/core/enum/routes";
import { useToast } from "@/core/hooks/use-toast";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { Activities } from "@/core/types/activity";
import { useTranslate } from "@/core/hooks/use-translate";
import { ActionButtons } from "@/components/action-buttons";
import { usePermission } from "@/core/hooks/use-permission";
import { random, transformDateInLocalDate } from "@/core/helpers";
import TableSkeleton from "@/components/skeleton/table-skeleton";

type ActivitiesTableProps = {
  isLoading: boolean;
  activityList?: Activities[];
  reloadData: (
    variables: void,
    options?: MutateOptions<Activities[], Error, void, unknown> | undefined,
  ) => void;
};

const ActivitiesTable = ({ isLoading, activityList, reloadData }: ActivitiesTableProps) => {
  const toast = useToast();
  const { axios } = useAxios();
  const { error: er } = useError();
  const t = useTranslate(["common", "permissions"]);

  const { permission } = usePermission();

  const { isError, isSuccess, isPending, error, mutate } = useMutation({
    mutationKey: ["delete-activity"],
    mutationFn: (id: string) => axios.postFn<void>(`activity/${id}/delete`),
  });

  const onClickDelete = (id: string) => {
    if (permission.canDelete("activities")) {
      mutate(id);
    }
  };

  useEffect(() => {
    if (isError) er.dispatch(error as AxiosError);

    if (isSuccess) {
      reloadData();
      toast.show("success", t("common:register-successfully-deleted"));
    }
  }, [isError, isSuccess]);

  return isLoading || isPending ? (
    <TableSkeleton mt={5} width="100%" columns={5} />
  ) : (
    !!activityList?.length && (
      <>
        <TableContainer mt={5} width="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>{t("common:title")}</Th>
                <Th textAlign="center">{t("common:instructor")}</Th>
                <Th textAlign="center">{t("common:date")}</Th>
                <Th textAlign="center">{t("common:type")}</Th>
                <Th textAlign="center">{t("common:places")}</Th>
                <Th textAlign="center">{t("common:places-available")}</Th>
                <Th textAlign="center">{t("common:actions")}</Th>
              </Tr>
            </Thead>

            <Tbody>
              {activityList?.map((item) => {
                const date = transformDateInLocalDate(item.date);

                return (
                  <Tr key={random()}>
                    <Td>
                      <Text noOfLines={1} maxWidth="300px">
                        {item.title}
                      </Text>
                    </Td>
                    <Td textAlign="center">
                      <Text noOfLines={1} maxWidth="200px">
                        {item.instructor}
                      </Text>
                    </Td>
                    <Td textAlign="center">{date}</Td>
                    <Td textAlign="center">{t(`common:${item.type}`)}</Td>
                    <Td textAlign="center">{item.places_total}</Td>
                    <Td textAlign="center">{item.places_available}</Td>
                    <Td textAlign="center">
                      <ActionButtons
                        editLink={`${ROUTES.EDIT_ACTIVITY}/${item.id}`}
                        onClickDelete={() => onClickDelete(item.id)}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </>
    )
  );
};

export default ActivitiesTable;
