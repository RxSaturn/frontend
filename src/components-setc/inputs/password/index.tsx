import { Input } from "@/components/inputs/input";
import { HookForm } from "@/core/types/hook-form";
import { useTranslate } from "@/core/hooks/use-translate";
import { GridItem } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface PassswordInputProps extends HookForm {
  label?: string;
}

export const PassswordInput: React.FC<PassswordInputProps> = ({ label, methods }) => {
  const t = useTranslate(["common", "validation"]);
  const password = useRef<HTMLInputElement | null>(null);
  const confirm = useRef<HTMLInputElement | null>(null);

  password.current = methods.watch("password", "");
  confirm.current = methods.watch("confirm", "");

  useEffect(() => {
    const passwordAndConfirmIsDirty =
      typeof password?.current === "string" && typeof confirm?.current === "string";

    // if (passwordAndConfirmIsDirty && password?.current && confirm?.current) {
    //   if (!!methods.formState?.errors?.password) {
    //     methods.trigger("password");
    //   }

    //   if (!!methods.formState?.errors?.confirm) {
    //     methods.trigger("confirm");
    //   }
    // }
  }, [password.current, confirm.current]);

  return (
    <>
      <GridItem colSpan={[12, 12, 6, 3]}>
        <Input
          minLength={6}
          maxLength={15}
          ref={password}
          name="password"
          type="password"
          methods={methods}
          label={label || t("common:password")}
          rules={{
            required: t("validation:required"),
            minLength: {
              value: 6,
              message: t("validation:min-length", {
                field: t("common:password"),
                number: 6,
              }),
            },
            maxLength: {
              value: 15,
              message: t("validation:max-length", {
                field: t("common:password"),
                number: 15,
              }),
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*.#?&])[A-Za-z\d@$!%*.#?&\.;()\[\]\^]{6,15}$/i,
              message: t("validation:password-regex"),
            },
            validate: (value) => {
              if (!confirm.current) {
                return true;
              } else {
                return value === confirm.current || t("validation:password-match");
              }
            },
          }}
        />
      </GridItem>

      <GridItem colSpan={[12, 12, 6, 3]}>
        <Input
          ref={confirm}
          name="confirm"
          type="password"
          methods={methods}
          label={t("common:confirm-password")}
          rules={{
            required: t("validation:required"),
            validate: (value) => value === password.current || t("validation:password-match"),
          }}
        />
      </GridItem>
    </>
  );
};
