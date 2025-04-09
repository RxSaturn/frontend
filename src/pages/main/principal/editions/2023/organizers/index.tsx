import { SETCTeam } from "@/core/types/principal";
import { useTranslate } from "@/core/hooks/use-translate";
import { Flex, Grid, Heading, Text } from "@chakra-ui/react";

interface PrincipalOrganizersProps {
  team: SETCTeam | undefined;
}

export const PrincipalOrganizers: React.FC<PrincipalOrganizersProps> = ({ team }) => {
  const t = useTranslate(["common"]);

  return (
    <Flex
      px={8}
      as="section"
      width="100%"
      id="organizers"
      maxWidth="1320px"
      margin="16px auto"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      gridGap={{ base: 6, md: 10 }}
    >
      <Heading fontWeight="medium">{t("common:organizers")}</Heading>

      {team && (
        <Grid
          gridGap={1}
          width="100%"
          templateRows="repeat(22, 25px)"
          templateColumns="repeat(2, 1fr)"
        >
          {Object.entries(team).map(([role, settings]) => {
            return (
              <Flex
                key={role}
                alignItems="center"
                flexDirection="column"
                gridRow={`span ${settings.span}`}
                gridColumn={{ base: "span 2", md: `span ${settings.column}` }}
              >
                <Text fontWeight="bold">{role}</Text>
                {settings.members.map((member) => (
                  <Text key={member} textAlign="center">
                    {member}
                  </Text>
                ))}
              </Flex>
            );
          })}
        </Grid>
      )}
    </Flex>
  );
};
