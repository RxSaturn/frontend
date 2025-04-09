import { useRef } from "react";
import {
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  AlertDialog as ChakraAlertDialog,
} from "@chakra-ui/react";

type AlertDialogProps = {
  title: string;
  isOpen: boolean;
  bodyText: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const AlertDialog = ({ isOpen, title, bodyText, onClose, onConfirm }: AlertDialogProps) => {
  const cancelRef = useRef(null);

  return (
    <ChakraAlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{bodyText}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Não
            </Button>

            <Button colorScheme="blue" onClick={onConfirm} ml={3}>
              Sim
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  );
};
