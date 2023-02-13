import { useEffect, useState } from "react";
import { fetchCsvData } from "../api/csv";
import { fetchGoogleSheetsData } from "../api/sheets";
import { generateErrorMessage } from "../utils/errors";
import { separateIdAndGid, stripQueryParams } from "../utils/strings";
import { GoogleSheetResponse } from "../zodSchemas";

const useSheetsData = ({
  combinedIdAndGid,
  csvKey,
}: {
  combinedIdAndGid?: string | string[] | undefined;
  csvKey?: string | string[] | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState<Array<Record<string, string>>>([]);
  const [headings, setHeadings] = useState<Array<string>>([]);
  const [firstRow, setFirstRow] = useState<Record<string, string>>({});
  const [title, setTitle] = useState("");

  useEffect(() => {
    /**
     * Get the right data based on ('csvKey' OR 'googleSheetId') AND configLocation
     */
    const getCorrespondingData = async ({
      combinedIdAndGid,
      csvKey,
    }: {
      combinedIdAndGid: string | string[] | undefined;
      csvKey: string | string[] | undefined;
    }) => {
      if ((combinedIdAndGid && csvKey) || (!combinedIdAndGid && !csvKey)) {
        throw "either BOTH combinedIdAndGid and csvKey were provided or NEITHER";
      } else if (combinedIdAndGid) {
        const stripped = stripQueryParams(combinedIdAndGid);
        const { id, gid } = separateIdAndGid(stripped);
        return await fetchGoogleSheetsData(id, gid);
      } else if (csvKey) {
        const strippedCsvKey = stripQueryParams(csvKey);
        return await fetchCsvData(strippedCsvKey);
      }

      throw "unable to fetch data and config";
    };

    const fetchData = async () => {
      if (combinedIdAndGid || csvKey) {
        try {
          const { data, headings, firstRow, title } =
            await getCorrespondingData({
              combinedIdAndGid,
              csvKey,
            });

          const validatedData = GoogleSheetResponse.parse(data);
          setData(validatedData);
          setHeadings(headings);
          setFirstRow(firstRow);
          setTitle(title);
          setIsLoading(false);
        } catch (error) {
          setErrorMessage(
            generateErrorMessage(error, { displayErrorMessage: false })
          );
        }
      }
    };

    void fetchData();
  }, [csvKey, combinedIdAndGid]);

  const value = {
    isLoading,
    errorMessage,
    data,
    headings,
    firstRow,
    title,
  };

  return value;
};

export default useSheetsData;
