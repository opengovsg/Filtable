import type { ZodTypeAny } from "zod";
import { z } from "zod";
import type { Headings } from "../types/Headings";
import { headings } from "../types/Headings";
import { mandatoryHeadings, optionalHeadings } from "../types/Headings";
import type { FilterKeywords } from "../types/Configuration";
import {
  filterClose,
  filterKeywords,
  filterOpen,
  type HeadingConfig,
} from "../types/Configuration";
import { checkForKeyword } from "./strings";

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

export const extractFilters = (
  config: HeadingConfig
): Partial<HeadingConfig> => {
  const configArray = Object.entries(config);
  const filteredConfigArray = configArray.filter(([key]) => {
    const open = key.split("").findIndex((char) => char == filterOpen);
    const close = key.split("").findIndex((char) => char === filterClose);

    return open < close;
  });
  const filteredConfig = Object.fromEntries(filteredConfigArray);

  return filteredConfig;
};

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
    const keyword = checkForKeyword(key);
    if (keyword !== "") {
      processedFilters[keyword].push(val);
    }
  });

  return processedFilters;
};
