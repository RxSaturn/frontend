import { Flex, FlexProps } from "@chakra-ui/react";

interface BodyPanelProps extends FlexProps {
  children: React.ReactNode;
}

const BodyPanel: React.FC<BodyPanelProps> = ({ children, ...restProps }) => {
  return (
    <Flex flexDirection="column" width="100%" padding={5} {...restProps}>
      {children}
    </Flex>
  );
};

export default BodyPanel;
