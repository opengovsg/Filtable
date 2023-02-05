import type { FC } from "react";
// Components
import { Box, Link, Text } from "@chakra-ui/react";
import { BxRightArrowAlt, BxX, Tag } from "@opengovsg/design-system-react";
// Utils
import { isValidLink, extractUrlHost } from "../../utils/strings";

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
    </>
  );
};
export default ListingFullContent;
