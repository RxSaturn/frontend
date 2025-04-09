import { SETCTeam } from "@/core/types/principal";
import { useTranslate } from "@/core/hooks/use-translate";
import { Flex, Grid, Heading, Text, useBreakpointValue } from "@chakra-ui/react";

interface PrincipalOrganizersProps {
  team: SETCTeam | undefined;
}

export const PrincipalOrganizers: React.FC<PrincipalOrganizersProps> = ({ team }) => {
  const t = useTranslate(["common"]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const order = [
    "Orientador",
    "Presidente",
    "Vice-presidente",
    "Palestras e Minicursos",
    "Jogos e Maratona",
    "Desenvolvimento",
    "Divulgação",
    "Financeiro",
  ];

  let sortedTeam: Record<string, any> = {};

  sortedTeam = team
  ? isMobile
    ? Object.assign(
        {},
        ...order.map((key) => (team[key] ? { [key]: team[key] } : {}))
      )
    : team
  : {};


  return (
    <Flex
      px={4}
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
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        >
          {Object.entries(sortedTeam).map(([role, settings]) => {
            return (
              <Flex
                key={role}
                alignItems="center"
                flexDirection="column"
                gridRow={`span ${settings.span}`}
              >
                <Text fontWeight="bold">{role}</Text>
                {settings.members.map((member : string) => (
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
