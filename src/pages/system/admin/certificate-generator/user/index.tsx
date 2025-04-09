import { CertificateData } from "@/core/types/certificate";
import { ROUTES } from "@/core/enum/routes";
import { useAxios } from "@/core/hooks/use-axios";
import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import { queryClient } from "@/core/services/queryClient";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { PdfDocument } from "@/layouts/certificate/2023";
import { Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const CertificateUserPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const t = useTranslate(["common", "menu"]);

  const [certificateData, setCertificateData] = useState<CertificateData[]>([]);

  const { axios } = useAxios();
  const { error } = useError();

  useDocumentTitle(t("menu:certificate-multiple"));

  const certificateDataGet = useQuery({
    queryKey: ["user-certificate"],
    queryFn: () => axios.getFn<CertificateData[]>(`user/${id}/certificate`),
    // TODO: adjust deprecated funcion
    // {
    //   onSuccess: (data) => {
    //     setCertificateData(data);
    //   },
    // },
  });

  useEffect(() => {
    if (certificateDataGet.isError) error.dispatch(certificateDataGet.error as AxiosError);
  }, [certificateDataGet.isError]);

  const handleBack = () => {
    setCertificateData([]);
    queryClient.removeQueries();
    navigate(`${ROUTES.CERTIFICATE_MULTIPLE}`);
  };

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>
            {t("menu:certificate-multiple")} - {state?.name}
          </Heading>
        </HeaderPanel>

        <BodyPanel>
          {certificateDataGet.isLoading ? (
            <Spinner marginTop={7} />
          ) : (
            <>
              <Flex justifyContent="end">
                <Button size="sm" variant="solid" colorScheme="blue" onClick={() => handleBack()}>
                  Voltar
                </Button>
              </Flex>
              {certificateData &&
                certificateData?.map((item, i) => {
                  return (
                    <Flex
                      key={i}
                      flexDirection="column"
                      gridGap={3}
                      _notFirst={{ marginTop: "32px" }}
                    >
                      <Text fontWeight="bold" px={2}>
                        {item.title} - {item.date}
                      </Text>

                      <hr style={{ borderColor: "#1a202c" }} />

                      <Flex flexDirection="column" gridGap={2}>
                        {item?.certificates?.map((certificate, index) => {
                          return (
                            <Flex
                              px={4}
                              py={2}
                              key={index}
                              border="1px solid"
                              borderRadius="25px"
                              alignItems="center"
                              borderColor="gray.200"
                              justifyContent="space-between"
                            >
                              <Text fontWeight="medium">
                                {certificate.activityTitle || item.title}
                              </Text>

                              {certificate.authenticityCode && (
                                <PDFDownloadLink
                                  document={<PdfDocument data={certificate} />}
                                  fileName={`${certificate.activityTitle || item.title}.pdf`}
                                  style={{
                                    color: "white",
                                    height: "40px",
                                    display: "flex",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    paddingLeft: "16px",
                                    borderRadius: "6px",
                                    paddingRight: "16px",
                                    alignItems: "center",
                                    textDecoration: "none",
                                    backgroundColor: "#1863ff",
                                    border: "1px solid #e2e8f0",
                                  }}
                                >
                                  {({ blob, url, loading, error }) =>
                                    loading ? `${t("common:loading")}...` : t("common:download")
                                  }
                                </PDFDownloadLink>
                              )}
                            </Flex>
                          );
                        })}
                      </Flex>
                    </Flex>
                  );
                })}
            </>
          )}
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
