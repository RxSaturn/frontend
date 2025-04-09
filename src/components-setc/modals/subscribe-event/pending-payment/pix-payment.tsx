import { Alert, AlertIcon, Box, Tag, Text } from "@chakra-ui/react";
import React from "react";
import { Image } from "@chakra-ui/react";
import QrcodeImg from "@/assets/img/newqrcode.png";
import { useTranslate } from "@/core/hooks/use-translate";
import { useToast } from "@/core/hooks/use-toast";

interface PixPaymentProps {
  valuePix: string;
  valueMoney: string;
  pix: string;
}

export const PixPayment: React.FC<PixPaymentProps> = ({ valuePix, valueMoney, pix }) => {
  const toast = useToast();
  const t = useTranslate(["common"]);

  const showQRCode = false;

  const copyPixKeyToClipboard = () => {
    const text = document.getElementById("key")?.innerText;

    if (text) {
      navigator.clipboard.writeText(text).then(
        function () {
          toast.show("success", t("common:copied-clipboard"));
        },
        function () {
          toast.show("success", t("common:copied-clipboard-error"));
        },
      );
    }
  };

  const prepareCurrencyValue = (value: string) => {
    return parseFloat(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <>
      <Box w="100%" p={4} display="flex" flexDirection="column" alignItems="center">
        <Box>
          <Text mb={2}>
            {t("common:subscribe-value-money")} <strong>{prepareCurrencyValue(valueMoney)}</strong>
          </Text>
          <Text>
            {t("common:subscribe-value-pix")} <strong>{prepareCurrencyValue(valuePix)}</strong>
          </Text>
        </Box>

        <Box mt="10px">
          <Text fontWeight="bold">{t("common:pix-key")}</Text>
          {showQRCode && (
            <Image boxSize="150px" src={QrcodeImg} objectFit="cover" alt={t("common:qrcode-alt")} />
          )}
        </Box>

        <Tag
          key="md"
          id="key"
          size="md"
          variant="solid"
          cursor="pointer"
          margin="6px 0px"
          colorScheme="gray"
          onClick={copyPixKeyToClipboard}
        >
          {pix}
        </Tag>
        <Alert>
          <AlertIcon />
          <Text fontSize="12px">
            Ao enviar PIX, favor colocar no campo de observações: INSCRIÇÃO SETC.
          </Text>
        </Alert>
      </Box>
    </>
  );
};
