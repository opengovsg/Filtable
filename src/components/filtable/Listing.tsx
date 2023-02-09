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
import { extractUrlHost, isDefinedLink } from "../../utils/strings";
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
              overflow: "hidden",
            }}
            data={convertedCollectionOfTags}
            renderItem={([tag, colorScheme]) => {
              return (
                <Tag
                  minW="fit-content"
                  whiteSpace="pre-wrap"
                  textStyle="body-2"
                  noOfLines={1}
                  variant="subtle"
                  colorScheme={colorScheme as string}
                >
                  {tag}
                </Tag>
              );
            }}
            renderRest={(remainingCollectionOfTags) => {
              return <Tag>+{remainingCollectionOfTags.length} more</Tag>;
            }}
            maxCount={2}
          />
        </Box>
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
            w="full"
            textOverflow="ellipsis"
          >
            <Text w="full" noOfLines={1}>
              {extractUrlHost(link)}
            </Text>
            {isDefinedLink(link) ? <BxRightArrowAlt /> : null}
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(Listing);
