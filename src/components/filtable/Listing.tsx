// React
import type { FC } from "react";
import React from "react";
import { useMemo, useState } from "react";
// Components
import { BxRightArrowAlt, Link, Tag } from "@opengovsg/design-system-react";
import ListingModal from "./ListingModal";
import { Box, Text } from "@chakra-ui/react";
// Types
import type { HeadingConfig } from "../../types/configuration";
// Utils
import {
  extractUrlHost,
  isDefinedLink,
  isValidLink,
} from "../../utils/strings";
import {
  convertCollectionOfTags,
  extractTags,
  extractTexts,
} from "../../utils/configuration";
import Overflow from "rc-overflow";

type ListingProps = {
  listing: Record<string, string>;
  configuration: HeadingConfig;
};

// eslint-disable-next-line react/display-name
const Listing: FC<ListingProps> = ({ listing, configuration }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const title = configuration["Title"]
    ? listing[configuration["Title"]]
    : undefined;
  const description = configuration["Description"]
    ? listing[configuration["Description"]]
    : undefined;
  const link = configuration["Link"]
    ? listing[configuration["Link"]]
    : undefined;

  const listOfTexts = extractTexts(listing, configuration);

  const convertedCollectionOfTags = useMemo(() => {
    return convertCollectionOfTags(extractTags(listing, configuration));
  }, [configuration, listing]);

  const openModal = () => {
    setIsExpanded(true);
  };

  const closeModal = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <ListingModal
        isOpen={isExpanded}
        onClose={closeModal}
        title={title}
        description={description}
        listOfTexts={listOfTexts}
        convertedCollectionOfTags={convertedCollectionOfTags}
        link={link}
      />
      <Box
        w="full"
        p="16px"
        border="1px"
        borderColor="base.divider.medium"
        borderRadius="4px"
        backgroundColor="utility.ui"
        cursor="pointer"
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

        <Box mt="16px">
          <Overflow
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "8px",
              maxHeight: "64px",
            }}
            data={convertedCollectionOfTags}
            renderItem={([tag, colorScheme]) => {
              return (
                <Tag
                  minW="fit-content"
                  whiteSpace="nowrap"
                  variant="subtle"
                  colorScheme={colorScheme as string}
                >
                  <Text textStyle="body-2">{tag}</Text>
                </Tag>
              );
            }}
            renderRest={(remainingCollectionOfTags) => {
              return <Tag>+{remainingCollectionOfTags.length} more</Tag>;
            }}
            maxCount={2}
          />
        </Box>
        {isDefinedLink(link) ? (
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

export default React.memo(Listing);
