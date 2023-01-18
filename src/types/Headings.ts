export const mandatoryHeadings = ["title"] as const;
export type MandatoryHeadings = (typeof mandatoryHeadings)[number];

export const optionalHeadings = [
  "description",
  "imageUrl",
  "clickHereUrl",
] as const;
export type OptionalHeadings = (typeof optionalHeadings)[number];

export const headings = [...mandatoryHeadings, ...optionalHeadings] as const;
export type Headings = MandatoryHeadings | OptionalHeadings;
