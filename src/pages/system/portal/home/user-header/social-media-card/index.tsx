import { FACEBOOK_LINK, INSTAGRAM_LINK } from "@/core/constants";
import { useTranslate } from "@/core/hooks/use-translate";
import { Flex, Heading, Link } from "@chakra-ui/react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const SocialMediaCard: React.FC = () => {
  const t = useTranslate(["common"]);

  return (
    <Flex
      bg="white"
      padding={3}
      boxShadow="lg"
      height="200px"
      borderRadius="10px"
      flexDirection="column"
    >
      <Flex
        gridGap={6}
        height="100%"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading fontSize="2xl" textAlign="center">
          {t("common:follow-social-networks")}!
        </Heading>

        <Flex gridGap={6}>
          <Link isExternal href={FACEBOOK_LINK}>
            <FaFacebookF size="24px" color="#1877F2" />
          </Link>

          <Link isExternal href={INSTAGRAM_LINK}>
            <FaInstagram size="24px" color="#E4405F" />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SocialMediaCard;
