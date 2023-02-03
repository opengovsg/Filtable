import type { NextPage } from "next";
import { useRouter } from "next/router";
import FiltablePage from "../../../components/filtable/FiltablePage";
import useConfigData from "../../../hooks/useConfigData";
import useFilter from "../../../hooks/useFilter";
import useSheetsData from "../../../hooks/useSheetsData";
import {
  checkDataAndConfigForErrors,
  generateErrorMessage,
} from "../../../utils/errors";

const GoogleSheetFiltable: NextPage = () => {
  const router = useRouter();
  const { googleSheetId, urlConfig } = router.query;

  const {
    isLoading: isLoadingSheetsData,
    errorMessage: errorMessageSheetsData,
    ...sheetsData
  } = useSheetsData({
    googleSheetId,
  });

  const configLocation = Boolean(urlConfig) ? "url" : "secondSheet";
  const {
    isLoading: isLoadingConfigData,
    errorMessage: errorMessageConfigData,
    ...configData
  } = useConfigData({
    configLocation,
    googleSheetId,
    urlConfig,
  });

  const filterData = useFilter({
    data: sheetsData.data,
    processedFilters: configData.processedFilters,
  });

  const isLoading = isLoadingSheetsData || isLoadingConfigData;

  /**
   * Check if there are no mappings across data and config
   */
  let errorMessage = errorMessageSheetsData ?? errorMessageConfigData;
  try {
    checkDataAndConfigForErrors({
      data: sheetsData.data,
      configuration: configData.configuration,
    });
  } catch (error) {
    errorMessage = generateErrorMessage(
      error instanceof Error ? error.message : String(error)
    );
  }

  return (
    <FiltablePage
      isLoading={isLoading}
      errorMessage={errorMessage}
      {...sheetsData}
      {...configData}
      {...filterData}
    />
  );
};
export default GoogleSheetFiltable;
