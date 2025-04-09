import { HookForm } from "@/core/types/hook-form";
import { SelectInput } from "@/components/inputs/select";
import { useTranslate } from "@/core/hooks/use-translate";

export const CourseInput: React.FC<HookForm> = ({ methods, defaultValue }) => {
  const t = useTranslate(["common", "validation"]);

  const CourseInputOptions = [
    { value: "Administração", label: "Administração" },
    { value: "Agronomia", label: "Agronomia" },
    { value: "Ciências Biológicas", label: "Ciências Biológicas" },
    { value: "Educação Física", label: "Educação Física" },
    { value: "Engenharia de Alimentos", label: "Engenharia de Alimentos" },
    { value: "Engenharia de Computação", label: "Engenharia de Computação" },
    { value: "Engenharia de Produção", label: "Engenharia de Produção" },
    { value: "Física", label: "Física" },
    { value: "Medicina Veterinária", label: "Medicina Veterinária" },
    { value: "Técnico em Administração", label: "Técnico em Administração" },
    { value: "Técnico em Agropecuária", label: "Técnico em Agropecuária" },
    { value: "Técnico em Biotecnologia", label: "Técnico em Biotecnologia" },
    { value: "Técnico em Eletromecânica", label: "Técnico em Eletromecânica" },
    { value: "Técnico em Informática", label: "Técnico em Informática" },
    { value: "Técnico em Manutenção Automotiva", label: "Técnico em Manutenção Automotiva" },
    { value: "Técnico em Meio Ambiente", label: "Técnico em Meio Ambiente" },
    { value: "Zootecnia", label: "Zootecnia" },
  ];

  return (
    <SelectInput
      name="course"
      methods={methods}
      inputValue={defaultValue}
      label={t("common:course")}
      options={CourseInputOptions}
      rules={{ required: t("validation:required") }}
    />
  );
};
