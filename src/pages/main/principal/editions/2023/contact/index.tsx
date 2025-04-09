import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useTranslate } from "@/core/hooks/use-translate";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import CONTACT from "@/assets/img/contact.png";
import { Link } from "react-router-dom";
import { INSTAGRAM_LINK } from "@/core/constants";
import { Support } from "@/components-setc/support";

export const PrincipalContact: React.FC = () => {
  const t = useTranslate(["common"]);

  return (
    <Flex
      px={8}
      as="section"
      width="100%"
      gridGap={12}
      id="contact"
      maxWidth="1320px"
      margin="24px auto"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Heading fontWeight="medium" textAlign={{ base: "center", md: "start" }}>
        {t("common:contact")}
      </Heading>

      <Support />
    </Flex>
  );
};
