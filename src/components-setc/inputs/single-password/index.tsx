import { Input } from "@/components/inputs/input";
import ToggleSensitiveContent, {
  ToggleIconOptions,
} from "@/components/inputs/togglesensitivecontent";
import { HookForm } from "@/core/types/hook-form";
import { useTranslate } from "@/core/hooks/use-translate";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface SinglePasswordInputProps extends HookForm {
  name?: string;
  label?: string;
}

export const SinglePasswordInput: React.FC<SinglePasswordInputProps> = ({
  name,
  label,
  methods,
}) => {
  const [type, setType] = useState("password");
  const t = useTranslate(["common", "validation"]);
  const icons: ToggleIconOptions = {
    onIcon: AiOutlineEye,
    offIcon: AiOutlineEyeInvisible,
  };

  const handleOnToggle = () => (type == "password" ? setType("text") : setType("password"));

  return (
    <Input
      type={type}
      methods={methods}
      isRequired={true}
      name={name || "password"}
      label={label || t("common:password")}
      rules={{ required: t("validation:required") }}
      rightAddon={
        <ToggleSensitiveContent
          tooltip={t("common:tscTooltip")}
          mode={type}
          aria-label={t("common:tscAriaLabel")}
          icons={icons}
          onClick={handleOnToggle}
          variant="outline"
          sx={{
            color: "var(--colors-blue-600)",
            fontSize: "lg",
            ml: "5px",
          }}
        />
      }
    />
  );
};
