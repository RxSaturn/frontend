import { Flex, FlexProps } from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled(Flex)<FlexProps>`
  background: linear-gradient(to right, rgba(16, 43, 175, 0.95), rgba(22, 100, 255, 0.95));
  padding: 5rem 0 0 0;
  width: 100%;
  height: 100%;

  svg.background-effect {
    height: calc(100vw / 4.5);
    max-height: 250px;
    width: 100%;
  }
`;
