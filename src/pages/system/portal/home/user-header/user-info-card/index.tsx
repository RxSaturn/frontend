import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react";

import { ROUTES } from "@/core/enum/routes";
import { useUserStore } from "@/core/stores/user";
import { Spinner } from "@/components/loaders/spinner";
import LinkButton from "@/components/buttons/link-button";
import { useTranslate } from "@/core/hooks/use-translate";

type UserInfoCardProps = {
  isLoading: boolean;
};

const UserInfoCard: React.FC<UserInfoCardProps> = ({ isLoading }) => {
  const t = useTranslate(["common"]);
  const { user } = useUserStore((state) => state);

  return (
    <Flex
      bg="white"
      padding={3}
      boxShadow="lg"
      height="200px"
      borderRadius="10px"
      flexDirection="column"
    >
      {isLoading && user ? (
        <Flex alignItems="center" justifyContent="center" height="inherit">
          <Spinner />
        </Flex>
      ) : (
        <Flex flexDirection="column" justifyContent="space-between" height="100%">
          <Flex gridGap={2} alignItems="center">
            <Avatar bg="blue.500" color="white" size="md" name={user?.name} />

            <Flex flexDirection="column">
              <Text fontWeight="bold" fontSize="lg">
                {user?.name}
              </Text>

              <Text color="gray.400" fontSize="md">
                {user?.email}
              </Text>
            </Flex>
          </Flex>

          <Flex>
            <Text mr={2}>SETC-ID:</Text>
            <Badge
              px={2}
              py={0.5}
              display="flex"
              borderRadius="6px"
              colorScheme="blue"
              alignItems="center"
            >
              #{user?.code}
            </Badge>
          </Flex>

          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Badge px={2} py={0.5} borderRadius="6px" colorScheme="green">
                {user?.role_name}
              </Badge>
            </Box>

            <LinkButton to={ROUTES.PROFILE} size="md" variant="solid">
              {t("common:edit-profile")}
            </LinkButton>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default UserInfoCard;
