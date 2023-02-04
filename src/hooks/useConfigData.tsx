import { useEffect, useState } from "react";
import { fetchGoogleSheetsConfig } from "../api/sheets";
import type { ConfigLocation, HeadingConfig } from "../types/configuration";
import type { FilterKeywords } from "../types/filter";
import {
  initEmptyHeadingConfig,
  initEmptyProcessedFilters,
  decodeUrlConfig,
  processConfigurationToFilters,
} from "../utils/configuration";
import { generateErrorMessage } from "../utils/errors";
import { stripQueryParams } from "../utils/strings";
import { ConfigurationResponse } from "../zodSchemas";

const useConfigData = ({
  configLocation,
  googleSheetId,
  urlConfig,
}: {
  configLocation: ConfigLocation;
  googleSheetId?: string | string[] | undefined;
  urlConfig?: string | string[] | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
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
    /**
     * Get the right data based on ('csvKey' OR 'googleSheetId') AND configLocation
     */
    const getCorrespondingConfig = async ({
      configLocation,
      googleSheetId,
      urlConfig,
    }: {
      configLocation: ConfigLocation;
      googleSheetId: string | string[] | undefined;
      urlConfig?: string | string[] | undefined;
    }) => {
      switch (configLocation) {
        case "secondSheet":
          if (!googleSheetId) {
            throw "no google sheet ID provided for config";
          }
          const strippedGoogleSheetId = stripQueryParams(googleSheetId);
          return await fetchGoogleSheetsConfig(strippedGoogleSheetId);
        case "url":
          if (!urlConfig) {
            throw "no url config provided";
          }
          const decodedConfiguration = [decodeUrlConfig(urlConfig)];
          return { configuration: decodedConfiguration };
      }
      throw "unable to fetch config";
    };

    const fetchData = async () => {
      try {
        const { configuration } = await getCorrespondingConfig({
          configLocation,
          googleSheetId,
          urlConfig,
        });

        const validatedConfiguration = ConfigurationResponse.parse(
          configuration
        )[0] as HeadingConfig;

        const processedFilters = processConfigurationToFilters(
          validatedConfiguration
        );

        setProcessedFilters(processedFilters);
        setConfiguration(validatedConfiguration);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(
          generateErrorMessage(error, { displayErrorMessage: false })
        );
      }
    };

    void fetchData();
  }, [configLocation, googleSheetId, urlConfig]);

  const value = {
    isLoading,
    errorMessage,
    configuration,
    processedFilters,
  };

  return value;
};

export default useConfigData;
