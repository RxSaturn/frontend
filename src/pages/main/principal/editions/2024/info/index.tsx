import { useTranslate } from "@/core/hooks/use-translate";
import { Flex, Heading, Text } from "@chakra-ui/react";

export const PrincipalInfo: React.FC = () => {
  const t = useTranslate(["common"]);

  return (
    <Flex
      px={8}
      id="info"
      as="section"
      width="100%"
      maxWidth="1320px"
      margin="24px auto"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      gridGap={{ base: 6, md: 6 }}
    >
      <Heading fontWeight="medium">{t("common:informations")}</Heading>

      <Text textAlign={{ base: "justify", md: "center" }}>{t("common:information-text")}</Text>

      <Flex width="100%" maxWidth="1320px">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4207.36723851796!2d-46.007266311109476!3d-20.0362793032927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b3e93b6265b15b%3A0x5c7e8f490ffc60b6!2sIFMG%20Campus%20Bambu%C3%AD!5e0!3m2!1spt-BR!2sbr!4v1594345463710!5m2!1spt-BR!2sbr"
          width="100%"
          height="300"
          aria-hidden="false"
          style={{ border: 0 }}
          allowFullScreen={false}
        />
      </Flex>
    </Flex>
  );
};
