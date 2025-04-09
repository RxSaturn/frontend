import LinkButton from "@/components/buttons/link-button";
import { ROUTES } from "@/core/enum/routes";
import { Flex, Image, Text } from "@chakra-ui/react";
import { Container } from "./style";
import HeaderImg from "@/assets/img/esq_setc_logo_fogo.webp";
import { FaCalendar } from "react-icons/fa";
import { Countdown } from "@/components/countdown";

interface PrincipalHeaderProps {
  enrollmentActive: boolean;
}

export const PrincipalHeader: React.FC<PrincipalHeaderProps> = ({ enrollmentActive }) => (
  <Container as="section" minHeight="1000px" flexDirection="column">
    <Flex
      px={8}
      margin="0 auto"
      maxWidth="1140px"
      justifyContent={{ base: "center", lg: "center" }}
    >
      <Flex
        gridGap={4}
        minHeight="372px"
        flexDirection="column"
        justifyContent="center"
        minWidth={{ base: 0, lg: "500px" }}
        alignItems={{ base: "center", lg: "center" }}
      >
        <Flex
          width="100%"
          position="relative"
          alignItems="center"
          justifyContent="center"
          display={{ base: "flex", lg: "flex" }}
        >
          <Countdown />
        </Flex>

        {enrollmentActive && (
          <LinkButton
            mt={2}
            color="white"
            variant="outline"
            to={ROUTES.REGISTER}
            _hover={{ color: "#1664ff", background: "white" }}
          >
            <FaCalendar fontSize="20px" />
            <Text ml={3} textTransform="uppercase">
              Quero participar
            </Text>
          </LinkButton>
        )}
      </Flex>
    </Flex>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 1440 310"
      className="background-effect"
    >
      <path
        fill="#ffffff"
        fillOpacity="1"
        d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,133.3C672,139,768,213,864,202.7C960,192,1056,96,1152,74.7C1248,53,1344,107,1392,133.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </Container>
);
