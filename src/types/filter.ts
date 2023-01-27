export const filterKeywords = ["Checkbox"] as const;
export type FilterKeywords = (typeof filterKeywords)[number];

export type Filter = Record<
  FilterKeywords,
  Record<string, Record<string, boolean>>
>;
