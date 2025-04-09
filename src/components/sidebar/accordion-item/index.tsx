import { MenuItemProps } from "@/core/types/menu-items";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  FlexProps,
  AccordionButton,
  AccordionIcon,
  Icon,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import NavItem from "@/components/sidebar/nav-item";
import { usePermission } from "@/core/hooks/use-permission";
import { Permissions } from "@/core/enum/permissions";

interface CustomAccordionItemProps extends FlexProps {
  name: string;
  icon?: IconType;
  items: MenuItemProps[];
}

const CustomAccordionItem: React.FC<CustomAccordionItemProps> = ({ name, icon, items }) => {
  const { permission } = usePermission();

  return (
    <Accordion allowMultiple mx={2}>
      <AccordionItem border="none">
        <AccordionButton
          p={4}
          role="group"
          border="none"
          cursor="pointer"
          borderRadius="lg"
          _hover={{ bg: "blue.500", color: "white" }}
        >
          {icon && <Icon mr="4" as={icon} fontSize="16" _groupHover={{ color: "white" }} />}

          <Box as="span" flex="1" textAlign="left">
            {name}
          </Box>

          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel ml={6} py={0}>
          {items.map((item) => {
            const canView =
              (item?.permission && permission.canView(item.permission)) ||
              item?.permission === Permissions.All;

            return (
              canView && (
                <NavItem
                  key={item.name}
                  icon={item.icon}
                  isAccordionChildren
                  link={item.link || "#"}
                >
                  {item.name}
                </NavItem>
              )
            );
          })}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default CustomAccordionItem;
