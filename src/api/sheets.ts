/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GOOGLE_API_URL } from "../utils/constants";

/**
 * @param id ID of the Google Sheet (e.g. 1irSfdHrKOHhs-5xaNjVvJKCJHjf-wsQIz9F_NWlOios)
 * @param sheetIdx
 * @returns Data in the sheet formatted in the form of a config and data (array of key value pairs)
 */
export const fetchSheet = async (id: string, sheetIdx: number) => {
  const res = await fetch(
    `${GOOGLE_API_URL}/${id}?key=${
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""
    }`
  );
  const data: any = await res.json();

  const sheetTitle: string = data.sheets[sheetIdx].properties.title as string;

  const sheetRes = await fetch(
    `${GOOGLE_API_URL}/${id}/values/${sheetTitle}?key=${
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? ""
    }`
  );
  const sheetData = await sheetRes.json();
  const values = sheetData.values as Array<Array<string>>;

  // Extract configuration
  const configRow = values[0];
  const headerRow = values[1];

  if (!configRow || !headerRow) {
    throw "Config Row and Header Row are Undefined";
  }

  const config: Record<string, string> = {};

  configRow.forEach((configCell: string, idx) => {
    if (configCell !== "") {
      config[configCell] = String(headerRow[idx]);
    }
  });
  const formattedConfig = [config];

  // Format data
  const formattedData: Array<Record<string, string>> = [];

  const dataRows = values.slice(2);

  dataRows.forEach((row) => {
    const rowData: Record<string, string> = {};
    row.forEach((item, idx) => {
      const headerCell = headerRow[idx];
      if (headerCell) {
        rowData[headerCell] = item;
      }
    });
    formattedData.push(rowData);
  });

  return { configuration: formattedConfig, data: formattedData };
};

export const fetchFirstSheet = async (id: string) => {
  return await fetchSheet(id, 0);
};
