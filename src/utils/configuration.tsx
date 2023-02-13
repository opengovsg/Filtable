/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// TODO: Fix above
// Utils
import { z } from "zod";
import {
  extractFirstToken,
  isFilterKeyword,
  splitConcatenatedTags,
} from "./strings";
import { Base64 } from "js-base64";
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
const extractFilters = (config: HeadingConfig): Partial<HeadingConfig> => {
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
const processExtractedFilters = (config: Partial<HeadingConfig>) => {
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

    if (isFilterKeyword(keyFirstToken) && val) {
      processedFilters[keyFirstToken as FilterKeywords].push(val);
    }
  });

  return processedFilters;
};

/**
 * Combines processExtractedFilters and extractFilters
 */
export const processConfigurationToFilters = (configuration: HeadingConfig) => {
  return processExtractedFilters(extractFilters(configuration));
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
  const processedFilters = processConfigurationToFilters(configuration);

  const collectionOfTags: Array<Array<string>> = [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(processedFilters).forEach(([_, columnHeadings]) => {
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

export const extractTexts = (
  listing: Record<string, string>,
  configuration: HeadingConfig
): Array<string> => {
  const extractedTexts: Array<string> = [];

  Object.entries(configuration)
    .filter(([heading]) => heading.split(" ")[0] === "Text")
    .forEach(([_, value]) => {
      const extractedText = listing[value];
      extractedTexts.push(extractedText ?? "");
    });

  return extractedTexts;
};

export const encodeConfig = (config: Array<Record<string, string>>) => {
  const stringifiedConfig = JSON.stringify(config);
  const encodedUrlConfig = Base64.encode(stringifiedConfig);

  return encodedUrlConfig;
};

export const decodeUrlConfig = (urlConfig: string | string[]) => {
  const decodedUrlConfig = Base64.decode(String(urlConfig));
  const parsedConfig = JSON.parse(decodedUrlConfig);

  return parsedConfig as Record<string, string>;
};
