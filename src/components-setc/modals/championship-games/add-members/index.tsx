import { Button, Flex, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { MemberRow } from "./member-row";
import { useEffect, useState } from "react";
import { Input } from "@/components/inputs/input";
import { useForm } from "react-hook-form";
import { MemberList } from "@/core/types/member-list";
import { useMutation } from "@tanstack/react-query";
import { useError } from "@/core/hooks/use-error";
import { useAxios } from "@/core/hooks/use-axios";
import { AxiosError } from "axios";
import { useToast } from "@/core/hooks/use-toast";
import { useTranslate } from "@/core/hooks/use-translate";
import { useUserStore } from "@/core/stores/user";
import { useMemberListStore } from "@/core/stores/member-list";
import { useChampionshipListStore } from "@/core/stores/championship-list";

export const AddMembersStep: React.FC = () => {
  const toast = useToast();
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common"]);
  const methods = useForm({ mode: "onChange" });

  const getUserByCode = useMutation({
    mutationKey: ["user"],
    mutationFn: (code: string) =>
      axios.getFn<MemberList[]>(`championship/user`, { params: { code } }),
  });

  const { user } = useUserStore((state) => state);
  const { championshipList } = useChampionshipListStore((state) => state);
  const { memberList, setMemberList } = useMemberListStore((state) => state);

  const [inputValue, setInputValue] = useState("#");

  const cleanInputValue = () => {
    setInputValue("#");
  };

  const onChangeInput = (value: string) => {
    if (value.startsWith("#")) {
      setInputValue(value);
    } else {
      setInputValue(`#${value}`);
    }
  };

  const checkAlreadyAdded = (array: MemberList[], code: string) => {
    if (!array?.length) return false;

    if (array?.some((obj) => obj.code === code)) {
      toast.show("warning", t("common:memberAlreadyAdded"));
      return true;
    }

    return false;
  };

  const checkMaxMembers = (array: MemberList[]) => {
    if (!array?.length) return false;

    if (array.length >= 6) {
      toast.show("warning", t("common:maxMemberAlreadyAdded"));
      return true;
    }

    return false;
  };

  const handleAddMember = () => {
    const code = inputValue.replace("#", "");

    const maxMembers = checkMaxMembers(memberList);

    const alreadyAdded = checkAlreadyAdded(memberList, code);

    if (!alreadyAdded && !maxMembers) getUserByCode.mutate(code);
  };

  const handleRemoveList = (code: string) => {
    if (memberList?.length) {
      const newArray = memberList?.filter((member) => member.code !== code);
      setMemberList(newArray);
    }
  };

  useEffect(() => {
    if (getUserByCode.isError) error.dispatch(getUserByCode.error as AxiosError);
    if (getUserByCode.isSuccess && getUserByCode.data) {
      cleanInputValue();
      setMemberList([
        ...(memberList || []),
        { ...getUserByCode.data[0], canRemove: true, isReserve: false, riotId: "", tagline: "" },
      ]);
    }
  }, [getUserByCode.isError, getUserByCode.isSuccess]);

  useEffect(() => {
    if (user?.id && !checkAlreadyAdded(memberList, user?.code)) {
      setMemberList([
        ...(memberList || []),
        {
          id: user?.id,
          name: user?.name,
          code: user?.code,
          canRemove: false,
          isReserve: false,
          riotId: "",
          tagline: "",
        },
      ]);
    }
  }, [user]);

  return (
    <Flex flexDirection="column" width="100%" alignItems="end">
      <Flex gridGap={4} maxWidth="200px" justifyContent="flex-end" alignItems="flex-end" mb={5}>
        <Input
          size="xs"
          rounded="lg"
          maxLength={7}
          name="setc-id"
          methods={methods}
          value={inputValue}
          placeholder="SETC-ID"
          textTransform="uppercase"
          onChange={(value: string) => onChangeInput(value)}
        />

        <Flex>
          <Button
            px={3}
            size="xs"
            onClick={() => handleAddMember()}
            isLoading={getUserByCode.isPending}
            isDisabled={getUserByCode.isPending}
          >
            Adicionar
          </Button>
        </Flex>
      </Flex>

      <Table>
        <Thead>
          <Tr>
            <Th textAlign="center" px={1} width="75px">
              Reserva
            </Th>
            <Th textAlign="start" px={1}>
              Nome
            </Th>
            <Th textAlign="center" px={1} width="100px">
              SETC-ID
            </Th>
            <Th textAlign="center" px={1} width="200px">
              RIOT-ID
            </Th>
            {championshipList.activityId === "7" && (
              <Th textAlign="center" px={1} width="100px">
                Tagline
              </Th>
            )}
            <Th textAlign="center" px={1} width="80px">
              Ações
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {memberList?.map((member) => {
            return <MemberRow key={member.id} member={member} onClickRemove={handleRemoveList} />;
          })}
        </Tbody>
      </Table>
    </Flex>
  );
};
