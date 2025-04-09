import { Checkbox } from "@/components/inputs/checkbox";
import { random } from "@/core/helpers";
import { Permissions } from "@/core/types/permissions";
import { useTranslate } from "@/core/hooks/use-translate";

import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { PermissionsSubmit } from "@/core/types/submit/permissions";

interface PermissionTableProps {
  permissionList: Permissions[];
  methods: UseFormReturn<PermissionsSubmit>;
}

const PermissionTable: React.FC<PermissionTableProps> = ({ methods, permissionList }) => {
  const t = useTranslate(["common", "permissions"]);

  return (
    <TableContainer mt={5} width="100%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t("common:permission")}</Th>
            <Th textAlign="center">{t("permissions:access")}</Th>
            <Th textAlign="center">{t("permissions:create")}</Th>
            <Th textAlign="center">{t("permissions:edit")}</Th>
            <Th textAlign="center">{t("permissions:view")}</Th>
            <Th textAlign="center">{t("permissions:delete")}</Th>
          </Tr>
        </Thead>

        <Tbody>
          {permissionList?.map((item) => {
            const permissionKey = item.name.replaceAll("_", "-");

            return (
              <Tr key={random()}>
                <Td>{t(`permissions:${permissionKey}`)}</Td>

                <Td textAlign="center">
                  <Checkbox
                    methods={methods}
                    isChecked={item.access.checked}
                    name={`permissions.${item.access.id}`}
                  />
                </Td>

                <Td textAlign="center">
                  <Checkbox
                    methods={methods}
                    isChecked={item.create.checked}
                    name={`permissions.${item.create.id}`}
                  />
                </Td>

                <Td textAlign="center">
                  <Checkbox
                    methods={methods}
                    isChecked={item.edit.checked}
                    name={`permissions.${item.edit.id}`}
                  />
                </Td>

                <Td textAlign="center">
                  <Checkbox
                    methods={methods}
                    isChecked={item.view.checked}
                    name={`permissions.${item.view.id}`}
                  />
                </Td>

                <Td textAlign="center">
                  <Checkbox
                    methods={methods}
                    isChecked={item.delete.checked}
                    name={`permissions.${item.delete.id}`}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PermissionTable;
