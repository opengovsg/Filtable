/**
 * These headings will cause an error to be thrown if NOT provided in the configuration
 */
export const mandatoryHeadings = [] as const;
export type MandatoryHeadings = (typeof mandatoryHeadings)[number];

export const optionalHeadings = [
  "Filtable Title",
  "Title",
  "Description",
  "Link URL",
] as const;
export type OptionalHeadings = (typeof optionalHeadings)[number];

export const headings = [...mandatoryHeadings, ...optionalHeadings] as const;
export type Headings = MandatoryHeadings | OptionalHeadings;
