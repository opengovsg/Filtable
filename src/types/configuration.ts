import type { MandatoryHeadings, OptionalHeadings } from "./headings";

export type HeadingConfig = {
  [Property in MandatoryHeadings]: string;
} & {
  [Property in OptionalHeadings]+?: string;
} & { [key: string]: string };

export type ConfigLocation = "url" | "secondSheet";
