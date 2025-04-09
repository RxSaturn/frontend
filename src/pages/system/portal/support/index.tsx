import { useTranslate } from "@/core/hooks/use-translate";
import MenuPanel from "@/layouts/system";
import BodyPanel from "@/layouts/system/body-panel";
import HeaderPanel from "@/layouts/system/header-panel";
import { Flex, Heading } from "@chakra-ui/react";
import { Support } from "@/components-setc/support";
import { useDocumentTitle } from "@/core/hooks/use-document-title";

export const supportPage: React.FC = () => {
  const t = useTranslate(["menu", "common", "validation"]);
  useDocumentTitle(t("menu:support"));

  return (
    <MenuPanel>
      <Flex alignItems="center" flexDirection="column" justifyContent="center">
        <HeaderPanel>
          <Heading>{t("menu:support")}</Heading>
        </HeaderPanel>

        <BodyPanel alignItems="center" justifyContent="center" mt={7}>
          <Support />
        </BodyPanel>
      </Flex>
    </MenuPanel>
  );
};
