import { Button, Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import MenuItems from "../json/menu-items.json";
import { AiOutlineMenu } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";

import { useTranslate } from "@/core/hooks/use-translate";
import { MobileContainer, SlideContainer } from "../style";
import { IMenuItems } from "@/core/types/menu-items";
import { Link } from "react-router-dom";

const MobileSlide: React.FC = () => {
  const t = useTranslate(["common", "menu"]);
  const { isOpen, onToggle } = useDisclosure();

  const menuItems = MenuItems.items;

  return (
    <>
      <IconButton
        size="sm"
        variant="outline"
        onClick={onToggle}
        aria-label={t("common:open-menu")}
        icon={<AiOutlineMenu color="white" size="20px" />}
        display={{ base: "flex", md: "none" }}
        _hover={{ color: "#1A202C", background: "gray.100" }}
      />

      <SlideContainer direction="right" in={isOpen} style={{ zIndex: 10 }}>
        <Flex justifyContent="flex-end">
          <IconButton
            size="sm"
            variant="outline"
            onClick={onToggle}
            aria-label={t("common:open-menu")}
            icon={<RiCloseLine size="20px" />}
          />
        </Flex>

        <Flex gridGap={8} flexDirection="column" alignItems="center">
          {menuItems?.map((item: IMenuItems, index: number) => {
            if (item?.link.startsWith("/")) {
              return (
                <Link key={item.key} to={`${item.link}`}>
                  <Button colorScheme="white" variant="link" size="sm">
                    {t(`menu:${item.key}`)}
                  </Button>
                </Link>
              );
            } else {
              return (
                <MobileContainer key={index} to={`/${item?.link}`}>
                  <Button colorScheme="white" variant="link" size="sm">
                    {t(`menu:${item.key}`)}
                  </Button>
                </MobileContainer>
              );
            }
          })}
        </Flex>
      </SlideContainer>
    </>
  );
};

export default MobileSlide;
