import { SelectInput } from "@/components/inputs/select";
import { HookForm } from "@/core/types/hook-form";
import { UserPaymentStatus } from "@/core/enum/user-event-status";
import { useTranslate } from "@/core/hooks/use-translate";

interface UserStatusInputProps extends HookForm {
  name?: string;
  label?: string;
  hintText?: string;
  defaultValue?: string;
}

export const UserStatusInput: React.FC<UserStatusInputProps> = ({
  name,
  label,
  rules,
  methods,
  hintText,
  defaultValue = "",
}) => {
  const t = useTranslate(["common", "validation"]);

  const statusOptions = [
    { value: UserPaymentStatus.All, label: "Todos" },
    { value: UserPaymentStatus.PaymentConfirmed, label: "Confirmados" },
    { value: UserPaymentStatus.PaymentNotConfirmed, label: "Não confirmados" },
  ];

  return (
    <SelectInput
      rules={rules}
      methods={methods}
      hintText={hintText}
      options={statusOptions}
      name={name || "status"}
      inputValue={defaultValue}
      label={label || t("common:payment")}
    />
  );
};
