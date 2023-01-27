import type { FC } from "react";
import {
  Box,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { BxRightArrowAlt, Tag } from "@opengovsg/design-system-react";
import { isValidLink, extractUrlHost } from "../utils/strings";
import { convertCollectionOfTags } from "../utils/configuration";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string | undefined;
  collectionOfTags: Array<Array<string>>;
  link: string | undefined;
};

const ListingModal: FC<Props> = ({
  isOpen,
  onClose,
  title,
  description,
  collectionOfTags,
  link,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent w="100vw" mt="auto" mb="0" p="24px">
        <ModalCloseButton top="24px" right="24px" />
        <Text textStyle="h6" noOfLines={2} mr="32px">
          {title}
        </Text>
        {description ? (
          <Text textStyle="body-2" mt="8px">
            {description}
          </Text>
        ) : null}
        <Box display="flex" flexDir="row" flexWrap="wrap" gap="8px" mt="24px">
          {convertCollectionOfTags(collectionOfTags)}
        </Box>
        {isValidLink(link) ? (
          <Link
            variant="standalone"
            href={link}
            p="0px"
            mt="24px"
            display="flex"
            flexDir="row"
            alignItems="center"
            gap="4px"
            rel="noreferrer"
            target="_blank"
          >
            {extractUrlHost(link)}
            <BxRightArrowAlt />
          </Link>
        ) : null}
      </ModalContent>
    </Modal>
  );
};
export default ListingModal;
