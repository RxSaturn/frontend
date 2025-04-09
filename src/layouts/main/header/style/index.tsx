import { Slide, SlideProps } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HashLink, HashLinkProps } from "react-router-hash-link";
import styled from "styled-components";

/* @ts-expect-error Server Component */
export const MobileContainer = styled(HashLink)<HashLinkProps>``;
/* @ts-expect-error Server Component */
export const LinkContainer = styled(HashLink)<HashLinkProps>`
  border-bottom: 2px solid transparent;

  :hover {
    border-radius: 0;
    text-decoration: none !important;
    border-bottom: 2px solid white;
    background-color: transparent;
  }

  button {
    padding: 8px;

    :hover {
      text-decoration: none !important;
    }
  }
`;

export const SlideContainer = styled(Slide)<SlideProps>`
  height: 100vh;
  display: flex;
  padding: 20px;
  color: black;
  background: white;
  width: 50% !important;
  flex-direction: column;
  box-shadow:
    0px 4px 6px -2px rgb(0 0 0 / 5%),
    0px 10px 15px -3px rgb(0 0 0 / 10%);
`;

export const RedirectLink = styled(Link)`
  border-bottom: 2px solid transparent;

  :hover {
    border-radius: 0;
    text-decoration: none !important;
    border-bottom: 2px solid white;
    background-color: transparent;
  }

  button {
    padding: 8px;

    :hover {
      text-decoration: none !important;
    }
  }
`;
