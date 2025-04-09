import LinkButton from "@/components/buttons/link-button";
import { ROUTES } from "@/core/enum/routes";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { Container } from "./style";
import { FaCalendar } from "react-icons/fa";
import { PRINCIPAL_FULL_NAME } from "@/core/constants";
import { Countdown } from "@/components/countdown";

export const PrincipalHeader: React.FC = () => (
  <Container
    minHeight="500px"
    direction="column"
    borderBottomLeftRadius={{ base: "0", md: "250px" }}
  >
    <Flex
      px={8}
      margin="0 auto"
      mb={8}
      maxWidth="1140px"
      justifyContent={{ base: "center", lg: "center" }}
    >
      <Flex
        gridGap={4}
        minHeight="372px"
        direction="column"
        justifyContent="center"
        minWidth={{ base: 0, lg: "500px" }}
        alignItems={{ base: "center", lg: "center" }}
      >
        <Flex alignItems="center" direction="column" justifyContent="center" textColor="white">
          <Heading size="4xl" fontWeight="medium">
            SETC
          </Heading>

          <Text my={10} fontSize="2xl">
            {PRINCIPAL_FULL_NAME}
          </Text>
        </Flex>

        <Countdown />
        
        <LinkButton
          color="white"
          variant="outline"
          to={ROUTES.REGISTER}
          _hover={{ color: "#1664ff", background: "white" }}
        >
          <Text textTransform="uppercase">Inscreva-se</Text>
        </LinkButton>
      </Flex>
    </Flex>
  </Container>
);
