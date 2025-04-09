import { Flex, Grid, Heading, Image, Link, Text } from "@chakra-ui/react";
import Event from "@/assets/img/header.webp";
import IFMG from "@/assets/img/ifmg.webp";
import { useTranslate } from "@/core/hooks/use-translate";
import { PORTAL_LINK } from "@/core/constants";
import { InfoBox } from "./box";
import { FaJournalWhills, FaLaptopCode, FaTrophy, FaUsers } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";
import { MdTableBar } from "react-icons/md";

export const PrincipalDetails: React.FC = () => {
  const t = useTranslate(["common"]);

  return (
    <Flex
      px={8}
      id="event"
      as="section"
      width="100%"
      maxWidth="1320px"
      margin="24px auto"
      direction="column"
    >
      <Flex alignItems="center" justifyContent="center" gridGap={{ base: 0, md: 12 }}>
        <Image
          src={Event}
          maxWidth="450px"
          alt="Sobre o evento"
          display={{ base: "none", lg: "inline" }}
        />

        <Flex flexDirection="column" maxWidth="650px" gridGap={4}>
          <Heading fontWeight="medium" textAlign={{ base: "justify", md: "justify" }}>
            {t("common:about-event")}
          </Heading>

          <Text textAlign={{ base: "justify", md: "justify" }}>
            {t("common:about-event-text-one")}
          </Text>
          <Text textAlign={{ base: "justify", md: "justify" }}>
            {t("common:about-event-text-two")}
          </Text>
          <Text textAlign={{ base: "justify", md: "justify" }}>
            {t("common:about-event-text-three")}
          </Text>
        </Flex>

        <Link isExternal href={PORTAL_LINK}>
          <Image
            p={1}
            src={IFMG}
            maxWidth="150px"
            alt="Logo do IFMG"
            background="white"
            borderRadius="4px"
            border="1px solid #DEE2E6"
            display={{ base: "none", md: "inline", lg: "none", xl: "inline" }}
          />
        </Link>
      </Flex>
    </Flex>
  );
};
