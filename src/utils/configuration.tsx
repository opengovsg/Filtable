import React from "react";
import type { ZodTypeAny } from "zod";
import { z } from "zod";
import type { Headings } from "../types/headings";
import { headings } from "../types/headings";
import { mandatoryHeadings, optionalHeadings } from "../types/headings";
import type { FilterKeywords } from "../types/configuration";
import { filterKeywords, type HeadingConfig } from "../types/configuration";
import {
  extractFirstToken,
  isFilterKeyword,
  splitConcatenatedTags,
} from "./strings";
import { Tag } from "@opengovsg/design-system-react";
import { Box } from "@chakra-ui/react";

export const initEmptyHeadingConfig = (): HeadingConfig => {
  const temp: Record<string, string> = {};
  for (const heading of headings) {
    temp[heading] = "";
  }
  return temp as HeadingConfig;
};

export const initZodHeadingConfig = (): Record<Headings, ZodTypeAny> => {
  const temp: Record<string, ZodTypeAny> = {};
  for (const mandatoryHeading of mandatoryHeadings) {
    temp[mandatoryHeading] = z.string();
  }

  for (const optionalHeading of optionalHeadings) {
    temp[optionalHeading] = z.string().optional();
  }
  return temp;
};

/**
 * Extract key-value pairs from the configuration such that the key's first word is a filter keyword
 */
export const extractFilters = (
  config: HeadingConfig
): Partial<HeadingConfig> => {
  const configArray = Object.entries(config);
  const filteredConfigArray = configArray.filter(([key]) => {
    return isFilterKeyword(extractFirstToken(key));
  });
  const filteredConfig = Object.fromEntries(filteredConfigArray);

  return filteredConfig;
};

/**
 * Process config key-value pairs to return a new map where the key is a filter keyword and the value is an array of specified column headings to render as a filter type
 */
export const processExtractedFilters = (config: Partial<HeadingConfig>) => {
  const processedFilters: Record<
    FilterKeywords,
    Array<string>
  > = filterKeywords.reduce(
    (acc, val) => ({ ...acc, [val]: [] }),
    {}
  ) as Record<FilterKeywords, Array<string>>;

  const configArray = Object.entries(config);
  configArray.forEach(([key, val]) => {
    const keyFirstToken = extractFirstToken(key);

    if (isFilterKeyword(keyFirstToken)) {
      processedFilters[keyFirstToken as FilterKeywords].push(val);
    }
  });

  return processedFilters;
};

export const extractTags = (
  listing: Record<string, string>,
  configuration: HeadingConfig
): Array<Array<string>> => {
  const processedExtractedFilters = processExtractedFilters(
    extractFilters(configuration)
  );

  const collectionOfTags: Array<Array<string>> = [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(processedExtractedFilters).forEach(([_, columnHeadings]) => {
    columnHeadings.forEach((columnHeading) => {
      const concatenatedTags = listing[columnHeading];
      const tags = splitConcatenatedTags(concatenatedTags);
      const filteredTags = tags.filter((tag) => tag !== "");
      collectionOfTags.push(filteredTags);
    });
  });

  return collectionOfTags;
};

export const convertCollectionOfTags = (
  collectionOfTags: Array<Array<string>>
): Array<JSX.Element> => {
  const convertedTags: Array<JSX.Element> = [];

  const tagColorSchemes = ["yellow", "green", "purple"];

  collectionOfTags.forEach((tags, idx) => {
    tags.forEach((tag) => {
      convertedTags.push(
        <Tag
          key={tag}
          minW="fit-content"
          whiteSpace="nowrap"
          // Utilize the last color scheme if the number of tags > number of color schemes
          colorScheme={
            idx < tagColorSchemes.length
              ? tagColorSchemes[idx]
              : tagColorSchemes[tagColorSchemes.length - 1]
          }
        >
          {tag}
        </Tag>
      );
    });
  });

  return convertedTags;
};
