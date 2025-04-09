import { Flex, FlexProps, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { ImFire } from "react-icons/im";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      ml={{ base: 0, lg: 60 }}
      px={{ base: 4, lg: 24 }}
      className="hide-on-print"
      justifyContent="flex-start"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      {...rest}
    >
      <IconButton onClick={onOpen} icon={<FiMenu />} variant="outline" aria-label="open menu" />

      <Flex alignItems="center" ml={5} gridGap={3}>
        <Text fontSize="2xl" color="blue.500" fontWeight="bold" fontFamily="monospace">
          SETC
        </Text>
      </Flex>
    </Flex>
  );
};

export default MobileNav;
