// React
import { useCallback, useEffect, useState } from "react";
// Components
import { Box, Text } from "@chakra-ui/react";
import {
  Button,
  BxChevronLeft,
  BxX,
  IconButton,
  Spinner,
  Tag,
} from "@opengovsg/design-system-react";
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
  currentlySelectedFilters,
  doesListingPassFilter,
  generateToggleOrChangeFilterOption,
  initEmptyFilters,
  initUnselectedFilters,
  isAnyFilterSelected,
} from "../utils/filter";
import { generateErrorMessage } from "../utils/errors";
// Types
import type { NextPage } from "next";
import type { HeadingConfig } from "../types/configuration";
import type { Filter, FilterKeywords } from "../types/filter";
import { ConfigurationResponse, GoogleSheetResponse } from "../zodSchemas";
import { generateShowingResults } from "../utils/strings";

const FilterPage: NextPage = () => {
  const router = useRouter();
  const { sheetId } = router.query;

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
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
    const fetchData = async () => {
      if (sheetId) {
        try {
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

          if (dataResponse.status === 400) {
            throw "unauthorized";
          }

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
        } catch (error) {
          setErrorMessage(generateErrorMessage(error));
        }
      }
    };

    void fetchData();
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

  if (errorMessage !== "") {
    return (
      <Box
        p="24px"
        minH="calc(100vh - 32px)" // TODO: 32px is the gov mast height
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
          <Text textStyle="h5" textAlign="center">
            {errorMessage}
          </Text>
          <Button
            leftIcon={<BxChevronLeft />}
            background="brand.secondary.700"
            w="full"
            mt="24px"
          >
            <Text textStyle="subhead-1" onClick={() => router.back()}>
              Try again
            </Text>
          </Button>
        </Box>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        minH="calc(100vh - 32px)" // TODO: 32px is the GovMast height
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
      <Box p="24px" backgroundColor="blue.50" display="flex" flexDir="row">
        <Box maxW="912px" mx="auto" w="full">
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
          {isAnyFilterSelected(filter) ? (
            <Box
              mt="16px"
              display="flex"
              flexDir="row"
              gap="8px"
              overflowY="scroll"
              flexWrap="nowrap"
            >
              {currentlySelectedFilters(filter).map(
                ([tag, colorScheme, heading]) => (
                  <Tag
                    key={tag}
                    colorScheme={colorScheme}
                    minW="fit-content"
                    display="flex"
                    flexDir="row"
                    alignItems="center"
                    gap="4px"
                  >
                    <Text textStyle="subhead-2">{tag}</Text>
                    <BxX
                      fontSize="xl"
                      cursor="pointer"
                      onClick={() =>
                        setFilter(
                          generateToggleOrChangeFilterOption(tag, heading)
                        )
                      }
                    />
                  </Tag>
                )
              )}
            </Box>
          ) : null}
          <Text textStyle="body-2" mt="16px" mb="12px">
            {generateShowingResults(filteredData.length)}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            gap="12px"
            minH="calc(100vh - 192px)" //TODO: 192px is the sum of height of (GovMastHead, Top Padding, Title, Tag height, Showing x results height)
          >
            {filteredData.map((listing) => (
              <Listing
                key={listing[configuration["Title"]]}
                listing={listing}
                configuration={configuration}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default FilterPage;
