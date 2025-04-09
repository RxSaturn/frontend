import MenuItems from "./json/menu-items.json";
import Logo from "@/assets/img/setc_logo.webp";
import { Button, Container, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MobileSlide from "./mobile-slide";
import { LinkContainer, RedirectLink } from "./style";
import { ROUTES } from "@/core/enum/routes";
import { useTranslate } from "@/core/hooks/use-translate";

interface MenuItemsType {
  link: string;
  key: string;
}

const Header: React.FC = () => {
  const t = useTranslate(["menu"]);
  const menuItems = MenuItems.items;

  return (
    <Flex
      as="header"
      background="white"
      minHeight="72px"
      bg="linear-gradient(to right,rgba(16,43,175,0.95),rgba(22,100,255,0.95))"
    >
      <Container
        py={3}
        gridGap={4}
        color="white"
        display="flex"
        maxW="container.xl"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link to={ROUTES.PRINCIPAL}>
          <Image src={Logo} alt={t("common:external-link-image-alt") || ""} />
        </Link>

        <Flex gridGap={{ base: 4, lg: 8 }} display={{ base: "none", md: "flex" }} minHeight="38px">
          {menuItems?.map((item: MenuItemsType) => {
            if (item?.link.startsWith("/")) {
              return (
                <RedirectLink key={item.key} to={`${item.link}`}>
                  <Button colorScheme="white" variant="link" size="sm">
                    {t(`menu:${item.key}`)}
                  </Button>
                </RedirectLink>
              );
            } else {
              return (
                <LinkContainer key={item.key} to={`/${item?.link}`} preventScrollReset={true}>
                  <Button colorScheme="white" variant="link" size="sm">
                    {t(`menu:${item.key}`)}
                  </Button>
                </LinkContainer>
              );
            }
          })}
        </Flex>

        <Flex gridGap={4}>
          <Link to={ROUTES.LOGIN}>
            <Button
              size="sm"
              color="white"
              variant="outline"
              _hover={{ color: "#1A202C", background: "gray.100" }}
            >
              {t("common:login")}
            </Button>
          </Link>

          <MobileSlide />
        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
