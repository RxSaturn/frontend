import { SelectInput } from "@/components/inputs/select";
import { HookForm } from "@/core/types/hook-form";
import { CertificateType } from "@/core/enum/certificate-type";
import { useTranslate } from "@/core/hooks/use-translate";

interface SelectCertificateInputProps extends HookForm {
  name?: string;
  label?: string;
  defaultValue?: string;
}

export const SelectCertificateInput: React.FC<SelectCertificateInputProps> = ({
  name,
  label,
  rules,
  methods,
  defaultValue = "",
}) => {
  const t = useTranslate(["common", "validation"]);

  const options = [
    { value: CertificateType.Participant, label: "Participante" },
    { value: CertificateType.Organizer, label: "Organizador" },
    { value: CertificateType.Minister, label: "Ministrante" },
    { value: CertificateType.Speaker, label: "Palestrante" },
    { value: CertificateType.Minicourse, label: "Minicurso" },
    { value: CertificateType.Marathon, label: "Maratona" },
    { value: CertificateType.GameChampionship, label: "Campeonato de jogos" },
    { value: CertificateType.RoundTable, label: "Mesa redonda" },
    { value: CertificateType.Presentation, label: "Apresentação" },
    { value: CertificateType.Judge, label: "Juiz" },
  ];

  return (
    <SelectInput
      rules={rules}
      methods={methods}
      options={options}
      name={name || "order"}
      inputValue={defaultValue}
      label={label || t("common:certificate-type")}
    />
  );
};
