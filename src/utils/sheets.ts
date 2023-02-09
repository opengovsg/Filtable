/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// TODO: Fix TypeScript errors

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
