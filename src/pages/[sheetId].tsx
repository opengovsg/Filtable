// React
import { useEffect, useState } from "react";
// Components
import { Box, Text } from "@chakra-ui/react";
import { IconButton } from "@opengovsg/design-system-react";
import BxFilterAlt from "../components/icons/BxFilterAlt";
import BxShareAlt from "../components/icons/BxShareAlt";
import Listing from "../components/Listing";
// Utils
import { useRouter } from "next/router";
import {
  extractFilters,
  initEmptyHeadingConfig,
  processExtractedFilters,
} from "../utils/configuration";
import { initUnselectedFilters } from "../utils/filter";
// Types
import type { NextPage } from "next";
import type { HeadingConfig } from "../types/configuration";
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
    <Box p="24px" backgroundColor="blue.50">
      <Box display="flex" flexDir="row" w="full" gap="16px">
        <Text textStyle="h5" noOfLines={2}>
          {configuration["Filtable Title"]}
        </Text>
        <Box display="flex" flexDir="row" gap="8px" ml="auto">
          <IconButton
            aria-label="Share"
            variant="outline"
            colorScheme="" //TODO: FIND CORRECT COLOUR SCHEME
            icon={<BxShareAlt />}
          />
          <IconButton
            aria-label="Filter"
            variant="outline"
            //TODO: FIND CORRECT COLOUR SCHEME
            icon={<BxFilterAlt />}
          />
        </Box>
      </Box>
      <Text textStyle="body-2" mt="16px" mb="12px">
        {data.length} listing{data.length !== 1 ? "s" : ""}
      </Text>
      {/* <Filter
          filter={filter}
          setFilter={setFilter}
          configuration={configuration}
        /> */}
      <Box display="flex" flexDir="column" alignItems="center" gap="12px">
        {data.map((listing, idx) => (
          <Listing
            listing={listing}
            filter={filter}
            configuration={configuration}
            key={idx}
          />
        ))}
      </Box>
    </Box>
  );
};
export default FilterPage;
