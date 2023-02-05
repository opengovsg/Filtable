import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  Button,
  BxPlus,
  BxRightArrowAlt,
  IconButton,
  SingleSelect,
} from "@opengovsg/design-system-react";
import type { Dispatch, FC, SetStateAction } from "react";
import { useMemo, useState } from "react";
import type { HeadingConfig } from "../../../types/configuration";
import {
  convertCollectionOfTags,
  extractTags,
} from "../../../utils/configuration";
import BxMinusCircle from "../../icons/BxMinusCircle";
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
  const [texts, setTexts] = useState<Array<string>>([]);

  /**
   * Helper functions
   */
  const handleAddText = () => {
    setTexts((texts) => [...texts, ""]);
  };

  /**
   * Currying helper functions
   */
  const generateConfigurationSelectHandleChange = (key: string) => {
    return (value: string) => {
      setConfiguration((configuration) => ({
        ...configuration,
        [key]: value,
      }));
    };
  };

  const generateTextSelectHandleChange = (idx: number) => {
    return (value: string) => {
      setTexts((texts) => {
        const newTexts = [...texts];
        newTexts[idx] = value;
        return newTexts;
      });
    };
  };

  const generateRemoveText = (idx: number) => {
    return () => {
      setTexts((texts) => {
        const newTexts = [...texts];
        newTexts.splice(idx, 1);
        return newTexts;
      });
    };
  };

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
            <Box mt="32px" mb="64px" display="flex" flexDir="column" gap="24px">
              {["Title", "Description"].map((heading) => {
                return (
                  <Box key={heading}>
                    <Text textStyle="subhead-1" mb="12px">
                      {heading}
                    </Text>
                    <SingleSelect
                      isClearable={false}
                      name={heading}
                      value={configuration[heading] ?? ""}
                      onChange={generateConfigurationSelectHandleChange(
                        heading
                      )}
                      items={headings}
                    />
                  </Box>
                );
              })}
              {texts.map((text, idx) => {
                const label = `Text ${idx + 1}`;

                return (
                  <Box key={idx}>
                    <Text textStyle="subhead-1" mb="12px">
                      {label}
                    </Text>
                    <Box display="flex" w="full">
                      <Box w="full">
                        <SingleSelect
                          isClearable={false}
                          name={label}
                          value={text}
                          onChange={generateTextSelectHandleChange(idx)}
                          items={headings}
                        />
                      </Box>
                      <IconButton
                        icon={<BxMinusCircle />}
                        aria-label="Delete Text"
                        colorScheme="brand.secondary"
                        variant="inputAttached"
                        onClick={generateRemoveText(idx)}
                      />
                    </Box>
                  </Box>
                );
              })}
              <Button
                variant="outline"
                w="fit-content"
                leftIcon={<BxPlus />}
                colorScheme="base.content.strong"
                onClick={handleAddText}
              >
                Add more rows of text
              </Button>
              <Box>
                <Text textStyle="subhead-1" mb="12px">
                  Link
                </Text>
                <SingleSelect
                  isClearable={false}
                  name="Link"
                  value={configuration["Link"] ?? ""}
                  onChange={generateConfigurationSelectHandleChange("Link")}
                  items={headings}
                />
              </Box>
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <PreviewListing
            title={firstRow[configuration["Title"] ?? ""]}
            description={firstRow[configuration["Description"] ?? ""]}
            link={firstRow[configuration["Link"] ?? ""]}
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
