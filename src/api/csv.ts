/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//TODO: FIX ABOVE
export const getCsvData = async (fileKey: string) => {
  const res = await fetch(`/api/csv/${fileKey}`);
  const data = await res.json();
  console.log("Fetched with data:", data);
};

export const getFixedCsvData = async () => {
  const res = await fetch("/api/csv/e93935d5-de8c-4ee3-9e30-4bc7badeeb79.csv");
  const data = await res.json();
  console.log("Fetched fixed with data:", data);
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
