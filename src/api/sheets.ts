/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//TODO: FIX TYPE ERRORS
import { GOOGLE_API_URL } from "../utils/constants";
import { checkDataAndConfigForErrors } from "../utils/errors";
import {
  formatSheetsToDataAndConfig,
  formatSingleSheetToDataAndConfig,
} from "../utils/sheets";

/**
 * @param id ID of the Google Sheet (e.g. 1irSfdHrKOHhs-5xaNjVvJKCJHjf-wsQIz9F_NWlOios)
 * @returns Data in the sheet formatted in the form of a config and data (array of key value pairs)
 */
export const fetchSingleSheetDataAndConfig = async (id: string) => {
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

  const sheetTitle: string = data.sheets[0].properties.title as string;
  const sheetRes = await fetch(
    `${GOOGLE_API_URL}/${id}/values/${sheetTitle}?key=${
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""
    }`
  );
  const sheetData = await sheetRes.json();

  const formattedData = formatSingleSheetToDataAndConfig(sheetData);
  checkDataAndConfigForErrors(formattedData);
  return formattedData;
};

export const fetchSheetDataAndConfig = async (id: string) => {
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
  const configSheetTitle: string = data.sheets[1].properties.title as string;

  const [sheetDataRes, configDataRes] = await Promise.all([
    fetch(
      `${GOOGLE_API_URL}/${id}/values/${dataSheetTitle}?key=${
        process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""
      }`
    ),
    fetch(
      `${GOOGLE_API_URL}/${id}/values/${configSheetTitle}?key=${
        process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""
      }`
    ),
  ]);
  const [sheetData, configData] = await Promise.all([
    sheetDataRes.json(),
    configDataRes.json(),
  ]);

  const formattedData = formatSheetsToDataAndConfig(sheetData, configData);
  checkDataAndConfigForErrors(formattedData);
  return formattedData;
};
