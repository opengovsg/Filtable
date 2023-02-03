import { useEffect, useState } from "react";
import { fetchCsvData } from "../api/csv";
import { fetchGoogleSheetsData } from "../api/sheets";
import { generateErrorMessage } from "../utils/errors";
import { stripQueryParams } from "../utils/strings";
import { GoogleSheetResponse } from "../zodSchemas";

const useSheetsData = ({
  googleSheetId,
  csvKey,
}: {
  googleSheetId?: string | string[] | undefined;
  csvKey?: string | string[] | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState<Array<Record<string, string>>>([]);
  const [headings, setHeadings] = useState<Array<string>>([]);
  const [firstRow, setFirstRow] = useState<Record<string, string>>({});

  useEffect(() => {
    /**
     * Get the right data based on ('csvKey' OR 'googleSheetId') AND configLocation
     */
    const getCorrespondingData = async ({
      googleSheetId,
      csvKey,
    }: {
      googleSheetId: string | string[] | undefined;
      csvKey: string | string[] | undefined;
    }) => {
      if ((googleSheetId && csvKey) || (!googleSheetId && !csvKey)) {
        throw "either BOTH googleSheetId and csvKey were provided or NEITHER";
      } else if (googleSheetId) {
        const strippedGoogleSheetId = stripQueryParams(googleSheetId);
        return await fetchGoogleSheetsData(strippedGoogleSheetId);
      } else if (csvKey) {
        const strippedCsvKey = stripQueryParams(csvKey);
        console.log(strippedCsvKey);
        return await fetchCsvData(strippedCsvKey);
      }

      throw "unable to fetch data and config";
    };

    const fetchData = async () => {
      if (googleSheetId || csvKey) {
        try {
          const { data, headings, firstRow } = await getCorrespondingData({
            googleSheetId,
            csvKey,
          });

          const validatedData = GoogleSheetResponse.parse(data);
          setData(validatedData);
          setHeadings(headings);
          setFirstRow(firstRow);
          setIsLoading(false);
        } catch (error) {
          setErrorMessage(
            generateErrorMessage(error, { displayErrorMessage: false })
          );
        }
      }
    };

    void fetchData();
  }, [csvKey, googleSheetId]);

  const value = {
    isLoading,
    errorMessage,
    data,
    headings,
    firstRow,
  };

  return value;
};

export default useSheetsData;
