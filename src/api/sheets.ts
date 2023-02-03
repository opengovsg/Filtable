/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//TODO: FIX TYPE ERRORS
import { GOOGLE_API_URL } from "../utils/constants";
import { formatRawValuesToArrayOfRecords } from "../utils/sheets";

/**
 * For JUST Google Sheet Data
 */
export const fetchGoogleSheetsData = async (id: string) => {
  const res = await fetch(
    `${GOOGLE_API_URL}/${id}?key=${
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""
    }`
  );

  if (res.status === 403) {
    throw "unauthorized";
  } else if (res.status === 404) {
    throw "not found";
  }

  const data: any = await res.json();

  const dataSheetTitle: string = data.sheets[0].properties.title as string;
  const sheetDataRes = await fetch(
    `${GOOGLE_API_URL}/${id}/values/${dataSheetTitle}?key=${
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""
    }`
  );
  const sheetData = await sheetDataRes.json();
  const values = sheetData.values as Array<Array<string>>;

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

  return { data: formattedData, headings, firstRow };
};

/**
 * Fetch Google Sheets (2nd sheet) config
 */
export const fetchGoogleSheetsConfig = async (id: string) => {
  const res = await fetch(
    `${GOOGLE_API_URL}/${id}?key=${
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""
    }`
  );

  if (res.status === 403) {
    throw "unauthorized";
  } else if (res.status === 404) {
    throw "not found";
  }

  const data: any = await res.json();

  const configSheetTitle: string = data.sheets[1].properties.title as string;

  const configDataRes = await fetch(
    `${GOOGLE_API_URL}/${id}/values/${configSheetTitle}?key=${
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""
    }`
  );

  const configData = await configDataRes.json();

  const values = configData.values as Array<Array<string>>;
  const configuration = formatRawValuesToArrayOfRecords(values);

  if (!configuration || !configuration.length) {
    throw "no google sheets configuration";
  }

  return { configuration };
};
