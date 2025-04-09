import { Flex } from "@chakra-ui/react";
import { StepBox } from "./step-box";

interface ModalStepsProps {
  currentStep: number;
  totalSteps: number;
}

export const ModalSteps: React.FC<ModalStepsProps> = ({ currentStep, totalSteps }) => {
  return (
    <Flex gridGap={3}>
      {[...Array(totalSteps)].map((_, index) => {
        return <StepBox key={index} index={index + 1} currentStep={currentStep} />;
      })}
    </Flex>
  );
};
