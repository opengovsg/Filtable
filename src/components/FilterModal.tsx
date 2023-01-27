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
import { getTagColorScheme } from "../utils/configuration";
import { enumerateAllFilterOptions } from "../utils/filter";
// Types
import type { Dispatch, FC, SetStateAction } from "react";
import type { Filter, FilterKeywords } from "../types/filter";

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
  const allFilterOptions = enumerateAllFilterOptions(
    listings,
    processedFilters
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent p="24px" pt="42px">
        <ModalCloseButton top="42px" right="24px" />
        <Text textStyle="h5" mb="26px">
          All filters
        </Text>
        {Object.entries(allFilterOptions["Checkbox"] ?? {}).map((y, idx) => {
          const [checkboxName, set] = y;
          return (
            <Box key={checkboxName} py="16px">
              <>
                <Text textStyle="subhead-2" mb="8px">
                  {checkboxName}
                </Text>
                <Box display="flex" flexDir="row" flexWrap="wrap" gap="8px">
                  {Array.from(set as Set<string>).map((option) => {
                    const isSelected = ((filter["Checkbox"] ?? {})[
                      checkboxName
                    ] ?? {})[option];
                    const handleToggle = () => {
                      setFilter({
                        ...filter,
                        Checkbox: {
                          ...filter["Checkbox"],
                          [checkboxName]: {
                            ...filter["Checkbox"][checkboxName],
                            [option]: !((filter["Checkbox"] ?? {})[
                              checkboxName
                            ] ?? {})[option],
                          },
                        },
                      });
                    };

                    return (
                      <Tag
                        key={`${checkboxName}-${option}`}
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
        })}
        {/* TODO: Add apply filters functionality */}
        <Button mt="auto" onClick={onClose}>
          Apply filters
        </Button>
      </ModalContent>
    </Modal>
  );
};
export default FilterModal;
