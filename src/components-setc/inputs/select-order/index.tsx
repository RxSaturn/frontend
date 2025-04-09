import { SelectInput } from "@/components/inputs/select";
import { HookForm } from "@/core/types/hook-form";
import { OrderBy } from "@/core/enum/order-by";
import { useTranslate } from "@/core/hooks/use-translate";

interface OrderByInputProps extends HookForm {
  name?: string;
  label?: string;
  hintText?: string;
  defaultValue?: string;
}

export const OrderByInput: React.FC<OrderByInputProps> = ({
  name,
  label,
  rules,
  methods,
  hintText,
  defaultValue = "",
}) => {
  const t = useTranslate(["common", "validation"]);

  const statusOptions = [
    { value: OrderBy.Id, label: "ID" },
    { value: OrderBy.Name, label: "Nome" },
    { value: OrderBy.Code, label: "Código" },
    { value: OrderBy.Class, label: "Turma" },
    { value: OrderBy.Email, label: "E-mail" },
    { value: OrderBy.Course, label: "Curso" },
    { value: OrderBy.Payday, label: "Pagamento" },
  ];

  return (
    <SelectInput
      rules={rules}
      methods={methods}
      hintText={hintText}
      options={statusOptions}
      name={name || "order"}
      inputValue={defaultValue}
      label={label || t("common:order-by")}
    />
  );
};
