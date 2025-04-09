import { useTranslate } from "@/core/hooks/use-translate";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  route: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ route }) => {
  const navigate = useNavigate();
  const t = useTranslate(["common"]);

  const handleBackButton = () => {
    navigate(route);
  };

  return (
    <Tooltip label={t("common:back")} shouldWrapChildren>
      <IconButton
        variant="outline"
        colorScheme="blue"
        isDisabled={false}
        icon={<BiArrowBack />}
        aria-label={t("common:back")}
        onClick={() => handleBackButton()}
      />
    </Tooltip>
  );
};
