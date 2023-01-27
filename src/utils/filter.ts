import type { Filter, FilterKeywords } from "../types/filter";
import { filterKeywords } from "../types/filter";
import { splitConcatenatedTags } from "./strings";

export const initUnselectedFilters = (
  listings: Array<Record<string, string>>,
  processedFilters: Record<FilterKeywords, Array<string>>
): Filter => {
  const init = initEmptyFilters();

  const allFilterOptions = enumerateAllFilterOptions(
    listings,
    processedFilters
  );

  Object.entries(allFilterOptions["Checkbox"] ?? {}).forEach(
    ([heading, options]) => {
      init["Checkbox"][heading] = {};

      Array.from(options as Set<string>).forEach(
        (option) => (((init["Checkbox"] ?? {})[heading] ?? {})[option] = false)
      );
    }
  );
  return init;
};

export const initEmptyFilters = () => {
  return filterKeywords.reduce(
    (acc, keyword) => ({ ...acc, [keyword]: {} }),
    {}
  ) as Filter;
};

export const isFilterHeadingUnselected = (filter: Filter, heading: string) => {
  const x = Object.values(filter["Checkbox"][heading] ?? {}).reduce(
    (acc, val) => acc && !val,
    true
  );

  return x;
};

export const doesListingPassFilter = (
  listing: Record<string, string>,
  filter: Filter
) => {
  //TODO: CLEANUP
  return Object.entries(filter["Checkbox"]).reduce(
    (acc, [heading, recordOfOptionToBool]) => {
      if (isFilterHeadingUnselected(filter, heading)) {
        return acc;
      }

      let isMatchingAtLeastOne = false;
      Object.entries(recordOfOptionToBool).forEach(([option, bool]) => {
        const tags = splitConcatenatedTags(listing[heading]);
        tags.forEach((tag) => {
          if (bool && tag === option) {
            isMatchingAtLeastOne = true;
          }
        });
      });

      return acc && isMatchingAtLeastOne;
    },
    true
  );
};

export const enumerateAllFilterOptions = (
  listings: Array<Record<string, string>>,
  processedFilters: Record<FilterKeywords, Array<string>>
) => {
  //TODO: CLEAN UP
  const x = Object.fromEntries(
    Object.entries(processedFilters).map(([key, value]) => [
      key,
      value.reduce((acc, val) => ({ ...acc, [val]: new Set() }), {}),
    ])
  );

  listings.forEach((listing) => {
    processedFilters["Checkbox"].forEach((checkboxName) => {
      const tags = splitConcatenatedTags(listing[checkboxName]);
      tags.forEach((tag) => {
        (
          (x["Checkbox"] as Record<string, Set<string>>)[
            checkboxName
          ] as Set<string>
        ).add(tag.trim());
      });
    });
  });

  return x;
};
