import { MenuItemProps } from "@/core/types/menu-items";
import { Box, BoxProps, CloseButton, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import NavItem from "../nav-item";
import { usePermission } from "@/core/hooks/use-permission";
import { Permissions } from "@/core/enum/permissions";
import CustomAccordionItem from "../accordion-item";
import { useAuthStore } from "@/core/stores/auth";
import { Link } from "react-router-dom";
import { ROUTES } from "@/core/enum/routes";
import { useTranslate } from "@/core/hooks/use-translate";

declare const APP_VERSION: string;

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
  linkItems: MenuItemProps[];
}

const SidebarContent: React.FC<SidebarContentProps> = ({ onClose, linkItems, ...rest }) => {
  const t = useTranslate(["common"]);
  const { permission } = usePermission();
  const { authData } = useAuthStore((state) => state);

  return (
    <Flex
      h="full"
      pos="fixed"
      borderRight="1px"
      flexDirection="column"
      justifyContent="space-between"
      w={{ base: "full", md: "270px" }}
      bg={useColorModeValue("white", "gray.900")}
      alignItems={{ base: "center", md: "flex-start" }}
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      {...rest}
    >
      <Box className="hide-on-print" w={{ base: "full" }}>
        <Flex h="20" alignItems="center" ml="8" justifyContent="space-between">
          <Link to={ROUTES.PRINCIPAL}>
            <Text
              gridGap={3}
              fontSize="2xl"
              display="flex"
              color="blue.500"
              fontWeight="bold"
              alignItems="center"
              fontFamily="monospace"
            >
              SETC
            </Text>
          </Link>

          <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
        </Flex>

        <Box overflow="auto" height="calc(100vh - 125px)">
          {linkItems.map((item, index) => {
            const registeredEvent = item.registeredEvent ? authData.registeredEvent : true;
            const canView =
              (item?.permission && permission.canView(item.permission) && registeredEvent) ||
              (item?.permission === Permissions.All && registeredEvent);

            return canView && !!item.items?.length ? (
              <CustomAccordionItem
                name={item.name}
                icon={item.icon}
                items={item?.items}
                key={`${item.name}-${index}`}
              />
            ) : (
              canView && (
                <NavItem key={`${item.name}-${index}`} icon={item.icon} link={item.link || "#"}>
                  {item.name}
                </NavItem>
              )
            );
          })}
        </Box>
      </Box>

      <Flex p={3} fontSize="sm" fontWeight="semibold" width="270px" justifyContent="center">
        {t("common:version")}: {APP_VERSION}
      </Flex>
    </Flex>
  );
};

export default SidebarContent;
