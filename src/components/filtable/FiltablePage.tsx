// React
import type { Dispatch, FC, SetStateAction } from "react";
import { useCallback, useState } from "react";
// Components
import { Box, Text } from "@chakra-ui/react";
import { BxX, IconButton, Tag } from "@opengovsg/design-system-react";
import BxFilterAlt from "../icons/BxFilterAlt";
import BxShareAlt from "../icons/BxShareAlt";
import Listing from "./Listing";
import ShareModal from "./ShareModal";
import FilterModal from "./FilterModal";
import ErrorPage from "../emptyStates/ErrorPage";
import LoadingPage from "../emptyStates/LoadingPage";
// Utils
import {
  currentlySelectedFilters,
  generateToggleOrChangeFilterOption,
  isAnyFilterSelected,
} from "../../utils/filter";
import { generateShowingResults } from "../../utils/strings";
// Types
import type { Filter, FilterKeywords } from "../../types/filter";
import type { HeadingConfig } from "../../types/configuration";

type Props = {
  isLoading: boolean;
  errorMessage: string;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  data: Array<Record<string, string>>;
  filteredData: Array<Record<string, string>>;
  configuration: HeadingConfig;
  processedFilters: Record<FilterKeywords, Array<string>>;
};

const FiltablePage: FC<Props> = ({
  isLoading,
  errorMessage,
  filter,
  setFilter,
  data,
  filteredData,
  configuration,
  processedFilters,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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

  if (errorMessage !== "") {
    return <ErrorPage errorMessage={errorMessage} />;
  } else if (isLoading) {
    return <LoadingPage />;
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
        <Box maxW="1144px" mx="auto" w="full">
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
            {filteredData.map((listing, idx) => (
              <Listing
                key={idx}
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
export default FiltablePage;
