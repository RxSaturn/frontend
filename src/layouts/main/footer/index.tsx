import { Header } from "@/components/header";
import {
  FACEBOOK_LINK,
  FOOTER_ADDRESS,
  PRINCIPAL_FULL_NAME,
  INSTAGRAM_LINK,
  SETC_WHATSAPP,
  SETC_INSTAGRAM,
  SETC_EMAIL,
} from "@/core/constants";
import { useTranslate } from "@/core/hooks/use-translate";
import { Link as BaseLink, Container, Flex, Grid, Text } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

declare const APP_VERSION: string;

const Footer: React.FC = () => {
  const t = useTranslate(["common"]);

  const now = new Date();
  const year = now.getFullYear();

  return (
    <Flex
      as="footer"
      color="white"
      bg="linear-gradient(to right,rgba(16,43,175,0.95),rgba(22,100,255,0.95))"
    >
      <Container
        px={{ base: 0, md: 10 }}
        display="flex"
        maxWidth="100%"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Grid
          p={6}
          maxWidth="100%"
          gap={{ base: "20px", md: "20px" }}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        >
          <Flex gridGap={2} flexDirection="column">
            <Header text="Links" />

            <Flex direction="column" gridGap={1}>
              <Link to="/login">Login</Link>
              <Link to="/register">{t("common:register")}</Link>
              <Link to="/validar">{t("menu:validate-certificate")}</Link>
            </Flex>
          </Flex>

          <Flex flexDirection="column">
            <Header text={t("common:social-media")} />

            <Flex gridGap={6}>
              <BaseLink isExternal href={FACEBOOK_LINK}>
                <Flex
                  width="50px"
                  height="50px"
                  borderRadius="50%"
                  background="white"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FaFacebookF size="24px" color="var(--colors-blue-500)" />
                </Flex>
              </BaseLink>

              <BaseLink isExternal href={INSTAGRAM_LINK}>
                <Flex
                  width="50px"
                  height="50px"
                  borderRadius="50%"
                  background="white"
                  alignItems="center"
                  justifyContent="center"
                >
                  <BsInstagram size="24px" color="var(--colors-blue-500)" />
                </Flex>
              </BaseLink>
            </Flex>
          </Flex>

          <Flex direction="column" pr={{ base: 0, md: 7 }}>
            <Header text={t("common:localization")} />

            <Text fontSize="sm" textAlign={{ base: "center", md: "start" }}>
              {FOOTER_ADDRESS}
            </Text>
          </Flex>

          <Flex direction="column">
            <Header text={t("common:contact")} />

            <Flex gridGap={2} flexDirection="column" mt={{ base: 6, md: 0 }}>
              <Flex gridGap={3} alignItems="center">
                <Link to={`https://api.whatsapp.com/send?phone=5537998050430`} target="_blank">
                  <FaWhatsapp fontSize="16px" />
                </Link>{" "}
                <Text fontSize="sm" lineHeight="16px">
                  {SETC_WHATSAPP}
                </Text>
              </Flex>

              <Flex gridGap={3} alignItems="center">
                <Link to={INSTAGRAM_LINK} target="_blank">
                  <FaInstagram fontSize="16px" />
                </Link>{" "}
                <Text fontSize="sm" lineHeight="16px">
                  {SETC_INSTAGRAM}
                </Text>
              </Flex>

              <Flex gridGap={3} alignItems="center">
                <FiMail fontSize="16px" />
                <Text fontSize="sm" lineHeight="16px">
                  {SETC_EMAIL}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Grid>

        <hr />

        <Flex alignItems="center" justifyContent="center" py={4}>
          <Text textAlign="center">
            &copy; {year} {PRINCIPAL_FULL_NAME}. v{APP_VERSION}
          </Text>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Footer;
