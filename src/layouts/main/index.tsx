import { useDocumentTitle } from "@/core/hooks/use-document-title";
import { Flex, FlexProps } from "@chakra-ui/react";

import Footer from "./footer";
import Header from "./header";

interface TemplateProps extends FlexProps {
  children: React.ReactNode;
  title?: string;
}

const Template: React.FC<TemplateProps> = ({ children, title, ...props }) => {
  useDocumentTitle(title);

  return (
    <>
      <Header />

      <Flex
        overflowY="auto"
        flexDirection="column"
        scrollBehavior="smooth"
        height="calc(100vh - 72px)"
        justifyContent="space-between"
      >
        <Flex width="100%" flexDirection="column" {...props}>
          {children}
        </Flex>

        <Footer />
      </Flex>
    </>
  );
};

export default Template;
