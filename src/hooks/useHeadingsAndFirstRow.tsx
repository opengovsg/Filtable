import { useEffect, useState } from "react";
import { fetchSheetHeadingsAndFirstRow } from "../api/sheets";
import { generateErrorMessage } from "../utils/errors";

const useHeadingsAndFirstRow = ({
  googleSheetId,
  csvKey,
}: {
  googleSheetId?: string;
  csvKey?: string; //TODO:
}) => {
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [headings, setHeadings] = useState<Array<string>>([]);
  const [firstRow, setFirstRow] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if ((googleSheetId && csvKey) || (!googleSheetId && !csvKey)) {
          throw "both or neither 'googleSheetId' and 'csvKey' were provided";
        } else if (googleSheetId) {
          const { headings, firstRowArray } =
            await fetchSheetHeadingsAndFirstRow(googleSheetId);
          setHeadings(headings);

          const firstRow: Record<string, string> = {};
          headings.forEach((heading, idx) => {
            firstRow[heading] = String(firstRowArray[idx]);
          });
          setFirstRow(firstRow);
        } else {
          // TODO:
        }

        setLoading(false);
      } catch (error) {
        setErrorMessage(
          generateErrorMessage(error, { displayErrorMessage: false })
        );
      }
    };

    void fetchData();
  }, [csvKey, googleSheetId]);

  const values = {
    isLoading,
    errorMessage,
    headings,
    firstRow,
  };

  return values;
};

export default useHeadingsAndFirstRow;
