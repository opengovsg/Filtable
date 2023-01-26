import { Box, Text } from "@chakra-ui/react";
import { BxRightArrowAlt, Link, Tag } from "@opengovsg/design-system-react";
import type { FC } from "react";
import type { HeadingConfig } from "../types/configurations";
import { extractTags } from "../utils/configurations";
import { doesListingPassFilter, isFilterAllUnselected } from "../utils/filter";
import { extractUrlHost, isValidLink } from "../utils/strings";

type ListingProps = {
  listing: Record<string, string>;
  filter: Record<string, boolean>;
  configuration: HeadingConfig;
};

const Listing: FC<ListingProps> = ({ listing, filter, configuration }) => {
  const title = listing[configuration["Title"]] as string;
  const description = configuration["Description"]
    ? listing[configuration["Description"]]
    : undefined;
  const link = configuration["Link URL"]
    ? listing[configuration["Link URL"]]
    : undefined;

  const collectionOfTags: Array<Array<string>> = extractTags(
    listing,
    configuration
  );
  const flattenedTags = collectionOfTags
    .reduce((acc, val) => {
      return [...acc, ...val];
    }, [])
    .filter((tag) => tag !== "");

  if (
    !isFilterAllUnselected(filter) &&
    !doesListingPassFilter(listing, filter)
  ) {
    return <></>;
  }

  return (
    <>
      <Box
        w="full"
        p="16px"
        border="1px"
        borderColor="base.divider.medium"
        borderRadius="4px"
        backgroundColor="utility.ui"
      >
        <Text textStyle="h6" noOfLines={2}>
          {title}
        </Text>
        {description ? (
          <Text textStyle="body-2" mt="4px" noOfLines={2}>
            {description}
          </Text>
        ) : null}
        <Box display="flex" flexDir="row" flexWrap="wrap" gap="8px" mt="16px">
          {flattenedTags.map((tag) => (
            <Tag key={tag} w="fit-content" whiteSpace="nowrap">
              {tag}
            </Tag>
          ))}
        </Box>
        {isValidLink(link) ? (
          <Link
            variant="standalone"
            href={link}
            p="0px"
            mt="16px"
            rel="noreferrer"
            target="_blank"
          >
            {extractUrlHost(link)}
            <BxRightArrowAlt />
          </Link>
        ) : null}
      </Box>
    </>
  );
};
export default Listing;
