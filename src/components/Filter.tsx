import { Checkbox } from "@opengovsg/design-system-react";
import type { Dispatch, FC, SetStateAction } from "react";
import type { HeadingConfig } from "../types/Configuration";
import {
  extractFilters,
  processExtractedFilters,
} from "../utils/Configuration";

type Props = {
  filter: Record<string, boolean>;
  setFilter: Dispatch<SetStateAction<Record<string, boolean>>>;
  configuration: HeadingConfig;
};

const Filter: FC<Props> = ({ filter, setFilter, configuration }) => {
  const extractedFilters = extractFilters(configuration);
  const processedFilters = processExtractedFilters(extractedFilters);

  const { checkbox } = processedFilters;

  return (
    <div className="fixed left-12 top-24 flex flex-col bg-blue-200 p-4">
      <h1 className="mb-4 text-xl font-bold">Filters</h1>
      {checkbox.map((value) => (
        <div key={value} className="flex items-center gap-1">
          <input
            type="checkbox"
            id={value}
            onChange={(event) =>
              setFilter({ ...filter, [value]: event.target.checked })
            }
          />
          <label htmlFor={value}>{value}</label>
        </div>
      ))}
    </div>
  );
};
export default Filter;
