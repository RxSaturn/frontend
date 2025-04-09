import { random, transformUTCDateInLocalDate } from "@/core/helpers";
import { useTranslate } from "@/core/hooks/use-translate";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { IAuditTable } from "@/core/types/audit";
import { useError } from "@/core/hooks/use-error";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "@/core/hooks/use-axios";

interface AuditTableProps {
  entityId: string;
}

interface AuditParams {
  entityId: string;
  table: string;
}

const AuditTable: React.FC<AuditTableProps> = ({ entityId }) => {
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common", "permissions"]);

  const auditQuery = useMutation({
    mutationKey: ["audit"],
    mutationFn: (params: AuditParams) => axios.getFn<IAuditTable[]>("audit", { params: params }),
  });

  useEffect(() => {
    if (entityId) {
      auditQuery.mutate({ entityId: entityId, table: "finances" });
    }
  }, [entityId]);

  useEffect(() => {
    if (auditQuery.isError) error.dispatch(auditQuery.error as AxiosError);
  }, [auditQuery.isError]);

  return (
    <TableContainer mt={5} width="100%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th width="125px" textAlign="center">
              {t("common:date")}
            </Th>
            <Th width="auto" textAlign="center">
              {t("common:owner")}
            </Th>
            <Th width="75px" textAlign="center">
              {t("common:type")}
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {!!auditQuery.data?.length ? (
            auditQuery.data?.map((item) => {
              const date = transformUTCDateInLocalDate(item.date);

              return (
                <Tr key={random()} onClick={() => console.log(item.requestId)}>
                  <Td textAlign="center">{date}</Td>
                  <Td textAlign="center">{item.owner}</Td>
                  <Td textAlign="center">{item.type}</Td>
                </Tr>
              );
            })
          ) : (
            <Tr key={random()}>
              <Td colSpan={5} textAlign="center">
                {t("common:noRecordsFound")}
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AuditTable;
