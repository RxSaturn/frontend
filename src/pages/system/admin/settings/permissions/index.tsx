import { SelectInput } from "@/components/inputs/select";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { Permissions } from "@/core/types/permissions";
import { RoleList } from "@/core/types/role";
import { PermissionsSubmit } from "@/core/types/submit/permissions";
import { SelectOptions } from "@/core/types/select-input";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useToast } from "@/core/hooks/use-toast";
import { useTranslate } from "@/core/hooks/use-translate";
import { useAuthStore } from "@/core/stores/auth";
import { useSkeletonStore } from "@/core/stores/skeleton";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PermissionTable from "./permission-table";

const SettingsPermissionsPage: React.FC = () => {
  const toast = useToast();
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common", "permissions"]);
  const methods = useForm<PermissionsSubmit>({ mode: "onChange" });

  const { authData, setAuthData } = useAuthStore();
  const { isLoadingTable, setIsLoadingTable } = useSkeletonStore();

  const isInvalid = !methods.formState.isDirty || !methods.formState.isValid;

  const [roleId, setRoleId] = useState();
  const [rolesList, setRoleList] = useState<SelectOptions[]>([]);
  const [permissionList, setPermissionList] = useState<Permissions[]>([]);

  const rolesQuery = useQuery({
    queryKey: ["roles"],
    queryFn: () => axios.getFn<RoleList[]>(`roles`),
  });

  const getRolePermissionsQuery = useMutation({
    mutationKey: ["get-role-permissions"],
    mutationFn: (roleId: string) =>
      axios.getFn<Permissions[]>("role-permissions", { params: { roleId } }),
  });

  const postRolePermissionsQuery = useMutation({
    mutationKey: ["post-role-permissions"],
    mutationFn: (formdata: FormData) => axios.postFn<Permissions[]>("role-permissions", formdata),
  });

  const onSubmit = (data: PermissionsSubmit) => {
    if (data?.role?.value) {
      const permissions: number[] = [];

      data.permissions.forEach((value: boolean, index: number) => {
        if (value) {
          permissions.push(index);
        }
      });

      let formData = new FormData();

      formData.append("permissions", JSON.stringify(permissions));
      formData.append("role", data.role.value);

      postRolePermissionsQuery.mutate(formData);
    }
  };

  useEffect(() => {
    if (rolesQuery.isError) error.dispatch(rolesQuery.error as AxiosError);

    if (rolesQuery.isSuccess) {
      const list = rolesQuery.data.map((item: RoleList) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setRoleList(list);
    }
  }, [rolesQuery.isError, rolesQuery.isSuccess]);

  useEffect(() => {
    setIsLoadingTable(postRolePermissionsQuery.isPending);

    if (postRolePermissionsQuery.isError)
      error.dispatch(postRolePermissionsQuery.error as AxiosError);

    if (postRolePermissionsQuery.isSuccess) {
      setPermissionList(postRolePermissionsQuery.data);
      setAuthData({ ...authData, permissions: postRolePermissionsQuery.data });
      toast.show("success", t("common:permissions-successfully-save"));
    }
  }, [postRolePermissionsQuery.isError, postRolePermissionsQuery.isSuccess]);

  useEffect(() => {
    if (roleId) {
      getRolePermissionsQuery.mutate(roleId);
    } else {
      setPermissionList([]);
    }
  }, [roleId]);

  useEffect(() => {
    setIsLoadingTable(getRolePermissionsQuery.isPending);

    if (getRolePermissionsQuery.isError) {
      error.dispatch(getRolePermissionsQuery.error as AxiosError);
    }

    if (getRolePermissionsQuery.isSuccess) {
      setPermissionList(getRolePermissionsQuery.data);
    }
  }, [
    getRolePermissionsQuery.isError,
    getRolePermissionsQuery.isSuccess,
    getRolePermissionsQuery.isPending,
  ]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("permissions:settings-permission")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex justifyContent="end">
            <Button
              colorScheme="blue"
              isLoading={rolesQuery.isPending || postRolePermissionsQuery.isPending}
              isDisabled={isInvalid || rolesQuery.isPending || postRolePermissionsQuery.isPending}
              onClick={methods.handleSubmit(onSubmit)}
            >
              {t("common:save")}
            </Button>
          </Flex>

          <SelectInput
            name="role"
            methods={methods}
            options={rolesList}
            inputValue={roleId}
            label={t("common:role")}
            onChange={(v) => setRoleId(v)}
          />

          <Flex flexDirection="column" alignItems="center">
            {isLoadingTable ? (
              <TableSkeleton mt={5} width="100%" columns={6} />
            ) : !!permissionList?.length ? (
              <PermissionTable methods={methods} permissionList={permissionList} />
            ) : (
              <Text mt={8} fontSize="xl">
                {t("common:select-role-to-load-data")}
              </Text>
            )}
          </Flex>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};

export default SettingsPermissionsPage;
