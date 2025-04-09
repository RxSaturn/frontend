import { GridItem } from "@chakra-ui/react";
import { SelectInput } from "@/components/inputs/select";
import { useTranslate } from "@/core/hooks/use-translate";
import { useEffect, useState } from "react";
import { YesOrNo } from "@/core/enum/no-yes";
import { HookForm } from "@/core/types/hook-form";

export const PwdInput: React.FC<HookForm> = ({ methods }) => {
  const t = useTranslate(["common", "validation"]);

  const [pwdValue, setPwdValue] = useState();
  const [pwdTypeValue, setPwdTypeValue] = useState(null);
  const [enablePwdType, setEnablePwdType] = useState<boolean>(false);

  const pwdOptions = [
    { value: "0", label: t("common:no") },
    { value: "1", label: t("common:yes") },
  ];

  const pwdTypeOptions = [
    { value: "0", label: t("common:physical") },
    { value: "1", label: t("common:visual") },
    { value: "2", label: t("common:auditory") },
    { value: "3", label: t("common:mental") },
    { value: "4", label: t("common:intellectual") },
  ];

  useEffect(() => {
    if (pwdValue === YesOrNo.Yes) {
      setEnablePwdType(true);
    } else if (pwdValue === YesOrNo.No) {
      setEnablePwdType(false);
    }
  }, [pwdValue]);

  return (
    <>
      <GridItem colSpan={[12, 12, 6, 3]}>
        <SelectInput
          name="pwd"
          methods={methods}
          options={pwdOptions}
          inputValue={pwdValue}
          label={t("common:pwd")}
          onChange={(e) => setPwdValue(e)}
          rules={{ required: t("validation:required") }}
        />
      </GridItem>

      <GridItem colSpan={[12, 12, 6, 3]}>
        <SelectInput
          name="pwdType"
          methods={methods}
          options={pwdTypeOptions}
          inputValue={pwdTypeValue}
          isDisabled={!enablePwdType}
          label={t("common:pwd-type")}
          onChange={(e) => setPwdTypeValue(e)}
        />
      </GridItem>
    </>
  );
};
