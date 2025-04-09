import { PassswordInput, SinglePasswordInput } from "@/components-setc/inputs";
import { User } from "@/core/types/user";
import { transformObjectInFormData } from "@/core/helpers";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { usePermission } from "@/core/hooks/use-permission";
import { useToast } from "@/core/hooks/use-toast";
import { useTranslate } from "@/core/hooks/use-translate";
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UpdatePasswordProps {
  id: string;
}

export const UpdatePassword: React.FC<UpdatePasswordProps> = ({ id }) => {
  const toast = useToast();
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common"]);
  const { permission } = usePermission();
  const methodsPassword = useForm<User>({ mode: "onChange" });

  const userUpdatedQuery = useMutation({
    mutationKey: ["password-updated"],
    mutationFn: (formdata: FormData) => axios.postFn<any>(`profile/password/${id}`, formdata),
  });

  const onSubmitPassword = (data: User) => {
    if (permission.canEdit("home")) {
      const formdata = transformObjectInFormData(data);
      userUpdatedQuery.mutate(formdata);
    }
  };

  useEffect(() => {
    if (userUpdatedQuery.isError) error.dispatch(userUpdatedQuery.error as AxiosError);
    if (userUpdatedQuery.isSuccess) {
      toast.show("success", userUpdatedQuery.data);
    }
  }, [userUpdatedQuery.isError, userUpdatedQuery.isSuccess]);

  return (
    <Flex
      p={5}
      gridGap={5}
      rounded="2xl"
      border="1px solid"
      borderColor="gray.300"
      flexDirection="column"
    >
      <Flex justifyContent="space-between">
        <Heading fontSize={{ base: "xl", md: "2xl" }}>Atualizar senha</Heading>

        <Button colorScheme="blue" onClick={methodsPassword.handleSubmit(onSubmitPassword)}>
          {t("common:save")}
        </Button>
      </Flex>

      <Grid gridTemplateColumns="repeat(12, 1fr)">
        <GridItem colSpan={[12, 12, 6, 6]} gridGap={4} display="flex" flexDirection="column">
          <SinglePasswordInput
            name="currentPassword"
            methods={methodsPassword}
            label={t("common:current-password")}
          />

          <PassswordInput methods={methodsPassword} label={t("common:new-password")} />
        </GridItem>
      </Grid>
    </Flex>
  );
};
