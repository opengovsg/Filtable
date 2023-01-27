// React
import { useCallback, useEffect, useState } from "react";
// Components
import { Box, Text } from "@chakra-ui/react";
import { IconButton, Spinner } from "@opengovsg/design-system-react";
import BxFilterAlt from "../components/icons/BxFilterAlt";
import BxShareAlt from "../components/icons/BxShareAlt";
import Listing from "../components/Listing";
import ShareModal from "../components/ShareModal";
import FilterModal from "../components/FilterModal";
// Utils
import { useRouter } from "next/router";
import {
  extractFilters,
  initEmptyHeadingConfig,
  initEmptyProcessedFilters,
  processExtractedFilters,
} from "../utils/configuration";
import {
  doesListingPassFilter,
  initEmptyFilters,
  initUnselectedFilters,
  isAnyFilterSelected,
} from "../utils/filter";
// Types
import type { NextPage } from "next";
import type { HeadingConfig } from "../types/configuration";
import type { Filter, FilterKeywords } from "../types/filter";
import { ConfigurationResponse, GoogleSheetResponse } from "../zodSchemas";

const FilterPage: NextPage = () => {
  const router = useRouter();
  const { sheetId } = router.query;

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState<Filter>(initEmptyFilters());
  const [data, setData] = useState<Array<Record<string, string>>>([]);
  const [configuration, setConfiguration] = useState<HeadingConfig>(
    initEmptyHeadingConfig()
  );
  const [processedFilters, setProcessedFilters] = useState<
    Record<FilterKeywords, Array<string>>
  >(
    //TODO:
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
    initEmptyProcessedFilters()
  );

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
          const processedFilters = processExtractedFilters(
            extractFilters(validatedConfiguration)
          );

          setFilter(initUnselectedFilters(validatedData, processedFilters));
          setProcessedFilters(processedFilters);
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

  const openShareModal = useCallback(() => {
    setIsShareModalOpen(true);
  }, []);

  const closeShareModal = useCallback(() => {
    setIsShareModalOpen(false);
  }, []);

  const openFilterModal = useCallback(() => {
    setIsFilterModalOpen(true);
  }, []);

  const closeFilterModal = useCallback(() => {
    setIsFilterModalOpen(false);
  }, []);

  const filteredData = data.filter((listing) =>
    doesListingPassFilter(listing, filter)
  );

  if (isLoading) {
    return (
      <Box
        minH="calc(100vh - 32px)"
        w="full"
        display="grid"
        placeItems="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="8px"
        >
          <Spinner fontSize="8xl" />
          Loading...
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box>
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={closeShareModal}
          filtableTitle={configuration["Filtable Title"]}
        />
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={closeFilterModal}
          listings={data}
          filter={filter}
          setFilter={setFilter}
          processedFilters={processedFilters}
        />
      </Box>
      <Box p="24px" backgroundColor="blue.50">
        <Box display="flex" flexDir="row" w="full" gap="16px">
          <Text textStyle="h5" noOfLines={2}>
            {configuration["Filtable Title"]}
          </Text>
          <Box display="flex" flexDir="row" gap="8px" ml="auto">
            <IconButton
              aria-label="Share"
              variant="outline"
              colorScheme="brand.secondary"
              icon={<BxShareAlt />}
              onClick={openShareModal}
            />
            <IconButton
              aria-label="Filter"
              variant={isAnyFilterSelected(filter) ? "solid" : "outline"}
              colorScheme="brand.primary"
              icon={<BxFilterAlt />}
              onClick={openFilterModal}
            />
          </Box>
        </Box>
        <Text textStyle="body-2" mt="16px" mb="12px">
          {filteredData.length} listing{filteredData.length !== 1 ? "s" : ""}
        </Text>
        <Box display="flex" flexDir="column" alignItems="center" gap="12px">
          {filteredData.map((listing) => (
            <Listing
              key={listing[configuration["Title"]]}
              listing={listing}
              configuration={configuration}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
export default FilterPage;
