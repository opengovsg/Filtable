/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// TODO: Fix TypeScript errors

export const formatSingleSheetToDataAndConfig = (sheetData: any) => {
  const values = sheetData.values as Array<Array<string>>;

  // Format configuration
  const configRows = values.slice(0, 2);
  const configArrayOfRecords = formatRawValuesToArrayOfRecords(configRows);

  // Format data
  const rows = values.slice(1);
  const dataArrayOfRecords = formatRawValuesToArrayOfRecords(rows);

  return { configuration: configArrayOfRecords, data: dataArrayOfRecords };
};

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
