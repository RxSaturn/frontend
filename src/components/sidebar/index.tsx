import React from "react";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import MobileNav from "./mobile-nav";
import SidebarContent from "./sidebar-content";
import { MenuItemProps } from "@/core/types/menu-items";

interface SidebarProps {
  children: React.ReactNode;
  linkItems: MenuItemProps[];
}

const Sidebar: React.FC<SidebarProps> = ({ linkItems, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <SidebarContent
        linkItems={linkItems}
        onClose={() => onClose}
        display={{ base: "none", lg: "flex" }}
      />

      <Drawer
        size="full"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        autoFocus={false}
        onOverlayClick={onClose}
        returnFocusOnClose={false}
      >
        <DrawerContent className="hide-on-print">
          <SidebarContent linkItems={linkItems} onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: "flex", lg: "none" }} onOpen={onOpen} />

      <Box ml={{ base: 0, lg: "270px" }}>{children}</Box>
    </Box>
  );
};

export default Sidebar;
