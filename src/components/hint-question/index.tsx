import { Tooltip } from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa";

interface HintQuestionProps {
  hintText: string;
}

export const HintQuestion: React.FC<HintQuestionProps> = ({ hintText }) => {
  return (
    <Tooltip label={hintText} shouldWrapChildren tabIndex={-1}>
      <FaQuestionCircle />
    </Tooltip>
  );
};
