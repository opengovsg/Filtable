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

export const extractSheetId = (sheetsLink: string) => {
  return sheetsLink.split("/")[5] || "";
};

export const extractUrlHost = (link: string | undefined) => {
  if (link === undefined || link === "") {
    return "No link provided";
  }

  try {
    return new URL(link).host;
  } catch (error) {
    return link;
  }
};

export const isValidLink = (link: string | undefined) => {
  if (link === undefined || link === "") {
    return false;
  }

  //TODO: Build a proper link validator
  return true;
  // const pattern = new RegExp(
  //   "^(https?:\\/\\/)?" + // protocol
  //     "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
  //     "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
  //     "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
  //     "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
  //     "(\\#[-a-z\\d_]*)?$",
  //   "i"
  // ); // fragment locator
  // return !!pattern.test(link);
};

export const splitConcatenatedTags = (concatenatedTags: string | undefined) => {
  if (concatenatedTags === undefined) {
    return [];
  }

  return concatenatedTags.split(";").filter((tag) => tag !== "");
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
