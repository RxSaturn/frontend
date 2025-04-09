import { random } from "@/core/helpers";
import { PermissionSlug } from "@/core/types/permissions";
import { useTranslate } from "@/core/hooks/use-translate";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

interface PermissionTableProps {
  permissionList: PermissionSlug[];
}

const PermissionTable: React.FC<PermissionTableProps> = ({ permissionList }) => {
  const t = useTranslate(["common", "permissions"]);

  return (
    <TableContainer mt={5} width="100%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t("common:permission")}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {permissionList?.map((item) => {
            const permissionKey = item.slug.replaceAll("_", "-");

            return (
              <Tr key={random()}>
                <Td>{t(`permissions:${permissionKey}`)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PermissionTable;
