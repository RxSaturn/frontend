import { Flex } from "@chakra-ui/react";

interface HeaderProps {
  children: React.ReactNode;
}

const HeaderPanel: React.FC<HeaderProps> = ({ children }) => {
  return (
    <Flex
      h="150px"
      width="100%"
      color="white"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      className="hide-on-print"
      bg="linear-gradient(to right,rgba(16,43,175,0.95),rgba(22,100,255,0.95))"
    >
      {children}
    </Flex>
  );
};

export default HeaderPanel;
