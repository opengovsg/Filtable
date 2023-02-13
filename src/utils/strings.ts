import { string } from "zod";
import { filterKeywords } from "../types/filter";

export const isFilterKeyword = (key: string | undefined): boolean => {
  if (key === undefined) {
    return false;
  }

  return (filterKeywords as unknown as Array<string>).includes(key);
};

export const extractFirstToken = (word: string) => {
  return word.split(" ")[0];
};

/**
 * @deprecated
 */
export const extractId = (sheetsLink: string) => {
  return sheetsLink.split("/")[5] || "";
};

export const extractIdAndGid = (sheetsLink: string) => {
  const id = sheetsLink.split("/")[5];
  const gid = sheetsLink.split("/")[6]?.split("#")[1]?.split("=")[1];

  if (!id || !gid) {
    throw "Invalid GSheet Link";
  }

  return { id, gid };
};

export const combinedIdAndGid = (id: string, gid: string) => {
  return `${id};${gid}`;
};

export const separateIdAndGid = (s: string) => {
  if (s.split(";").length === 2) {
    console.log("A link with ID;GID was detected");
    const id = s.split(";")[0] as string;
    const gid = s.split(";")[1];

    return { id, gid };
  } else {
    console.log("A link with only ID was detected");

    return { id: s, gid: undefined };
  }
};

export const extractUrlHost = (link: string | undefined) => {
  if (link === undefined || link === "") {
    return "No link";
  }

  return link;
};

export const isDefinedLink = (link: string | undefined) => {
  if (link === undefined || link === "") {
    return false;
  }

  return true;
};

export const splitConcatenatedTags = (concatenatedTags: string | undefined) => {
  if (concatenatedTags === undefined) {
    return [];
  }

  return concatenatedTags
    .split(";")
    .filter((tag) => tag !== "")
    .map((tag) => tag.trim());
};

export const generateIFrame = (url: string, title: string | undefined) => {
  const iframeTag = `<iframe width="560" height="315" src=${url} title=${`Filtable - ${
    title ?? ""
  }`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

  return iframeTag;
};

export const generateShowingResults = (count: number) => {
  return `Showing ${count} result${count !== 1 ? "s" : ""}`;
};

export const stripQueryParams = (link: string | string[]) => {
  return String(link).split("?")[0] ?? "";
};

const removeCsvType = (fileName: string) => {
  return fileName.slice(0, fileName.lastIndexOf(".csv"));
};

const addCsvType = (fileName: string) => {
  return `${fileName}.csv`;
};

export const joinTitleAndUuid = (fileName: string, uuid: string) => {
  return addCsvType(`${removeCsvType(fileName)};${uuid}`);
};

export const splitTitleAndUuid = (csvKey: string) => {
  const csvKeyRemoved = removeCsvType(csvKey);
  const delimiterIdx = csvKeyRemoved.lastIndexOf(";");
  const title = csvKeyRemoved.slice(0, delimiterIdx);
  const uuid = csvKeyRemoved.slice(delimiterIdx);
  const fileName = addCsvType(title);

  return { title, uuid, fileName };
};
