import { filterKeywords } from "../types/configuration";

export const isFilterKeyword = (key: string | undefined): boolean => {
  if (key === undefined) {
    return false;
  }

  return (filterKeywords as unknown as Array<string>).includes(key);
};

export const extractFirstToken = (word: string) => {
  return word.split(" ")[0];
};

export const extractSheetId = (sheetsLink: string) => {
  return sheetsLink.split("/")[5] || "";
};

export const extractUrlHost = (link: string | undefined) => {
  if (link === undefined) {
    return "No link provided";
  }

  try {
    return new URL(link).host;
  } catch (error) {
    return "Invalid link";
  }
};

export const isValidLink = (link: string | undefined) => {
  if (link === undefined) {
    return false;
  }

  try {
    new URL(link);
    return true;
  } catch (error) {
    return false;
  }
};

export const splitConcatenatedTags = (concatenatedTags: string | undefined) => {
  if (concatenatedTags === undefined) {
    return [];
  }

  return concatenatedTags.split(";");
};