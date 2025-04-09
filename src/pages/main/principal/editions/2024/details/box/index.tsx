import { Flex, Text } from "@chakra-ui/react";

type InforBox = {
  title: string;
  number: string;
  children: React.ReactNode;
};

export const InfoBox: React.FC<InforBox> = ({ children, number, title }) => {
  return (
    <Flex
      zIndex={-10}
      width="186px"
      margin="auto"
      height="176px"
      color="blue.500"
      direction="column"
      position="relative"
      alignItems="center"
      borderRadius="10px"
      justifyContent="center"
      boxShadow="8px 8px 12px 0px rgba(0, 0, 0, 0.25)"
    >
      <Flex position="absolute" opacity={0.1}>
        {children}
      </Flex>

      <Text fontSize="70px" fontWeight="medium">
        {number.padStart(2, "0")}
      </Text>

      <Text fontSize="2xl" fontWeight="medium">
        {title}
      </Text>
    </Flex>
  );
};
