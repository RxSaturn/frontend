import { User } from "@/core/types/user";
import { useTranslate } from "@/core/hooks/use-translate";
import { IconButton, Td, Tr } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";

type TableRowProps = {
  user: User;
  index: number;
  isLoading: boolean;
  onClick: (email: string, name: string) => void;
};

export const TableRow = ({ user, index, onClick, isLoading }: TableRowProps) => {
  const t = useTranslate(["common"]);

  return (
    <Tr>
      <Td>{index + 1}</Td>
      <Td>{user.id}</Td>
      <Td>{user.name}</Td>
      <Td>{user.email}</Td>
      <Td>
        <IconButton
          variant="ghost"
          icon={<FiSend />}
          isLoading={isLoading}
          isDisabled={isLoading}
          aria-label={t("common:send")}
          onClick={() => onClick(user.email, user.name)}
        />
      </Td>
    </Tr>
  );
};
