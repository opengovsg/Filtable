import type { FilterKeywords } from "../types/Configuration";
import {
  filterClose,
  filterKeywords,
  filterOpen,
} from "../types/Configuration";

export const checkForKeyword = (key: string): FilterKeywords | "" => {
  for (const keyword of filterKeywords) {
    if (key.match(`${filterOpen}${keyword}${filterClose}`)) {
      return keyword;
    }
  }

  return "";
};

export const extractSheetId = (sheetsLink: string) => {
  return sheetsLink.split("/")[5] || "";
};

export const isInvalidLink = (sheetsLink: string) => {
  return sheetsLink === "";
};
