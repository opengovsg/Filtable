/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//TODO: FIX TYPE ERRORS
import { formatRawValuesToArrayOfRecords } from "../utils/sheets";

/**
 * For JUST Google Sheet Data
 */
export const fetchGoogleSheetsData = async (id: string) => {
  const dataRes = await fetch(`/api/google-sheets/${id}/idx/0`);
  const dataData = await dataRes.json();
  const values = dataData.values as Array<Array<string>>;

  const formattedData = formatRawValuesToArrayOfRecords(values);
  const headings = values[0];
  const firstRow = formattedData[0];

  if (
    !formattedData ||
    !formattedData.length ||
    !headings ||
    !headings.length ||
    !firstRow
  ) {
    throw "no google sheets data";
  }

  return {
    data: formattedData,
    headings,
    firstRow,
    title: dataData.title as string,
  };
};

/**
 * Fetch Google Sheets (2nd sheet) config
 */
export const fetchGoogleSheetsConfig = async (id: string) => {
  const configRes = await fetch(`/api/google-sheets/${id}/idx/1`);
  const configData = await configRes.json();
  const values = configData.values as Array<Array<string>>;

  const configuration = formatRawValuesToArrayOfRecords(values);

  if (!configuration || !configuration.length) {
    throw "no google sheets configuration";
  }

  return { configuration };
};
