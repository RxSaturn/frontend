import { Button, ButtonProps } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface LinkButtonProps extends ButtonProps {
  to: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
  children: React.ReactNode | string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ to, children, variant, target, ...restProps }) => {
  return (
    <Link to={to} style={{ display: "flex", alignItems: "center" }} target={target || "_self"}>
      <Button
        colorScheme="blue"
        variant={variant || "link"}
        _focus={{ boxShadow: "none" }}
        {...restProps}
      >
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
