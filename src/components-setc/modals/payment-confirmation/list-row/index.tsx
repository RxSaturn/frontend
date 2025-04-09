import { FaCheck, FaWhatsapp } from "react-icons/fa";
import { Avatar, Button, Flex, Text, Tooltip } from "@chakra-ui/react";

import { useTranslate } from "@/core/hooks/use-translate";
import LinkButton from "@/components/buttons/link-button";
import { PaymentConfirmationUserList } from "@/core/types/payment-confirmation";
import {
  generateWhatsappLink,
  transformDateInLocalDate,
  transformValueInCurrencyBRLFormat,
} from "@/core/helpers";

type ListRowProps = {
  isLoading: boolean;
  data: PaymentConfirmationUserList;
  onClickConfirm: (id: string, teamId: string) => void;
  onClickRemove: (id: string, teamId: string) => void;
  onClickConfirmPaymentActivity: (id: string) => void;
  onClickRemovePaymentActivity: (id: string) => void;
};

export const ListRow = ({
  isLoading,
  data,
  onClickConfirm,
  onClickRemove,
  onClickConfirmPaymentActivity,
  onClickRemovePaymentActivity,
}: ListRowProps) => {
  const t = useTranslate(["common"]);

  return (
    <Flex
      p={3}
      gridGap={2}
      rounded="xl"
      boxShadow="lg"
      flexWrap="wrap"
      border="1px solid"
      alignItems="center"
      borderColor="gray.100"
      justifyContent="space-between"
    >
      <Flex gridGap={3}>
        {data.payday ? (
          <Tooltip label={`Pagamento: ${transformDateInLocalDate(data.payday)}`}>
            <Flex
              width="48px"
              height="48px"
              rounded="full"
              alignItems="center"
              justifyContent="center"
              backgroundColor="green"
            >
              <FaCheck color="white" />
            </Flex>
          </Tooltip>
        ) : (
          <Avatar name={data.teamName ? data.teamName : data.name} color="white" />
        )}

        <Flex flexDirection="column">
          <Text fontWeight="bold" color="gray.800">
            {data.teamName ? data.teamName : data.name}
          </Text>

          <Flex gridGap={2}>
            {data?.phone && (
              <Flex alignItems="center">
                <LinkButton to={generateWhatsappLink(data.phone)} width="20px" target="_blank">
                  <FaWhatsapp color="#22c35e" fontSize="16px" />
                </LinkButton>

                <Text fontSize="14px">{data.phone}</Text>
                <Text ml={2}>|</Text>
              </Flex>
            )}

            {data.price === "0" ? (
              <Text color="green">{t("common:free")}</Text>
            ) : (
              <Text>
                {t("common:value")}: {transformValueInCurrencyBRLFormat(data.price)}
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Flex
        gridGap={2}
        flexDirection="column"
        justifyContent="center"
        width={{ base: "100%", sm: "auto" }}
        alignItems={{ base: "center", sm: "end" }}
      >
        {data.payday || data.participated === "1" ? (
          data.price !== "0" && (
            <Button
              size="sm"
              width="95px"
              colorScheme="red"
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={() => onClickRemove(data?.id, data.teamId)}
            >
              {t("common:remove")}
            </Button>
          )
        ) : (
          <Button
            size="sm"
            width="95px"
            colorScheme="green"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={() => onClickConfirm(data?.id, data.teamId)}
          >
            {t("common:confirm")}
          </Button>
        )}
      </Flex>

      {data?.activities_price  !== "0" && !data?.teamId && (
        <Flex
          gridGap={2}
          justifyContent="end"
          width={{ base: "100%", sm: "100%" }}
          alignItems={{ base: "center", sm: "end" }}
        >
          <Text>
            Minicursos | Valor: {transformValueInCurrencyBRLFormat(data.activities_price)}
          </Text>

          {data.payday_activities ? (
            <Button
              size="sm"
              width="95px"
              colorScheme="red"
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={() => onClickRemovePaymentActivity(data?.subscribeId)}
            >
              {t("common:remove")}
            </Button>
          ) : (
            <Button
              size="sm"
              width="95px"
              colorScheme="green"
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={() => onClickConfirmPaymentActivity(data?.subscribeId)}
            >
              {t("common:confirm")}
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  );
};
