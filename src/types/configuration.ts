import type { MandatoryHeadings, OptionalHeadings } from "./headings";

export type HeadingConfig = {
  [Property in MandatoryHeadings]: string;
} & {
  [Property in OptionalHeadings]+?: string;
};

export const filterKeywords = ["Checkbox"] as const;
export type FilterKeywords = (typeof filterKeywords)[number];
