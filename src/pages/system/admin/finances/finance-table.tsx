import {
  random,
  transformUTCDateInLocalDate,
  transformValueInCurrencyBRLFormat,
} from "@/core/helpers";
import { useTranslate } from "@/core/hooks/use-translate";

import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Finances } from "@/core/types/finances";
import { ActionButtons } from "@/components/action-buttons";
import { ROUTES } from "@/core/enum/routes";

interface FinanceTableProps {
  columnValues: Finances[] | undefined;
}

const FinanceTable: React.FC<FinanceTableProps> = ({ columnValues }) => {
  const t = useTranslate(["common", "permissions"]);

  const onClickDelete = (id: string) => {};

  return (
    <TableContainer mt={5} width="100%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th width="65px" textAlign="center">
              {t("common:record")}
            </Th>
            <Th width="125px" textAlign="center">
              {t("common:date")}
            </Th>
            <Th width="75px" textAlign="center">
              {t("common:value")}
            </Th>
            <Th width="300px" textAlign="center">
              {t("common:description")}
            </Th>
            <Th width="auto" textAlign="center">
              {t("common:owner")}
            </Th>
            <Th width="100px" textAlign="center">
              {t("common:actions")}
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {!!columnValues?.length ? (
            columnValues?.map((item) => {
              const date = transformUTCDateInLocalDate(item.date);
              const value = transformValueInCurrencyBRLFormat(item.value);

              return (
                <Tr key={random()}>
                  <Td textAlign="center">{item.record}</Td>
                  <Td textAlign="center">{date}</Td>
                  <Td textAlign="center">{value}</Td>
                  <Td textAlign="center" noOfLines={1}>
                    {item.description}
                  </Td>
                  <Td textAlign="center">{item.owner}</Td>
                  <Td textAlign="center">
                    <ActionButtons
                      editLink={`${ROUTES.EDIT_FINANCE}/${item.record}`}
                      onClickDelete={() => onClickDelete(item.record)}
                    />
                  </Td>
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

export default FinanceTable;
