import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import Listing from "../components/Listing";
import type { HeadingConfig } from "../types/Configuration";
import {
  extractFilters,
  initEmptyHeadingConfig,
  processExtractedFilters,
} from "../utils/Configuration";
import { initUnselectedFilters } from "../utils/Filter";
import { ConfigurationResponse, GoogleSheetResponse } from "../zodSchemas";

const FilterPage: NextPage = () => {
  const router = useRouter();
  const { sheetId } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [configuration, setConfiguration] = useState<HeadingConfig>(
    initEmptyHeadingConfig()
  );
  const [filter, setFilter] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (sheetId) {
          const dataFetch = fetch(
            `${
              process.env.NEXT_PUBLIC_OPEN_SHEET_API ?? ""
            }/${sheetId.toString()}/1`
          );
          const configFetch = fetch(
            `${
              process.env.NEXT_PUBLIC_OPEN_SHEET_API ?? ""
            }/${sheetId.toString()}/2`
          );

          const [dataResponse, configurationResponse] = await Promise.all([
            dataFetch,
            configFetch,
          ]);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const [data, configuration] = await Promise.all([
            dataResponse.json(),
            configurationResponse.json(),
          ]);

          const validatedData = GoogleSheetResponse.parse(data);
          const validatedConfiguration = ConfigurationResponse.parse(
            configuration
          )[0] as HeadingConfig;

          // Setting up initial filters
          setFilter(
            initUnselectedFilters(
              processExtractedFilters(extractFilters(validatedConfiguration))
            )
          );

          setData(validatedData);
          setConfiguration(validatedConfiguration);
          setIsLoading(false);
        }
      };

      void fetchData();
    } catch (error) {
      alert("An error has occurred while fetching the data");
    } finally {
    }
  }, [sheetId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-8 text-xl font-bold">Listings</h1>
      <Filter
        filter={filter}
        setFilter={setFilter}
        configuration={configuration}
      />
      <div className="flex w-[50vw] flex-col items-center gap-4">
        {data.map((listing, idx) => (
          <Listing
            listing={listing}
            filter={filter}
            configuration={configuration}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};
export default FilterPage;
