import { Spinner as BaseSpinner, SpinnerProps as BaseSpinnerProps } from "@chakra-ui/react";

interface SpinnerProps extends BaseSpinnerProps {}

export const Spinner: React.FC<SpinnerProps> = ({ ...restProps }) => {
  return (
    <BaseSpinner
      size="xl"
      speed="0.65s"
      thickness="4px"
      color="blue.500"
      emptyColor="gray.200"
      {...restProps}
    />
  );
};
