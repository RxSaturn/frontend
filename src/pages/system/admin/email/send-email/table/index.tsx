import { useTranslate } from "@/core/hooks/use-translate";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { TableRow } from "./row";
import { User } from "@/core/types/user";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useToast } from "@/core/hooks/use-toast";
import { useAxios } from "@/core/hooks/use-axios";
import { useError } from "@/core/hooks/use-error";
import { transformObjectInFormData } from "@/core/helpers";

interface SendEmailTableProps {
  users: User[] | undefined;
}

export const SendEmailTable: React.FC<SendEmailTableProps> = ({ users }) => {
  const toast = useToast();
  const { axios } = useAxios();
  const { error } = useError();
  const t = useTranslate(["common"]);

  const sendEmailQuery = useMutation({
    mutationKey: ["post-send-email"],
    mutationFn: (formdata: FormData) => axios.postFn<string>(`send-email`, formdata),
  });

  const handleSendButton = (email: string, name: string) => {
    const data = { email, name };

    const formdata = transformObjectInFormData(data);

    sendEmailQuery.mutate(formdata);
  };

  useEffect(() => {
    if (sendEmailQuery.isError) error.dispatch(sendEmailQuery.error as AxiosError);
    if (sendEmailQuery.isSuccess) {
      toast.show("success", sendEmailQuery.data);
    }
  }, [sendEmailQuery.isError, sendEmailQuery.isSuccess]);

  return (
    <Table mt={7} variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th></Th>
          <Th>ID</Th>
          <Th>{t("common:name")}</Th>
          <Th>{t("common:email")}</Th>
          <Th>{t("common:send")}</Th>
        </Tr>
      </Thead>

      <Tbody>
        {users?.map((item, index) => {
          return (
            <TableRow
              key={index}
              user={item}
              index={index}
              onClick={handleSendButton}
              isLoading={sendEmailQuery.isPending}
            />
          );
        })}
      </Tbody>
    </Table>
  );
};
