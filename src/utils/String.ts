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
