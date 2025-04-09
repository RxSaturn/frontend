import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface NavItemProps extends FlexProps {
  link: string;
  icon?: IconType;
  children: React.ReactNode;
  isAccordionChildren?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  link,
  children,
  isAccordionChildren,
  ...rest
}) => {
  return (
    <Link to={link}>
      <Flex
        role="group"
        align="center"
        cursor="pointer"
        borderRadius="lg"
        p={isAccordionChildren ? 2 : 4}
        mx={isAccordionChildren ? 0 : 2}
        _hover={{ bg: "blue.500", color: "white" }}
        {...rest}
      >
        {icon && <Icon mr="4" as={icon} fontSize="16" _groupHover={{ color: "white" }} />}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
