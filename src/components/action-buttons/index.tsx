import { useState } from "react";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { FaEye, FaTrash } from "react-icons/fa";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";

import { useTranslate } from "@/core/hooks/use-translate";
import { AlertDialog } from "@/components-setc/modals/alert-dialog";

type ActionButtonsProps = {
  editLink: string;
  detailsLink?: string;
  onClickDelete: () => void;
};

export const ActionButtons = ({ editLink, detailsLink, onClickDelete }: ActionButtonsProps) => {
  const t = useTranslate(["common"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseButton = () => {
    setIsOpen(false);
  };

  return (
    <Flex gridGap={2} alignItems="center" justifyContent="center">
      {detailsLink && (
        <Tooltip label={t("common:see-details")} shouldWrapChildren>
          <Link to={detailsLink}>
            <IconButton
              size="md"
              variant="ghost"
              icon={<FaEye />}
              aria-label={t("common:see-details")}
            />
          </Link>
        </Tooltip>
      )}

      <Tooltip label={t("common:edit")} shouldWrapChildren>
        <Link to={editLink}>
          <IconButton
            size="md"
            variant="ghost"
            icon={<MdModeEdit />}
            aria-label={t("common:edit")}
          />
        </Link>
      </Tooltip>

      <Tooltip label={t("common:delete")} shouldWrapChildren>
        <IconButton
          size="md"
          variant="ghost"
          icon={<FaTrash color="red" />}
          onClick={() => setIsOpen(true)}
          aria-label={t("common:delete")}
        />
      </Tooltip>

      {isOpen && (
        <AlertDialog
          isOpen={isOpen}
          title="Deletar registro"
          onClose={handleCloseButton}
          onConfirm={() => onClickDelete()}
          bodyText="Tem certeza? Você não pode desfazer esta ação posteriormente."
        />
      )}
    </Flex>
  );
};
