/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// TODO: Fix TypeScript errors

import { decodeUrlConfig } from "./configuration";

/**
 * For Google Sheet Data + Same Sheet Config
 */
export const formatSingleSheetToDataAndConfig = (sheetData: any) => {
  const values = sheetData.values as Array<Array<string>>;

  // Format configuration
  const configRows = values.slice(0, 2);
  const configArrayOfRecords = formatRawValuesToArrayOfRecords(configRows);

  // Format data
  const rows = values.slice(1);
  const dataArrayOfRecords = formatRawValuesToArrayOfRecords(rows);

  return {
    configuration: configArrayOfRecords,
    data: dataArrayOfRecords,
  };
};

/**
 * For Google Sheet Data + 2nd Sheet Config
 */
export const formatSheetsToDataAndConfig = (
  sheetData: any,
  configData: any
) => {
  const sheetDataArrayOfRecords = formatRawValuesToArrayOfRecords(
    sheetData.values
  );
  const configDataArrayOfRecords = formatRawValuesToArrayOfRecords(
    configData.values
  );

  return {
    configuration: configDataArrayOfRecords,
    data: sheetDataArrayOfRecords,
  };
};

/**
 * For Google Sheet Data + URL Config
 */
export const formatDataSheetWithUrlConfig = (
  sheetData: any,
  urlConfig: string
) => {
  const sheetDataArrayOfRecords = formatRawValuesToArrayOfRecords(
    sheetData.values
  );

  const decodedConfiguration = [decodeUrlConfig(urlConfig)];

  return { data: sheetDataArrayOfRecords, configuration: decodedConfiguration };
};

/**
 * To extract headings and first row of data from Google Sheets 2d array
 */
export const extractSheetHeadingsAndFirstRow = (sheetData: any) => {
  const values = sheetData.values as Array<Array<string>>;

  if (!values[0] || !values[0].length || !values[1] || !values[1].length) {
    throw "no data";
  }

  return { headings: values[0], firstRowArray: values[1] };
};

/**
 * To convert a 2d array of cells into an array of JSON where each object has key value pairs where key is column heading and value is row cell value
 */
export const formatRawValuesToArrayOfRecords = (
  rawValues: Array<Array<string>>
) => {
  const headerRow = rawValues[0];
  const dataRows = rawValues.slice(1);

  if (!headerRow || !dataRows) {
    throw "No data in sheet found";
  }

  const arrayOfRecords: Array<Record<string, string>> = [];

  dataRows.forEach((row) => {
    const rowData: Record<string, string> = {};
    row.forEach((cell, idx) => {
      const headerCell = headerRow[idx];
      if (headerCell) {
        rowData[headerCell] = cell;
      }
    });
    arrayOfRecords.push(rowData);
  });

  return arrayOfRecords;
};
