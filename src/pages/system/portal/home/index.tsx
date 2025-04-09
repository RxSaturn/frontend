import LinkButton from "@/components/buttons/link-button";
import { Calendar } from "@/components/calendar";
import { Spinner } from "@/components/loaders/spinner";
import { User } from "@/core/types/user";
import { ROUTES } from "@/core/enum/routes";
import { useAuth } from "@/core/hooks/use-auth";
import { useAxios } from "@/core/hooks/use-axios";
import { useTranslate } from "@/core/hooks/use-translate";
import { useAuthStore } from "@/core/stores/auth";
import { useUserStore } from "@/core/stores/user";
import MenuPanel from "@/layouts/system";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import UserHeader from "./user-header";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { useEffect, useState } from "react";
import { UpdateProfileModal } from "@/components-setc/modals/update-profile-modal";
import MinicourseAlertModal from "@/components-setc/modals/minicourse-alert-modal";

const UserHome: React.FC = () => {
  const { auth } = useAuth();
  const { axios } = useAxios();
  const t = useTranslate(["common"]);
  const { authData } = useAuthStore((state) => state);
  const { setUser } = useUserStore((state) => state);

  const [minicourseAlertIsOpen, setMinicourseAlertIsOpen] = useState(!authData.selectedActivities && authData.registeredEvent);

  useDocumentTitle(t("menu:home"));

  const userQuery = useQuery({
    queryKey: ["user-login"],
    queryFn: () => axios.getFn<User>(`user/${authData?.user}`),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userQuery.isSuccess) {
          userQuery.data.active !== "1" && auth.logout();
          setUser(userQuery.data);
        }
      } catch (error: any) {
        error.dispatch(error as AxiosError);
      }
    };

    fetchData();
  }, [userQuery.isSuccess, auth.logout, setUser, userQuery.data?.active]);

  return (
    <MenuPanel>
      <UserHeader isLoading={userQuery.isPending} activities={userQuery.data?.activities} />

      {userQuery.isPending ? (
        <Flex alignItems="center" justifyContent="center">
          <Spinner marginTop={7} />
        </Flex>
      ) : (
        userQuery.data && (
          <Flex flexDirection="column" alignItems="center">
            <Heading marginBottom={7}>{t("common:schedule")}</Heading>

            {userQuery.data?.schedule?.length ? (
              <Flex
                p={4}
                minWidth="100%"
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
              >
                <Calendar />
              </Flex>
            ) : (
              <Flex flexDirection="column" alignItems="center">
                <Text textAlign="center">{t("common:schedule-warning")}</Text>
                <Text textAlign="center">O evento ocorrerá entre os dias 02 e 06 de setembro.</Text>

                <LinkButton to={ROUTES.EVENTS} variant="solid" marginTop={7}>
                  {t("common:schedule-button-text")}
                </LinkButton>
              </Flex>
            )}
          </Flex>
        )
      )}

      <UpdateProfileModal />
      <MinicourseAlertModal
        isOpen={minicourseAlertIsOpen}
        onClose={() => setMinicourseAlertIsOpen(false)}
      />
    </MenuPanel>
  );
};

export default UserHome;
