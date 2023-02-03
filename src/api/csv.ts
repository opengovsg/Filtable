/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//TODO: FIX ABOVE
export const fetchCsvData = async (fileKey: string) => {
  const res = await fetch(`/api/csv/${fileKey}`);
  const data = (await res.json()) as Array<Record<string, string>>;
  const headings = Object.keys(data[0] ?? []);
  const firstRow = data[0];

  if (!data || !data.length || !headings || !headings.length || !firstRow) {
    throw "no csv file data";
  }

  return { data, headings, firstRow };
};

export const uploadCsvFile = async (file: File): Promise<string> => {
  if (file) {
    const res = await fetch("/api/csv/upload", {
      method: "PUT",
      body: file,
    });
    const data = await res.json();
    return data.Key as string;
  }

  throw "No file provided";
};
