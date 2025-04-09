import TableSkeleton from "@/components/skeleton/table-skeleton";
import { PermissionSlug } from "@/core/types/permissions";
import { ROUTES } from "@/core/enum/routes";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PermissionTable from "./permission-table";

const PermissionsPage: React.FC = () => {
  const { axios } = useAxios();
  const { error } = useError();
  const navigate = useNavigate();
  const t = useTranslate(["common", "validation"]);

  const handleNewButton = () => {
    navigate(ROUTES.SETTINGS_NEW_PERMISSION);
  };

  const permissionsQuery = useQuery({
    queryKey: ["permissions"],
    queryFn: () => axios.getFn<PermissionSlug[]>(`permissions`),
  });

  useEffect(() => {
    if (permissionsQuery.isError) error.dispatch(permissionsQuery.error as AxiosError);
  }, [permissionsQuery.isError]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("common:permissions")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex justifyContent="end" gridGap={2}>
            <Button colorScheme="blue" isDisabled={false} onClick={() => handleNewButton()}>
              {t("common:new")}
            </Button>
          </Flex>

          <Flex flexDirection="column" alignItems="center">
            {permissionsQuery.isLoading ? (
              <TableSkeleton mt={5} width="100%" columns={6} />
            ) : (
              !!permissionsQuery?.data?.length && (
                <PermissionTable permissionList={permissionsQuery.data} />
              )
            )}
          </Flex>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};

export default PermissionsPage;
