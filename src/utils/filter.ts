import type { Filter, FilterKeywords } from "../types/filter";
import { filterKeywords } from "../types/filter";
import { getTagColorScheme } from "./configuration";
import { splitConcatenatedTags } from "./strings";

// TODO: A lot of these functions are hard-coded with "Checkbox" type as it is currently the only type of filter. Need to cleanup and dynamically check so that more types can be added more easily

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

/**
 * To check if a heading section of filter is unselected => If a section is unselected, then listings do not get checked against that section
 */
export const isFilterHeadingUnselected = (filter: Filter, heading: string) => {
  const x = Object.values(filter["Checkbox"][heading] ?? {}).reduce(
    (acc, val) => acc && !val,
    true
  );

  return x;
};

/**
 * To detect if ANY filter is selected => So that the filter icon button can have a different design
 */
export const isAnyFilterSelected = (filter: Filter): boolean => {
  for (const heading of Object.keys(filter["Checkbox"])) {
    if (!isFilterHeadingUnselected(filter, heading)) {
      return true;
    }
  }

  return false;
};

/**
 * To check if a given listing should be displayed with the current filter
 */
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

/**
 * To get ALL the various options from ALL the listings (i.e. {Role: ["Software Engineer", "Tech Leads"]})
 */
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

/**
 * To extract a list of currently selected filters WITH the color scheme
 */
export const currentlySelectedFilters = (filter: Filter) => {
  const selected: Array<Array<string>> = [];

  Object.entries(filter["Checkbox"]).forEach(
    ([heading, recordOfOptionToBool], idx) => {
      Object.entries(recordOfOptionToBool).forEach(([option, bool]) => {
        if (bool) {
          selected.push([option, getTagColorScheme(idx), heading]);
        }
      });
    }
  );

  return selected;
};

/**
 * Generate a callback function to toggle/change a filter given an option and a heading (Assumed to be 'Checkbox')
 */
export const generateToggleOrChangeFilterOption = (
  option: string | undefined,
  heading: string | undefined,
  changeTo?: boolean
) => {
  if (!option || !heading) {
    return (filter: Filter) => filter;
  }

  return (filter: Filter): Filter => ({
    ...filter,
    Checkbox: {
      ...filter["Checkbox"],
      [heading]: {
        ...filter["Checkbox"][heading],
        // Change to the `changeTo` value IF provided; Else toggle
        [option]:
          changeTo !== undefined
            ? changeTo
            : !(filter["Checkbox"][heading] ?? {})[option],
      },
    },
  });
};
