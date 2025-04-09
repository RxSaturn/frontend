import { Button, Text, Flex } from "@chakra-ui/react";
import { PixPayment } from "./pix-payment";
import { RiErrorWarningFill } from "react-icons/ri";
import { useTranslate } from "@/core/hooks/use-translate";
import { useEventStore } from "@/core/stores/event";
import { FaWhatsapp } from "react-icons/fa";
import { useUserStore } from "@/core/stores/user";
import { formatPhoneNumber } from "@/core/helpers";

type PendingPaymentModalProps = {
  valuePix?: string | undefined
  valueMoney?: string
}

export const PendingPaymentModal: React.FC<PendingPaymentModalProps> = ({ valuePix, valueMoney="15" }) => {
  const t = useTranslate(["common"]);
  const { eventUserSelected: event } = useEventStore((state) => state);
  const { user } = useUserStore((state) => state);

  const openWhatsappApp = () => {
    const phone = event?.phone;
    const eventTitle = event?.title.replaceAll(" ", "%20");
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=Olá,%20me%20chamo%20${user?.name}%20e%20estou%20enviando%20o%20comprovante%20de%20pagamento%20feito%20para%20concluir%20a%20minha%20inscrição%20no%20evento%20${eventTitle}`;

    window.open(url, "_blank");
  };

  return (
    <Flex alignItems="center" flexDirection="column" justifyContent="space-around">
      {event && (
        <>
          <RiErrorWarningFill color="#FFA500" fontSize="64px" />

          <Text textAlign="justify" mt={3}>
            {t("common:complete-payment-text-modal")}
          </Text>

          <PixPayment valuePix={valuePix ? valuePix : event.price} valueMoney={valueMoney} pix={event.pix_key}></PixPayment>

          <Text textAlign="justify" mt={2} mb={5}>
            {t("common:complete-payment-text-modal-footer")}
          </Text>

          <Text textAlign="center">
            <strong>E-mail</strong>: setc.bambui@ifmg.edu.br
          </Text>

          <Text textAlign="center">
            <strong>Whatsapp</strong>: {formatPhoneNumber(event?.phone)}
          </Text>

          <Text textAlign="center">Ou clique no botão abaixo</Text>

          <Button colorScheme="whatsapp" onClick={openWhatsappApp} gridGap={2} mt={7}>
            <FaWhatsapp />
            {t("common:send-receipt")}
          </Button>
        </>
      )}
    </Flex>
  );
};
