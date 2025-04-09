import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import TSHIRT from "@/assets/img/tshirt.jpg";
import { useTranslate } from "@/core/hooks/use-translate";
import { BsPatchCheck } from "react-icons/bs";

export const PrincipalBenefits: React.FC = () => {
  const t = useTranslate(["common"]);

  return (
    <Flex
      px={8}
      as="section"
      width="100%"
      id="benefits"
      margin="24px auto"
      maxWidth="1320px"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      gridGap={12}
    >
      <Heading fontWeight="medium" textAlign={{ base: "center", md: "start" }}>
        {t("common:benefits")}
      </Heading>

      <Flex
        maxWidth="900px"
        alignItems="center"
        justifyContent="space-between"
        gridGap={{ base: 0, md: 4, lg: 8 }}
      >
        <Flex flexDirection="column">
          <Text textAlign="justify">{t("common:benefits-text-one")}</Text>
          <Text textAlign="justify" mt={6}>
            {t("common:benefits-text-two")}
          </Text>
          <Text textAlign="justify" mt={6}>
            {t("common:benefits-text-three")}
          </Text>
        </Flex>

        <Box>
          <Image
            p={1}
            src={TSHIRT}
            alt="T-Shirt"
            maxWidth="280px"
            display={{ base: "none", md: "inline" }}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
