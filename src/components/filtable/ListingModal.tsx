import type { FC } from "react";
// Components
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
// Utils
import ListingFullContent from "./ListingFullContent";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string | undefined;
  description: string | undefined;
  listOfTexts: Array<string>;
  convertedCollectionOfTags: Array<Array<string>>;
  link: string | undefined;
};

const ListingModal: FC<Props> = ({ isOpen, onClose, ...remainingProps }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent w="100vw" mt="auto" mb={{ base: "0", md: "auto" }} p="24px">
        <ModalCloseButton top="24px" right="24px" />
        <ListingFullContent {...remainingProps} />
      </ModalContent>
    </Modal>
  );
};
export default ListingModal;
