/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Utils
import { z } from "zod";
import {
  extractFirstToken,
  isFilterKeyword,
  splitConcatenatedTags,
} from "./strings";
// Types
import type { ZodTypeAny } from "zod";
import type { Headings } from "../types/headings";
import { type HeadingConfig } from "../types/configuration";
import type { FilterKeywords } from "../types/filter";
import { headings } from "../types/headings";
import { mandatoryHeadings, optionalHeadings } from "../types/headings";
import { filterKeywords } from "../types/filter";

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

export const initEmptyProcessedFilters = () => {
  return filterKeywords.reduce(
    (acc, keyword) => ({ ...acc, [keyword]: [] }),
    {}
  ) as Record<FilterKeywords, Array<string>>;
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
      collectionOfTags.push(tags);
    });
  });

  return collectionOfTags;
};

export const convertCollectionOfTags = (
  collectionOfTags: Array<Array<string>>
): Array<Array<string>> => {
  const convertedTags: Array<Array<string>> = [];

  collectionOfTags.forEach((tags, idx) => {
    tags.forEach((tag) => {
      convertedTags.push([tag, getTagColorScheme(idx)]);
    });
  });

  return convertedTags;
};

export const tagColorSchemes = ["yellow", "green", "purple"];
export const getTagColorScheme = (idx: number): string => {
  return (
    tagColorSchemes[idx] ??
    (tagColorSchemes[tagColorSchemes.length - 1] as string)
  );
};

export const encodeConfig = (config: Array<Record<string, string>>) => {
  const stringifiedConfig = JSON.stringify(config);
  const encodedUrlConfig = btoa(stringifiedConfig);

  return encodedUrlConfig;
};

export const decodeUrlConfig = (urlConfig: string | string[]) => {
  const decodedUrlConfig = atob(String(urlConfig));
  const parsedConfig = JSON.parse(decodedUrlConfig);

  return parsedConfig as Record<string, string>;
};
