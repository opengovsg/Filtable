import { useEffect, useState } from "react";
import type { Filter, FilterKeywords } from "../types/filter";
import {
  doesListingPassFilter,
  initEmptyFilters,
  initUnselectedFilters,
} from "../utils/filter";

const useFilter = ({
  data,
  processedFilters,
}: {
  data: Array<Record<string, string>>;
  processedFilters: Record<FilterKeywords, Array<string>>;
}) => {
  const [filter, setFilter] = useState<Filter>(initEmptyFilters());

  useEffect(() => {
    setFilter(initUnselectedFilters(data, processedFilters));
  }, [data, processedFilters]);

  const filteredData = data.filter((listing) =>
    doesListingPassFilter(listing, filter)
  );

  const value = {
    filter,
    setFilter,
    filteredData,
  };

  return value;
};

export default useFilter;
