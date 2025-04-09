import { ActivityUsers } from "@/core/types/activity";
import { useTranslate } from "@/core/hooks/use-translate";
import { Avatar, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

interface ListRowProps {
  isLoading: boolean;
  data: ActivityUsers;
  onClickConfirm: (id: string, teamId: string) => void;
  onClickRemove: (id: string, teamId: string) => void;
}

export const ListRow: React.FC<ListRowProps> = ({
  isLoading,
  data,
  onClickConfirm,
  onClickRemove,
}) => {
  const t = useTranslate(["common"]);

  const isParticipated = data.participated === "1";

  return (
    <Flex
      p={3}
      gridGap={2}
      rounded="xl"
      boxShadow="lg"
      flexWrap="wrap"
      border="1px solid"
      alignItems="center"
      borderColor="gray.100"
      justifyContent="space-between"
    >
      <Flex gridGap={3}>
        {isParticipated ? (
          <Flex
            width="48px"
            height="48px"
            rounded="full"
            alignItems="center"
            justifyContent="center"
            backgroundColor="green"
          >
            <FaCheck color="white" />
          </Flex>
        ) : (
          <Avatar name={data.name} color="white" />
        )}

        <Flex flexDirection="column" maxWidth="calc(100vw - 150px)">
          <Text fontWeight="bold" color="gray.800">
            {data.name}
          </Text>

          <Text color="gray.500" noOfLines={1}>
            {data.teamName ? data.teamName : data.email}
          </Text>
        </Flex>
      </Flex>

      <Flex
        gridGap={2}
        flexDirection="column"
        justifyContent="center"
        width={{ base: "100%", md: "auto" }}
        alignItems={{ base: "center", md: "end" }}
      >
        {isParticipated ? (
          <Button
            size="sm"
            width="95px"
            colorScheme="red"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={() => onClickRemove(data.id, data?.teamId)}
          >
            {t("common:remove")}
          </Button>
        ) : (
          <Button
            size="sm"
            width="95px"
            colorScheme="green"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={() => onClickConfirm(data.id, data?.teamId)}
          >
            {t("common:confirm")}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
