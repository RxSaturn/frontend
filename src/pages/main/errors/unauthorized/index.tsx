import { ROUTES } from "@/core/enum/routes";
import { useTranslate } from "@/core/hooks/use-translate";
import Template from "@/layouts/main";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const t = useTranslate(["common"]);

  const [time, setTime] = useState<number>(8);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time > 1) {
        setTime((prev) => prev - 1);
      } else {
        navigate(ROUTES.LOGIN);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  return (
    <Template
      height="inherit"
      alignItems="center"
      justifyContent="center"
      title={t("common:unauthorized")}
    >
      <Flex flexDirection="column" textAlign="center">
        <Heading fontSize="9xl" color="gray">
          401
        </Heading>

        <Text my={3} fontSize="lg" color="gray">
          {t("common:unauthorized")}
        </Text>

        <Text my={6} fontSize="md" color="gray">
          {t("common:you-will-be-redirected-on")} {time}...
        </Text>
      </Flex>
    </Template>
  );
};

export default Unauthorized;
