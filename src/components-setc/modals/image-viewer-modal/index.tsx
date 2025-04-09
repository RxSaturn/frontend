import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Image } from "@chakra-ui/react";

type ImageViewerModalProps = {
  image?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({ image, isOpen, onClose }) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
    >
      <ModalOverlay />
      <ModalContent p="0px">
        <ModalCloseButton bg="#FFF" />
        <ModalBody bg="blue" p="0">
          <Image src={image} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ImageViewerModal;