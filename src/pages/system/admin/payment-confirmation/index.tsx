import { EventsInput } from "@/components-setc/inputs/select-events";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Flex, Heading } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CardItem } from "./card-item";
import { Spinner } from "@/components/loaders/spinner";
import { PaymentConfirmation } from "@/core/types/payment-confirmation";
import { PaymentConfirmationModal } from "@/components-setc/modals/payment-confirmation";
import { SelectOptions } from "@/core/types/select-input";
import { useDocumentTitle } from "@/core/hooks/use-document-title";

export const PaymentConfirmationPage: React.FC = () => {
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common", "menu"]);
  const methods = useForm({ mode: "onChange" });

  useDocumentTitle(t("menu:payment-confirmation"));

  const event: SelectOptions = methods.watch("events");

  const [activitySelected, setActivitySelected] = useState<PaymentConfirmation>();
  const [paymentConfirmationIsOpen, setPaymentConfirmationIsOpen] = useState(false);

  const activitiesQuery = useMutation({
    mutationKey: ["get-payment-activities"],
    mutationFn: (event: string) =>
      axios.getFn<PaymentConfirmation[]>(`${event}/payment-activities`),
  });

  const onCloseModal = () => {
    setPaymentConfirmationIsOpen(false);
    event?.value && activitiesQuery.mutate(event.value);
  };

  const handleButtonSeeUserList = (id: PaymentConfirmation) => {
    setActivitySelected(id);
    setPaymentConfirmationIsOpen(true);
  };

  useEffect(() => {
    if (activitiesQuery.isError) error.dispatch(activitiesQuery.error as AxiosError);
    if (activitiesQuery.isSuccess) {
    }
  }, [activitiesQuery.isError, activitiesQuery.isSuccess]);

  useEffect(() => {
    if (event?.value) {
      activitiesQuery.mutate(event?.value);
    }
  }, [event]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:payment-confirmation")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <Flex maxW="400px">
            <EventsInput methods={methods} />
          </Flex>

          {activitiesQuery.isPending ? (
            <Flex alignItems="center" justifyContent="center" height="inherit" mt={6}>
              <Spinner />
            </Flex>
          ) : (
            <Flex flexWrap="wrap" mt={7} gridGap={5}>
              {activitiesQuery.data?.map((item, index) => {
                return <CardItem key={index} data={item} onClick={handleButtonSeeUserList} />;
              })}
            </Flex>
          )}

          {paymentConfirmationIsOpen && activitySelected && event.value && (
            <PaymentConfirmationModal
              event={event.value}
              onClose={onCloseModal}
              activity={activitySelected}
              isOpen={paymentConfirmationIsOpen}
            />
          )}
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
