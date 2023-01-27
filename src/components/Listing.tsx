import { Box, Text } from "@chakra-ui/react";
import { BxRightArrowAlt, Link } from "@opengovsg/design-system-react";
import type { FC } from "react";
import { useMemo, useState } from "react";
import type { HeadingConfig } from "../types/configuration";
import { convertCollectionOfTags, extractTags } from "../utils/configuration";
import { doesListingPassFilter, isFilterAllUnselected } from "../utils/filter";
import { extractUrlHost, isValidLink } from "../utils/strings";
import ListingModal from "./ListingModal";

type ListingProps = {
  listing: Record<string, string>;
  filter: Record<string, boolean>;
  configuration: HeadingConfig;
};

const Listing: FC<ListingProps> = ({ listing, filter, configuration }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const title = listing[configuration["Title"]] as string;
  const description = configuration["Description"]
    ? listing[configuration["Description"]]
    : undefined;
  const link = configuration["Link URL"]
    ? listing[configuration["Link URL"]]
    : undefined;

  const collectionOfTags: Array<Array<string>> = useMemo(
    () => extractTags(listing, configuration),
    [listing, configuration]
  );

  const openModal = () => {
    setIsExpanded(true);
  };

  const closeModal = () => {
    setIsExpanded(false);
  };

  if (
    !isFilterAllUnselected(filter) &&
    !doesListingPassFilter(listing, filter)
  ) {
    return <></>;
  }

  return (
    <>
      <ListingModal
        isOpen={isExpanded}
        onClose={closeModal}
        title={title}
        description={description}
        collectionOfTags={collectionOfTags}
        link={link}
      />
      <Box
        w="full"
        p="16px"
        border="1px"
        borderColor="base.divider.medium"
        borderRadius="4px"
        backgroundColor="utility.ui"
        onClick={openModal}
      >
        <Text textStyle="h6" noOfLines={2}>
          {title}
        </Text>
        {description ? (
          <Text textStyle="body-2" mt="4px" noOfLines={2}>
            {description}
          </Text>
        ) : null}

        {/* PILL LOGIC */}
        <Box
          display="flex"
          flexDir="row"
          flexWrap="wrap"
          gap="8px"
          mt="16px"
          overflow="hidden"
          maxHeight="64px"
        >
          {convertCollectionOfTags(collectionOfTags)}
        </Box>

        {isValidLink(link) ? (
          <Link
            variant="standalone"
            href={link}
            p="0px"
            mt="16px"
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
      </Box>
    </>
  );
};
export default Listing;
