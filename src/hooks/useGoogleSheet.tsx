import { useEffect, useState } from "react";
import {
  fetchSheetDataAndConfig,
  fetchSheetDataAndDecodeUrlConfig,
  fetchSingleSheetDataAndConfig,
} from "../api/sheets";
import type { ConfigLocation, HeadingConfig } from "../types/configuration";
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
import { stripQueryParams } from "../utils/strings";
import { GoogleSheetResponse, ConfigurationResponse } from "../zodSchemas";

const useGoogleSheet = ({
  configLocation,
  googleSheetId,
  urlConfig,
}: {
  configLocation: ConfigLocation;
  googleSheetId: string | string[] | undefined;
  urlConfig?: string;
}) => {
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
    const getDataAndConfig = async (
      configLocation: ConfigLocation,
      strippedSheetId: string
    ) => {
      switch (configLocation) {
        case "secondSheet":
          return await fetchSheetDataAndConfig(strippedSheetId);
        case "singleSheet":
          return await fetchSingleSheetDataAndConfig(strippedSheetId);
        case "url":
          return await fetchSheetDataAndDecodeUrlConfig(
            strippedSheetId,
            urlConfig
          );
      }

      throw "unable to fetch data and config";
    };

    const fetchData = async () => {
      if (googleSheetId) {
        const strippedSheetId = stripQueryParams(googleSheetId);

        try {
          const { data, configuration } = await getDataAndConfig(
            configLocation,
            strippedSheetId
          );

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
          setErrorMessage(
            generateErrorMessage(error, { displayErrorMessage: false })
          );
        }
      }
    };

    void fetchData();
  }, [configLocation, googleSheetId, urlConfig]);

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
