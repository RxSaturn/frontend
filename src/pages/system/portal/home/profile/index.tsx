import { Spinner } from "@/components/loaders/spinner";
import { User } from "@/core/types/user";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import { useAuthStore } from "@/core/stores/auth";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Flex, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { UpdatePassword } from "./password";
import { PersonalProfile } from "./personal";

export const EditProfilePage: React.FC = () => {
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common"]);
  const { authData } = useAuthStore((state) => state);

  const [initialValues, setInitialValues] = useState<User>();

  const userQuery = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => axios.getFn<User>(`profile`, { params: { token: authData.token } }),
  });

  useEffect(() => {
    if (userQuery.isError) error.dispatch(userQuery.error as AxiosError);
    if (userQuery.isSuccess) {
      setInitialValues(userQuery.data);
    }
  }, [userQuery.isError, userQuery.isSuccess]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("common:profile")}</Heading>
        </HeaderPanel>

        <BodyPanel gridGap={5}>
          {initialValues ? (
            <>
              <PersonalProfile initialValues={initialValues} setInitialValues={setInitialValues} />

              <UpdatePassword id={initialValues.code} />
            </>
          ) : (
            <Flex alignItems="center" justifyContent="center" height="inherit">
              <Spinner />
            </Flex>
          )}
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
