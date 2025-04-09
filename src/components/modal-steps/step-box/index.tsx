import { Flex } from "@chakra-ui/react";

interface StepBoxProps {
  index: number;
  currentStep: number;
}

export const StepBox: React.FC<StepBoxProps> = ({ index, currentStep }) => {
  const active = index === currentStep;
  const finished = index < currentStep;
  const activeColor = active ? "#1664ff" : "gray.300";
  const finishedColor = finished ? "#25D366" : "gray.300";

  const color = active ? activeColor : finishedColor;

  return (
    <Flex
      height="8px"
      background={color}
      width={active ? "20px" : "8px"}
      rounded={active ? "4px" : "50%"}
    />
  );
};
