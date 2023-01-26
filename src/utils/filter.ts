import type { FilterKeywords } from "../types/configuration";
import { filterKeywords } from "../types/configuration";

export const initUnselectedFilters = (
  processedExtractedFilters?: Record<FilterKeywords, Array<string>>
): Record<string, boolean> => {
  const init: Record<string, boolean> = {};

  if (processedExtractedFilters) {
    for (const [keyword, values] of Object.entries(processedExtractedFilters)) {
      switch (keyword) {
        // Checkbox
        case filterKeywords[0]:
          values.forEach((value) => (init[value] = false));
          break;

        default:
          break;
      }
    }
  }

  return init;
};

export const isFilterAllUnselected = (filter: Record<string, boolean>) => {
  return Object.values(filter).reduce((acc, val) => acc && !val, true);
};

export const doesListingPassFilter = (
  listing: Record<string, string>,
  filter: Record<string, boolean>
) => {
  return Object.entries(filter).reduce((acc, [keyword, isSelected]) => {
    if (isSelected) {
      return acc && listing[keyword]?.toLowerCase() === "true";
    } else {
      return acc;
    }
  }, true);
};
