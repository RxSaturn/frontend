import { Flex, FlexProps } from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled.label`
  position: relative;

  @media screen and (max-width: 48em) {
    width: 100%;
  }

  input:checked + .check-wrapper {
    border: 4px solid #1664ff;

    > .check {
      background-color: #1664ff;
    }
  }

  input:checked + .check-wrapper > .check::before {
    top: 3px;
    content: "-";
    width: 12px;
    height: 12px;
    margin: auto;
    background: white;
    clip-path: polygon(14% 44%, 0px 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  .check-wrapper {
    border: 4px solid transparent;

    .check {
      top: 6px;
      right: 6px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
`;
