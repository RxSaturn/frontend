import { ActivityUsers, EventUsers } from "@/core/types/activity";
import { useTranslate } from "@/core/hooks/use-translate";
import { Avatar, AvatarBadge, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { ImFire } from "react-icons/im";

interface AccreditationListRowProps {
  isLoading: boolean;
  data: EventUsers;
  onClickConfirm: (id: string) => void;
  onClickRemove: (id: string) => void;
}

export const AccreditationListRow: React.FC<AccreditationListRowProps> = ({
  data,
  isLoading,
  onClickConfirm,
  onClickRemove,
}) => {
  const t = useTranslate(["common"]);

  const isAccredited = data.accredited === "1";

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
        {isAccredited ? (
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
          <Avatar name={data.name} color="white">
            {data?.prevEventParticipated === "1" && (
              <AvatarBadge boxSize="1.25em" bg="white">
                <Tooltip label="Participante do Esquenta SETC" shouldWrapChildren hasArrow>
                  <ImFire color="var(--colors-blue-500)" fontSize="16px" />
                </Tooltip>
              </AvatarBadge>
            )}
          </Avatar>
        )}

        <Flex flexDirection="column" maxWidth="calc(100vw - 150px)">
          <Text fontWeight="bold" color="gray.800">
            {data.name}
          </Text>

          <Text color="gray.800" noOfLines={1}>
            Camiseta: {data.tshirtSize}
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
        {isAccredited ? (
          <Button
            size="sm"
            width="95px"
            colorScheme="red"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={() => onClickRemove(data.id)}
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
            onClick={() => onClickConfirm(data.id)}
          >
            {t("common:confirm")}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
