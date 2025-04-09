import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaExternalLinkAlt, FaPlus } from "react-icons/fa";
import { Alert, AlertIcon, Button, Flex, Heading, Text } from "@chakra-ui/react";

import MenuPanel from "@/layouts/system";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useAuthStore } from "@/core/stores/auth";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Championship } from "@/core/types/championship";
import { useTranslate } from "@/core/hooks/use-translate";
import { useMemberListStore } from "@/core/stores/member-list";
import { MarathonModal } from "@/components-setc/modals/marathon";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { useChampionshipListStore } from "@/core/stores/championship-list";
import { UpdateProfileModal } from "@/components-setc/modals/update-profile-modal";
import { ChampionshipGamesModal } from "@/components-setc/modals/championship-games";
import { SelectChampionshipMarathonModal } from "@/components-setc/modals/select-champoionship-marathon";

import { ChampionshipCard } from "./championship-card";

export const championshipPage: React.FC = () => {
  const hasWhatsappGroup = true;
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["menu", "common"]);

  useDocumentTitle(t("menu:championship-marathon"));

  const { authData } = useAuthStore((state) => state);
  const { clearMemberList } = useMemberListStore((state) => state);
  const { clearChampionshipList } = useChampionshipListStore((state) => state);

  const [isOpenMarathonModal, setIsOpenMarathonModal] = useState<boolean>(false);
  const [isOpenChampionGamesModal, setIsOpenChampionGamesModal] = useState<boolean>(false);
  const [isOpenSelectChampionshipMarathonModal, setIsOpenSelectChampionshipMarathonModal] =
    useState<boolean>(false);

  const championshipQuery = useMutation({
    mutationKey: ["audit"],
    mutationFn: () => axios.getFn<Championship[]>(`teams/${authData?.user}`),
  });

  const onCloseSelectChampionshipMarathonModal = () => {
    setIsOpenSelectChampionshipMarathonModal(false);
  };

  const onCloseChampionGamesModal = () => {
    clearMemberList();
    clearChampionshipList();
    championshipQuery.mutate();
    setIsOpenChampionGamesModal(false);
  };

  const onCloseMarathonModal = () => {
    clearMemberList();
    clearChampionshipList();
    championshipQuery.mutate();
    setIsOpenMarathonModal(false);
  };

  useEffect(() => {
    championshipQuery.mutate();
  }, []);

  useEffect(() => {
    if (championshipQuery.isError) error.dispatch(championshipQuery.error as AxiosError);
  }, [championshipQuery.isError, championshipQuery.isSuccess]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:championship-marathon")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex
            mb={5}
            gridGap={3}
            flexWrap="wrap"
            justifyContent={hasWhatsappGroup ? { base: "end", xl: "space-between" } : { base: "end" }}
          >
            {hasWhatsappGroup &&
              <Alert status="info" maxWidth="850px">
                <AlertIcon />

                <Text>
                  Caso você esteja sem equipe, junte-se ao nosso grupo do
                  <Link to="https://chat.whatsapp.com/ESDSSQm8v8MIlAsaemvR71" target="_blank">
                    <Text
                      mx={1}
                      as="span"
                      gridGap={2}
                      alignItems="center"
                      display="inline-flex"
                      textDecoration="underline"
                    >
                      Whatsapp <FaExternalLinkAlt />
                    </Text>
                  </Link>
                  para encontrar uma equipe.
                </Text>
              </Alert>
            }

            <Button
              gridGap={2}
              colorScheme="blue"
              onClick={() => setIsOpenSelectChampionshipMarathonModal(true)}
            >
              <FaPlus />
              Nova equipe
            </Button>
          </Flex>

          <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Heading mb={4} fontSize="3xl" textAlign="center">
              Equipes que você faz parte
            </Heading>
          </Flex>

          <Flex mt={7} gridGap={5} flexWrap="wrap">
            {championshipQuery.data?.length ? (
              championshipQuery.data?.map((item, index) => {
                return <ChampionshipCard key={index} championship={item} />;
              })
            ) : (
              <Text textAlign="center" width="100%">
                Você ainda não está em nenhuma equipe.
              </Text>
            )}
          </Flex>
        </BodyPanel>

        {isOpenSelectChampionshipMarathonModal && (
          <SelectChampionshipMarathonModal
            isOpen={isOpenSelectChampionshipMarathonModal}
            setIsOpenMarathonModal={setIsOpenMarathonModal}
            onClose={onCloseSelectChampionshipMarathonModal}
            setIsOpenChampionGamesModal={setIsOpenChampionGamesModal}
          />
        )}

        {isOpenChampionGamesModal && (
          <ChampionshipGamesModal
            isOpen={isOpenChampionGamesModal}
            onClose={onCloseChampionGamesModal}
          />
        )}

        {isOpenMarathonModal && (
          <MarathonModal isOpen={isOpenMarathonModal} onClose={onCloseMarathonModal} />
        )}

        <UpdateProfileModal />
      </Flex>
    </MenuPanel>
  );
};
