import {
  IconButton,
  IconButtonProps,
  Tooltip
} from "@chakra-ui/react";

import { IconType } from "react-icons";

export type ToggleIconOptions = {
  offIcon: IconType,
  onIcon: IconType
}

export interface ToggleSensitiveContentProps extends IconButtonProps {
  tooltip?: string;
  icons: ToggleIconOptions;
  mode: string;
}

const ToggleSensitiveContent: React.FC<ToggleSensitiveContentProps> = ({ tooltip, mode, icons, ...rest }) => {
  return (
    <Tooltip label={tooltip ? tooltip : "Clique para exibir o conteúdo"} hasArrow>
      <IconButton
        icon={mode === "password" ? <icons.onIcon /> : <icons.offIcon />}
        {...rest}
      />
    </Tooltip>
  );
}

export default ToggleSensitiveContent;