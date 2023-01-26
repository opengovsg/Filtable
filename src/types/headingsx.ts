export const mandatoryHeadings = ["Filtable Title", "Title"] as const;
export type MandatoryHeadings = (typeof mandatoryHeadings)[number];

export const optionalHeadings = ["Description", "Link URL"] as const;
export type OptionalHeadings = (typeof optionalHeadings)[number];

export const headings = [...mandatoryHeadings, ...optionalHeadings] as const;
export type Headings = MandatoryHeadings | OptionalHeadings;
