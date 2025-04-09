import { CertificateEventsSelect } from "@/components-setc/inputs/select-events-certificate";
import { TutorialPopUpModal } from "@/components-setc/modals/tutorial-pop-up-modal";
import { Spinner } from "@/components/loaders/spinner";
import { ROUTES } from "@/core/enum/routes";
import { openPDF, transformObjectInFormData } from "@/core/helpers";
import { useAxios } from "@/core/hooks/use-axios";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import { useAuthStore } from "@/core/stores/auth";
import { CertificateData } from "@/core/types/certificate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const CertificatePage: React.FC = () => {
  const { axios } = useAxios();
  const { error } = useError();
  const methods = useForm({ mode: "onChange" });
  const t = useTranslate(["common", "permissions"]);
  const { authData } = useAuthStore((state) => state);

  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [isOpenTutorialModal, setIsOpenTutorialModal] = useState<boolean>(false);

  useDocumentTitle(t("menu:certificate"));

  const event = methods.watch("events");

  const { data, ...userCertificateGet } = useMutation({
    mutationKey: ["get-user-certificates"],
    mutationFn: (eventId: string) =>
      axios.getFn<CertificateData>(`user/${authData?.user}/event/${eventId}/certificate`),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["post-generate-user-certificate"],
    mutationFn: (formdata: FormData) =>
      axios.postFn<{ pdfBase64: string }>(`user/${authData?.user}/certificate`, formdata),
    onSuccess: (data) => {
      openPDF(data?.pdfBase64, () => {
        setIsOpenTutorialModal(true);
      });
    },
    onSettled: () => {
      setLoadingKey(null);
    },
    onError: (e) => {
      error.dispatch(e as AxiosError);
    },
  });

  const handleCertificate = (eventId: number, activityId: number | null) => {
    const params = { eventId, activityId };

    const formdata = transformObjectInFormData(params);

    mutate(formdata);
  };

  const handleCloseTutorialModal = () => {
    setIsOpenTutorialModal(false);
  };

  useEffect(() => {
    if (userCertificateGet.isError) error.dispatch(userCertificateGet.error as AxiosError);
  }, [userCertificateGet.isError]);

  useEffect(() => {
    if (event?.value) {
      userCertificateGet.mutate(event?.value);
    }
  }, [event]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:certificate")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          {isOpenTutorialModal && (
            <TutorialPopUpModal isOpen={isOpenTutorialModal} onClose={handleCloseTutorialModal} />
          )}

          <CertificateEventsSelect methods={methods} />

          {event?.value && (
            <>
              {userCertificateGet.isPending ? (
                <Flex alignItems="center" justifyContent="center">
                  <Spinner marginTop={7} />
                </Flex>
              ) : (
                <>
                  <Flex flexDirection="column" gridGap={3} mt={5}>
                    <Flex flexDirection="column" gridGap={2}>
                      {!data?.certificates.length && (
                        <Flex alignItems="center" justifyContent="center">
                          <Text fontWeight="medium">
                            Não há certificados disponíveis para visualização no momento. Em caso de
                            dúvidas, por favor, entre em contato com o nosso{" "}
                            <Link href={ROUTES.SUPPORT} color="blue.500">
                              suporte
                            </Link>
                            .
                          </Text>
                        </Flex>
                      )}

                      {!!data?.certificates.length &&
                        data?.certificates?.map((certificate, index) => {
                          const key = `${data.eventId}-${index}`;

                          return (
                            <Flex
                              px={4}
                              py={2}
                              key={key}
                              border="1px solid"
                              borderRadius="16px"
                              alignItems="center"
                              borderColor="gray.200"
                              flexDirection={{ base: "column", lg: "row" }}
                              justifyContent={{ base: "initial", lg: "space-between" }}
                            >
                              <Text fontWeight="medium" textAlign="center">
                                {certificate?.activityTitle}
                              </Text>

                              <Button
                                size="sm"
                                colorScheme="blue"
                                marginTop={{ base: "8px", lg: "0px" }}
                                isLoading={loadingKey === key && isPending}
                                isDisabled={loadingKey !== key && isPending}
                                onClick={() => {
                                  setLoadingKey(key);
                                  handleCertificate(data.eventId, certificate.activityId);
                                }}
                              >
                                {t("common:generate-certificate")}
                              </Button>
                            </Flex>
                          );
                        })}
                    </Flex>
                  </Flex>
                </>
              )}
            </>
          )}
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
