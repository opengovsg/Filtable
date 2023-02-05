import type { FC } from "react";
// Components
import { Box, Text } from "@chakra-ui/react";
import {
  BxRightArrowAlt,
  IconButton,
  Tag,
  useToast,
  Link,
} from "@opengovsg/design-system-react";
// Utils
import { isDefinedLink, extractUrlHost } from "../../utils/strings";
import BxShareAlt from "../icons/BxShareAlt";

type Props = {
  title: string | undefined;
  description: string | undefined;
  listOfTexts: Array<string>;
  convertedCollectionOfTags: Array<Array<string>>;
  link: string | undefined;
};

/**
 * To be used in ListingModal and PreviewListing
 */
const ListingFullContent: FC<Props> = ({
  title,
  description,
  listOfTexts,
  convertedCollectionOfTags,
  link,
}) => {
  const toast = useToast();

  const handleCopyUrl = () => {
    if (link) {
      void navigator.clipboard.writeText(link);
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
    }
  };

  return (
    <>
      {/* mr=32px is to avoid the 'X' button at the top right of the modal */}
      <Text textStyle="h6" noOfLines={2} mr="32px">
        {title}
      </Text>
      {description ? (
        <Text textStyle="body-2" mt="8px" whiteSpace="pre">
          {description}
        </Text>
      ) : null}
      {listOfTexts && listOfTexts.length ? (
        <Box mt="24px" display="flex" flexDir="column" gap="16px">
          {listOfTexts.map((text) => {
            return (
              <Text textStyle="body-2" whiteSpace="pre" key={text}>
                {text}
              </Text>
            );
          })}
        </Box>
      ) : null}
      {convertedCollectionOfTags && convertedCollectionOfTags.length ? (
        <Box display="flex" flexDir="row" flexWrap="wrap" gap="8px" mt="24px">
          {convertedCollectionOfTags.map(([tag, colorScheme]) => {
            return (
              <Tag
                key={tag as string}
                minW="fit-content"
                whiteSpace="nowrap"
                variant="subtle"
                colorScheme={colorScheme as string}
              >
                <Text textStyle="body-2">{tag}</Text>
              </Tag>
            );
          })}
        </Box>
      ) : null}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt="24px"
      >
        {/* TODO: The styles below get overridden when disabled (e.g. padding) */}
        <Link
          variant="standalone"
          href={link}
          p="0px"
          display="flex"
          flexDir="row"
          alignItems="center"
          gap="4px"
          rel="noreferrer"
          target="_blank"
          isDisabled={!isDefinedLink(link)}
        >
          {extractUrlHost(link)}
          {isDefinedLink(link) ? <BxRightArrowAlt /> : null}
        </Link>
        <IconButton
          aria-label="Share Link"
          icon={<BxShareAlt />}
          colorScheme="brand.secondary"
          variant="outline"
          isDisabled={!isDefinedLink(link)}
          onClick={handleCopyUrl}
        />
      </Box>
    </>
  );
};
export default ListingFullContent;
