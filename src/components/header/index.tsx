import { Text, TextProps } from "@chakra-ui/react";
import { Container } from "./style";

type Header = TextProps & {
  text: string;
};

export const Header: React.FC<Header> = ({ text, fontSize, ...restProps }) => {
  return (
    <Container mb={2}>
      <Text fontSize={fontSize ?? "2xl"} fontWeight="medium" {...restProps}>
        {text}
      </Text>
      <hr />
    </Container>
  );
};
