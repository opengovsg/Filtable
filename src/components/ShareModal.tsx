import type { FC } from "react";
// Components
import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import {
  Input,
  Textarea,
  IconButton,
  useToast,
} from "@opengovsg/design-system-react";
import BxCopy from "./icons/BxCopy";
// Utils
import { generateIFrame } from "../utils/strings";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  filtableTitle: string | undefined;
};

const ShareModal: FC<Props> = ({ isOpen, onClose, filtableTitle }) => {
  const currentWindowUrl = window.location.href;
  const iframeTag = generateIFrame(currentWindowUrl, filtableTitle);
  const toast = useToast();

  const handleCopyUrl = () => {
    void navigator.clipboard.writeText(currentWindowUrl);
    onClose();
    toast({
      position: "bottom",
      title: "Copied link to clipboard!",
      status: "success",
      duration: 3000,
      isClosable: true,
      containerStyle: {
        zIndex: 9999,
      },
    });
  };

  const handleCopyIFrame = () => {
    void navigator.clipboard.writeText(iframeTag);
    onClose();
    toast({
      position: "bottom",
      title: "Copied iFrame to clipboard!",
      status: "success",
      duration: 3000,
      isClosable: true,
      containerStyle: {
        zIndex: 9999,
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{
          base: "full",
          md: "sm",
        }}
      >
        <ModalOverlay />
        <ModalContent
          p="24px"
          pt="42px"
          minH={"fill-available"}
          h={{ base: "100%", md: "fit-content" }}
        >
          <ModalCloseButton top="42px" right="24px" />
          <Text textStyle="h5" mb="26px">
            Share this Filtable
          </Text>
          <Text textStyle="subhead-2" mb="12px">
            Copy and share the link
          </Text>
          <Box w="full" display="flex" flexDir="row" gap="8px">
            <Input size="sm" readOnly value={currentWindowUrl} />
            <IconButton
              aria-label="Copy link"
              size="sm"
              icon={<BxCopy />}
              variant="outline"
              colorScheme="brand.secondary"
              onClick={handleCopyUrl}
            />
          </Box>
          <Text textStyle="subhead-2" mt="24px" mb="12px">
            Or embed it on a website
          </Text>
          <Box w="full" display="flex" flexDir="row" gap="8px">
            <Textarea size="sm" readOnly value={iframeTag} />
            <IconButton
              aria-label="Copy link"
              size="sm"
              icon={<BxCopy />}
              variant="outline"
              colorScheme="brand.secondary"
              onClick={handleCopyIFrame}
            />
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ShareModal;
