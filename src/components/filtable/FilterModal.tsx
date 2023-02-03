import { useEffect, useState } from "react";
// Components
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Text,
  Box,
} from "@chakra-ui/react";
import { Button, BxCheck, Tag } from "@opengovsg/design-system-react";
// Utils
import { getTagColorScheme } from "../../utils/configuration";
import {
  enumerateAllFilterOptions,
  generateToggleOrChangeFilterOption,
} from "../../utils/filter";
// Types
import type { Dispatch, FC, SetStateAction } from "react";
import type { Filter, FilterKeywords } from "../../types/filter";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  listings: Array<Record<string, string>>;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  processedFilters: Record<FilterKeywords, Array<string>>;
};

const FilterModal: FC<Props> = ({
  isOpen,
  onClose,
  listings,
  filter,
  setFilter,
  processedFilters,
}) => {
  const [temporaryFilter, setTemporaryFilter] = useState(filter);

  const allFilterOptions = enumerateAllFilterOptions(
    listings,
    processedFilters
  );

  const closeAndResetFilters = () => {
    setTemporaryFilter(filter);
    onClose();
  };

  const closeAndApplyFilters = () => {
    setFilter(temporaryFilter);
    onClose();
  };

  // So that when (1) Filters are enabled; (2) Filters are turned off by pressing 'X' on the tag; (3) The filter modal is opened; The `temporaryFilter` is updated instead of being stuck on the old state
  useEffect(() => {
    setTemporaryFilter(filter);
  }, [filter, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAndResetFilters}
      size={{
        base: "full",
        md: "sm",
      }}
    >
      <ModalOverlay />
      <ModalContent
        p="24px"
        pt="42px"
        minH={"fill-available"}
        h={{ base: "100%", md: "fit-content" }}
      >
        <ModalCloseButton top="42px" right="24px" />
        <Text textStyle="h5" mb="26px">
          All filters
        </Text>
        {Object.entries(allFilterOptions["Checkbox"] ?? {}).map(
          (entries, idx) => {
            const [heading, set] = entries;
            return (
              <Box key={heading} py="16px">
                <>
                  <Text textStyle="subhead-2" mb="8px">
                    {heading}
                  </Text>
                  <Box display="flex" flexDir="row" flexWrap="wrap" gap="8px">
                    {Array.from(set as Set<string>).map((option) => {
                      const isSelected = ((temporaryFilter["Checkbox"] ?? {})[
                        heading
                      ] ?? {})[option];
                      const handleToggle = () => {
                        setTemporaryFilter(
                          generateToggleOrChangeFilterOption(option, heading)
                        );
                      };

                      return (
                        <Tag
                          key={`${heading}-${option}`}
                          variant={isSelected ? "solid" : "subtle"}
                          minW="fit-content"
                          whiteSpace="nowrap"
                          cursor="pointer"
                          display="flex"
                          flexDirection="row"
                          gap="4px"
                          alignItems="center"
                          colorScheme={getTagColorScheme(idx)}
                          onClick={handleToggle}
                        >
                          {isSelected ? <BxCheck /> : null}
                          <Text textStyle="body-2">{option}</Text>
                        </Tag>
                      );
                    })}
                  </Box>
                </>
              </Box>
            );
          }
        )}
        {/* TODO: Add apply filters functionality */}
        <Button mt="auto" onClick={closeAndApplyFilters}>
          Apply filters
        </Button>
      </ModalContent>
    </Modal>
  );
};
export default FilterModal;
