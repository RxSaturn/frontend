import { MemberList } from "@/core/types/member-list";
import { updateObjectById } from "@/core/helpers";
import { useTranslate } from "@/core/hooks/use-translate";
import { useChampionshipListStore } from "@/core/stores/championship-list";
import { useMemberListStore } from "@/core/stores/member-list";
import {
  Box,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Td,
  Text,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { MdClose } from "react-icons/md";

interface MemberRowProps {
  member: MemberList;
  onClickRemove: (code: string) => void;
}

export const MemberRow: React.FC<MemberRowProps> = ({ member, onClickRemove }) => {
  const t = useTranslate(["common"]);

  const { championshipList } = useChampionshipListStore((state) => state);
  const { memberList, setMemberList } = useMemberListStore((state) => state);

  const [inputValue, setInputValue] = useState("Clique para editar");
  const [taglineInputValue, setTaglineInputValue] = useState("#");

  const memberListHasReserve = memberList.filter((member) => member?.isReserve === true);

  const onChangeInput = (value: string) => {
    if (!value) {
      setInputValue("Clique para editar");
    } else {
      setInputValue(`${value}`);
    }
  };

  const handleBlurInput = (id: string) => {
    const inputValueFormated = inputValue.replace("#", "");
    const newMemberList = updateObjectById(memberList, id, "riotId", inputValueFormated);
    setMemberList(newMemberList);
  };

  const onChangeTaglineInput = (value: string) => {
    if (value.startsWith("#")) {
      setTaglineInputValue(value);
    } else {
      setTaglineInputValue(`#${value}`);
    }
  };

  const handleBlurTaglineInput = (id: string) => {
    const inputValueFormated = inputValue.replace("#", "");
    const newMemberList = updateObjectById(memberList, id, "tagline", inputValueFormated);
    setMemberList(newMemberList);
  };

  const handleChangeReserve = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const newMemberList = updateObjectById(memberList, id, "isReserve", e.target.checked);

    setMemberList(newMemberList);
  };

  return (
    <Tr height="50px">
      <Td p={1}>
        <Text textAlign="start" fontSize="sm">
          {member.name}
        </Text>
      </Td>

      <Td p={2}>
        <Text textAlign="center" fontSize="sm">
          {`#${member.code}`}
        </Text>
      </Td>

      <Td p={2} textAlign="center">
        <Tooltip label={t("common:remove")} shouldWrapChildren>
          <Box cursor="pointer">
            {member.canRemove && (
              <MdClose fontSize="16px" onClick={() => onClickRemove(member.code)} />
            )}
          </Box>
        </Tooltip>
      </Td>
    </Tr>
  );
};
