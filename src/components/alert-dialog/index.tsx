import React from "react";
import { useTranslate } from "@/core/hooks/use-translate";
import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  Button,
} from "@chakra-ui/react";

interface CustomAlertDialogProps {
  title: string;
  isOpen: boolean;
  bodyText: string;
  alertText?: string;
  onClickCancel: () => void;
  onClickConfirm: () => void;
  onClose?: () => void;
  confirmText?: string;
}

export const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
  title,
  bodyText,
  alertText,
  isOpen,
  onClickCancel,
  onClickConfirm,
  confirmText,
  onClose = () => null,
}) => {
  const t = useTranslate(["common"]);
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {bodyText}
            {alertText && 
              <Alert status='info' mt={4}>
                <AlertIcon />
                <AlertDescription>{alertText}</AlertDescription>
              </Alert>
            }  
          </AlertDialogBody>

          

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => onClickCancel()}>
              {t("common:cancel")}
            </Button>

            <Button colorScheme="blue" onClick={() => onClickConfirm()} ml={3}>
              {confirmText || t("common:yes")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
