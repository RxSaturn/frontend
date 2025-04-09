import { useEffect } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";

import { User } from "@/core/types/user";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { useToast } from "@/core/hooks/use-toast";
import { useUserStore } from "@/core/stores/user";
import { Spinner } from "@/components/loaders/spinner";
import { useTranslate } from "@/core/hooks/use-translate";
import { transformObjectInFormData } from "@/core/helpers";
import { usePermission } from "@/core/hooks/use-permission";
import { RAInput } from "@/components-setc/inputs/ra-input";
import { CustomDatePicker } from "@/components/inputs/datepicker";
import {
  AffiliationIFMGInput,
  CPFInput,
  ClassInput,
  CourseInput,
  EmailInput,
  NameInput,
  PhoneInput,
  TShirtSize,
} from "@/components-setc/inputs";

type PersonalProfileProps = {
  initialValues: User;
  setInitialValues: (e: any) => void;
};

export const PersonalProfile: React.FC<PersonalProfileProps> = ({
  initialValues,
  setInitialValues,
}) => {
  const toast = useToast();
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common"]);
  const { permission } = usePermission();
  const methods = useForm<User>({ mode: "all" });
  const affiliation = methods.watch("affiliationIfmg");

  const showStudentInfo =
    (initialValues?.affiliationIfmg?.value === "student" && affiliation === undefined) ||
    affiliation?.value === "student";

  const userUpdatedQuery = useMutation({
    mutationKey: ["user-updated"],
    mutationFn: (formdata: FormData) =>
      axios.postFn<{ message: string; user: User }>(`profile/${initialValues?.code}`, formdata),
  });

  const onSubmit = (data: User) => {
    if (permission.canEdit("home")) {
      const formdata = transformObjectInFormData(data);
      userUpdatedQuery.mutate(formdata);
    }
  };

  useEffect(() => {
    if (userUpdatedQuery.isError) error.dispatch(userUpdatedQuery.error as AxiosError);
    if (userUpdatedQuery.isSuccess) {
      setInitialValues(userUpdatedQuery.data.user);
      toast.show("success", userUpdatedQuery.data.message);
    }
  }, [userUpdatedQuery.isError, userUpdatedQuery.isSuccess]);

  useEffect(() => {
    methods.trigger();
  }, [methods.trigger]);

  useEffect(() => {
    if (!showStudentInfo) {
      methods.resetField("ra");
      methods.resetField("course");
      methods.resetField("class");
    }
  }, [showStudentInfo]);

  return userUpdatedQuery.isPending ? (
    <Flex alignItems="center" justifyContent="center" height="438px">
      <Spinner />
    </Flex>
  ) : (
    <Flex
      p={5}
      gridGap={5}
      rounded="2xl"
      border="1px solid"
      borderColor="gray.300"
      flexDirection="column"
    >
      <Flex justifyContent="space-between">
        <Heading fontSize={{ base: "xl", md: "2xl" }}>Informações pessoais</Heading>

        <Button colorScheme="blue" onClick={methods.handleSubmit(onSubmit)}>
          {t("common:save")}
        </Button>
      </Flex>

      <Grid gridTemplateColumns="repeat(12, 1fr)" gridGap={4}>
        <GridItem colSpan={[12, 12, 6, 6]}>
          <CPFInput methods={methods} defaultValue={initialValues?.cpf} />
        </GridItem>

        <GridItem colSpan={[12, 12, 6, 6]}>
          <EmailInput methods={methods} defaultValue={initialValues?.email} />
        </GridItem>

        <GridItem colSpan={[12, 12, 6, 6]}>
          <NameInput methods={methods} defaultValue={initialValues?.name} />
        </GridItem>

        <GridItem colSpan={[12, 12, 6, 6]}>
          <PhoneInput methods={methods} defaultValue={initialValues?.phone} />
        </GridItem>

        <GridItem colSpan={[12, 12, 6, 6]}>
          <CustomDatePicker
            name="birthdate"
            methods={methods}
            maxDate={new Date()}
            label={t("common:birthdate")}
            rules={{ required: t("validation:required") }}
            defaultValue={new Date(`${initialValues?.birthdate}T00:00`)}
          />
        </GridItem>

        <GridItem colSpan={[12, 12, 6, 6]}>
          <TShirtSize methods={methods} defaultValue={initialValues?.tshirtSize} />
        </GridItem>

        <GridItem colSpan={[12, 12, 6, 4]}>
          <AffiliationIFMGInput
            methods={methods}
            defaultValue={initialValues?.affiliationIfmg?.value}
          />
        </GridItem>

        {showStudentInfo && (
          <>
            <GridItem colSpan={[12, 12, 4, 4]}>
              <RAInput methods={methods} defaultValue={initialValues?.ra} />
            </GridItem>

            <GridItem colSpan={[12, 12, 4, 4]}>
              <CourseInput methods={methods} defaultValue={initialValues?.course} />
            </GridItem>

            <GridItem colSpan={[12, 12, 4, 4]}>
              <ClassInput methods={methods} defaultValue={initialValues?.class} />
            </GridItem>
          </>
        )}
      </Grid>
    </Flex>
  );
};
