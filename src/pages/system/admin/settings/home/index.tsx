import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Flex, Heading } from "@chakra-ui/react";

export const SettingsHomePage: React.FC = () => {
  const t = useTranslate(["common", "permissions", "validation"]);

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("permissions:settings-home")}</Heading>
        </HeaderPanel>

        <BodyPanel>
          <h1>Home</h1>
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
