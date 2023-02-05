import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  Button,
  BxRightArrowAlt,
  Checkbox,
  Tag,
} from "@opengovsg/design-system-react";
import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import type { HeadingConfig } from "../../../types/configuration";
import {
  getTagColorScheme,
  processConfigurationToFilters,
} from "../../../utils/configuration";
import { enumerateAllFilterOptions } from "../../../utils/filter";
import BxLeftArrowAlt from "../../icons/BxLeftArrowAlt";

type Props = {
  data: Array<Record<string, string>>;
  headings: Array<string>;
  configuration: HeadingConfig;
  setConfiguration: Dispatch<SetStateAction<HeadingConfig>>;
  handleNext: () => void;
};

const PageTwo: FC<Props> = ({
  data,
  headings,
  configuration,
  setConfiguration,
  handleNext,
}) => {
  const processedFilters = processConfigurationToFilters(configuration);
  const checkboxFilterOptions = enumerateAllFilterOptions(
    data,
    processedFilters
  )["Checkbox"];

  /**
   * Currying function to embed a checkbox heading
   * - If the checkbox is checked: Add a new entry in configuration 'Checkbox n': heading
   * - If the checkbox is unchecked: Remove all previous checkbox entries and re-add them (to preserve Checkbox numbering order)
   */
  const generateConfigurationHandleCheck = (heading: string) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const checkboxes = Object.entries(configuration).filter(
        ([key]) => key.split(" ")[0] === "Checkbox"
      );

      const { checked } = event.target;
      if (checked) {
        setConfiguration((configuration) => ({
          ...configuration,
          [`Checkbox ${checkboxes.length + 1}`]: heading,
        }));
      } else {
        setConfiguration((configuration) => {
          const newConfiguration = { ...configuration };
          checkboxes.forEach(([key]) => delete newConfiguration[key]);
          checkboxes
            .filter(([_, value]) => value !== heading)
            .forEach(([_, value], idx) => {
              newConfiguration[`Checkbox ${idx + 1}`] = value;
            });
          return newConfiguration;
        });
      }
    };
  };

  return (
    <Box>
      <Grid gridTemplateColumns="repeat(2, 1fr)" gap="132px">
        <GridItem colSpan={1}>
          <Box w="full">
            <Text textStyle="h4" color="base.content.strong">
              Select column headers to use as filters
            </Text>
            <Text textStyle="body-2" mt="4px" color="base.content.medium">
              Select a checkbox to preview the filter and tags under it
            </Text>
            <Box mt="32px" mb="64px">
              {headings.map((heading) => (
                <Checkbox
                  key={heading}
                  colorScheme="brand.secondary"
                  onChange={generateConfigurationHandleCheck(heading)}
                >
                  {heading}
                </Checkbox>
              ))}
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box
            bg="white"
            rounded="8px"
            shadow="sm"
            w="full"
            h="full"
            py="42px"
            px="24px"
            position="relative"
          >
            <Text textStyle="h5">Filter by</Text>
            {Object.keys(checkboxFilterOptions ?? {}).length ? (
              Object.entries(checkboxFilterOptions ?? {}).map(
                ([heading, set], idx) => {
                  return (
                    <Box key={heading} py="16px">
                      <Text textStyle="subhead-2" mb="8px">
                        {heading}
                      </Text>
                      <Box
                        display="flex"
                        flexDir="row"
                        flexWrap="wrap"
                        gap="8px"
                      >
                        {Array.from(set as Set<string>).map((option) => {
                          return (
                            <Tag
                              key={`${heading}-${option}`}
                              minW="fit-content"
                              whiteSpace="nowrap"
                              cursor="pointer"
                              display="flex"
                              flexDirection="row"
                              gap="4px"
                              alignItems="center"
                              colorScheme={getTagColorScheme(idx)}
                            >
                              <Text textStyle="body-2">{option}</Text>
                            </Tag>
                          );
                        })}
                      </Box>
                    </Box>
                  );
                }
              )
            ) : (
              <Box
                display="flex"
                alignItems="center"
                gap="4px"
                color="grey.300"
                position="absolute"
                m="auto"
                inset="0 0 0 0 "
                w="fit-content"
              >
                <BxLeftArrowAlt />
                <Text textStyle="subhead-2" whiteSpace="nowrap">
                  Select a checkbox and see them appear here!
                </Text>
              </Box>
            )}
          </Box>
        </GridItem>
      </Grid>
      <Box mb="240px" display="flex" alignItems="center" gap="32px">
        <Button
          textStyle="subhead-1"
          display="flex"
          alignItems="center"
          rightIcon={<BxRightArrowAlt fontSize="lg" />}
          onClick={handleNext}
        >
          Next
        </Button>
        <Text textStyle="caption-2" color="base.content.medium">
          2 of 3
        </Text>
      </Box>
    </Box>
  );
};
export default PageTwo;
