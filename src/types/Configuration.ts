import type { MandatoryHeadings, OptionalHeadings } from "./Headings";

export type HeadingConfig = {
  [Property in MandatoryHeadings]: string;
} & {
  [Property in OptionalHeadings]+?: string;
};

export const filterOpen = "{";
export const filterClose = "}";

export const filterKeywords = ["checkbox"] as const;
export type FilterKeywords = (typeof filterKeywords)[number];
