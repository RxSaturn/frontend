import { useTranslate } from "@/core/hooks/use-translate";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import AuditTable from "./audit-table";

interface AuditModalProps {
  entityId: string;
}

const AuditModal: React.FC<AuditModalProps> = ({ entityId }) => {
  const btnRef = useRef(null);
  const t = useTranslate(["common"]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button size="sm" ref={btnRef} onClick={onOpen} variant="outline" colorScheme="blue">
        {t("common:see-complete-audit")}
      </Button>

      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AuditTable entityId={entityId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuditModal;
