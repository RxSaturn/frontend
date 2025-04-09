import { LuAlertTriangle } from "react-icons/lu";
import { Modal, ModalOverlay, ModalContent, ModalBody, Text, Flex } from "@chakra-ui/react";

import { ROUTES } from "@/core/enum/routes";
import LinkButton from "@/components/buttons/link-button";
import { useTranslate } from "@/core/hooks/use-translate";
import { useEffect } from "react";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthStore } from "@/core/stores/auth";

export const UpdateProfileModal: React.FC = () => {
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common"]);
  const { authData } = useAuthStore((state) => state);

  const userId = authData.user;

  const handleCloseModal = () => {
    return false;
  };

  const {
    data,
    isError,
    isPending,
    error: queryError,
  } = useQuery({
    queryKey: ["verify-profile"],
    queryFn: () => axios.getFn<boolean>(`profile/${userId}/verify`),
  });

  useEffect(() => {
    if (isError) error.dispatch(queryError as AxiosError);
  }, [isError]);

  return (
    <Modal
      closeOnEsc={false}
      onClose={handleCloseModal}
      closeOnOverlayClick={false}
      isOpen={(!isPending && data) || false}
    >
      <ModalOverlay />

      <ModalContent p={4}>
        <ModalBody pb={6}>
          <Flex mb={4} justifyContent="center">
            <LuAlertTriangle color="#FFD700" fontSize="64px" />
          </Flex>
          <Text textAlign="justify" mb={3}>
            Prezado(a) participante,
          </Text>

          <Text textAlign="justify">
            Identificamos que alguns dados do seu perfil estão incompletos. Por favor, atualize seu
            perfil clicando no botão abaixo.
          </Text>
          <Flex mt={4} alignItems="center" justifyContent="center">
            <LinkButton to={ROUTES.PROFILE} size="md" variant="solid">
              {t("common:edit-profile")}
            </LinkButton>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
