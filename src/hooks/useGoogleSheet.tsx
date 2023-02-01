import { useEffect, useState } from "react";
import {
  fetchSheetDataAndConfig,
  fetchSingleSheetDataAndConfig,
} from "../api/sheets";
import type { HeadingConfig } from "../types/configuration";
import type { Filter, FilterKeywords } from "../types/filter";
import {
  processExtractedFilters,
  extractFilters,
  initEmptyHeadingConfig,
  initEmptyProcessedFilters,
} from "../utils/configuration";
import { generateErrorMessage } from "../utils/errors";
import {
  doesListingPassFilter,
  initEmptyFilters,
  initUnselectedFilters,
} from "../utils/filter";
import { GoogleSheetResponse, ConfigurationResponse } from "../zodSchemas";

const useGoogleSheet = (
  sheetId: string | string[] | undefined,
  config?: {
    isSingleSheet?: boolean;
  }
) => {
  const isSingleSheet = Boolean(config?.isSingleSheet);

  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState<Filter>(initEmptyFilters());
  const [data, setData] = useState<Array<Record<string, string>>>([]);
  const [configuration, setConfiguration] = useState<HeadingConfig>(
    initEmptyHeadingConfig()
  );
  const [processedFilters, setProcessedFilters] = useState<
    Record<FilterKeywords, Array<string>>
  >(
    //TODO:
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
    initEmptyProcessedFilters()
  );

  useEffect(() => {
    const fetchData = async () => {
      if (sheetId) {
        try {
          const { data, configuration } = await (isSingleSheet
            ? fetchSingleSheetDataAndConfig(String(sheetId))
            : fetchSheetDataAndConfig(String(sheetId)));

          const validatedData = GoogleSheetResponse.parse(data);
          const validatedConfiguration = ConfigurationResponse.parse(
            configuration
          )[0] as HeadingConfig;

          // Setting up initial filters
          const processedFilters = processExtractedFilters(
            extractFilters(validatedConfiguration)
          );

          setFilter(initUnselectedFilters(validatedData, processedFilters));
          setProcessedFilters(processedFilters);
          setData(validatedData);
          setConfiguration(validatedConfiguration);
          setIsLoading(false);
        } catch (error) {
          setErrorMessage(generateErrorMessage(error));
        }
      }
    };

    void fetchData();
  }, [isSingleSheet, sheetId]);

  const filteredData = data.filter((listing) =>
    doesListingPassFilter(listing, filter)
  );

  const value = {
    isLoading,
    errorMessage,
    filter,
    setFilter,
    data,
    filteredData,
    configuration,
    processedFilters,
  };

  return value;
};

export default useGoogleSheet;
