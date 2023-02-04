import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  Button,
  BxRightArrowAlt,
  Checkbox,
  Tag,
} from "@opengovsg/design-system-react";
import { ChangeEvent, Dispatch, FC, SetStateAction, useMemo } from "react";
import type { HeadingConfig } from "../../../types/configuration";
import {
  convertCollectionOfTags,
  extractTags,
  getTagColorScheme,
  processConfigurationToFilters,
} from "../../../utils/configuration";
import { enumerateAllFilterOptions } from "../../../utils/filter";
import BxLeftArrowAlt from "../../icons/BxLeftArrowAlt";
import PreviewListing from "../PreviewListing";

type Props = {
  firstRow: Record<string, string>;
  headings: Array<string>;
  configuration: HeadingConfig;
  setConfiguration: Dispatch<SetStateAction<HeadingConfig>>;
  createFiltable: () => void;
};

const PageThree: FC<Props> = ({
  firstRow,
  headings,
  configuration,
  setConfiguration,
  createFiltable,
}) => {
  const selectHeadings: Array<Headings> = ["Title", "Description", "Link URL"];

  const convertedCollectionOfTags = useMemo(() => {
    return convertCollectionOfTags(extractTags(firstRow, configuration));
  }, [configuration, firstRow]);

  return (
    <Box>
      <Grid gridTemplateColumns="repeat(2, 1fr)" gap="132px">
        <GridItem colSpan={1}>
          <Box w="full">
            <Text textStyle="h4" color="base.content.strong">
              Design the listing
            </Text>
            <Text textStyle="body-2" mt="4px" color="base.content.medium">
              Map column headers to each display field of a listing
            </Text>
            {selectHeadings.map((heading) => {
              return (
                <Box key={heading}>
                  <Text>{heading}</Text>
                  <SingleSelect
                    name={heading}
                    value={configuration[heading] ?? ""}
                    onChange={generateConfigurationSelectHandleChange(heading)}
                    items={headingsAsSelectItems}
                  />
                </Box>
              );
            })}
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <PreviewListing
            title={firstRow[configuration["Title"] ?? ""]}
            description={firstRow[configuration["Description"] ?? ""]}
            link={firstRow[configuration["Link URL"] ?? ""]}
            convertedCollectionOfTags={convertedCollectionOfTags}
          />
        </GridItem>
      </Grid>
      <Box mb="240px" display="flex" alignItems="center" gap="32px">
        <Button
          textStyle="subhead-1"
          display="flex"
          alignItems="center"
          rightIcon={<BxRightArrowAlt fontSize="lg" />}
          onClick={createFiltable}
        >
          Create Filtable
        </Button>
        <Text textStyle="caption-2" color="base.content.medium">
          3 of 3
        </Text>
      </Box>
    </Box>
  );
};
export default PageThree;
