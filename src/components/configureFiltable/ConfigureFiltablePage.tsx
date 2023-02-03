import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  SingleSelect,
  BxX,
  BxPlus,
  Input,
  IconButton,
  Button,
} from "@opengovsg/design-system-react";
import type { NextRouter } from "next/router";
import type { ChangeEvent, FC } from "react";
import { useState, useMemo } from "react";
import useSheetsData from "../../hooks/useSheetsData";
import type { HeadingConfig } from "../../types/configuration";
import type { Headings } from "../../types/headings";
import {
  initEmptyHeadingConfig,
  encodeConfig,
  convertCollectionOfTags,
  extractTags,
} from "../../utils/configuration";
import { ROUTES } from "../../utils/routes";
import ErrorPage from "../emptyStates/ErrorPage";
import LoadingPage from "../emptyStates/LoadingPage";
import PreviewListing from "./PreviewListing";

type Props = {
  router: NextRouter;
  googleSheetId?: string | string[] | undefined;
  csvKey?: string | string[] | undefined;
};

const ConfigureFiltablePage: FC<Props> = ({
  router,
  googleSheetId,
  csvKey,
}) => {
  const [configuration, setConfiguration] = useState<HeadingConfig>(
    initEmptyHeadingConfig()
  );
  // Allow users to dynamically create more checkboxes
  const [checkboxes, setCheckboxes] = useState<Array<string>>([""]);
  const { headings, firstRow, isLoading, errorMessage } = useSheetsData({
    googleSheetId,
    csvKey,
  });

  const selectHeadings: Array<Headings> = ["Title", "Description", "Link URL"];
  const headingsAsSelectItems = headings.map((heading) => ({ value: heading }));

  /**
   * Currying helper functions
   */
  const generateConfigurationTextInputHandleChange = (key: string) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setConfiguration((configuration) => ({
        ...configuration,
        [key]: event.target.value,
      }));
    };
  };

  const generateConfigurationSelectHandleChange = (key: string) => {
    return (value: string) => {
      setConfiguration((configuration) => ({
        ...configuration,
        [key]: value,
      }));
    };
  };

  const generateCheckboxesSelectHandleChange = (idx: number) => {
    return (value: string) => {
      setCheckboxes((checkboxes) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[idx] = value;
        return newCheckboxes;
      });
    };
  };

  const generateDeleteCheckbox = (idx: number) => {
    return () => {
      setCheckboxes((checkboxes) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes.splice(idx, 1);
        return newCheckboxes;
      });
    };
  };

  const addCheckbox = () => {
    setCheckboxes((checkboxes) => [...checkboxes, ""]);
  };

  const mergeCheckboxesWithConfig = (
    configuration: HeadingConfig,
    checkboxes: Array<string>
  ): Array<Record<string, string>> => {
    return checkboxes.reduce((acc, checkboxValue, idx) => {
      return { ...acc, [`Checkbox ${idx + 1}`]: checkboxValue };
    }, configuration as Array<Record<string, string>>);
  };

  const createFiltable = () => {
    const config = mergeCheckboxesWithConfig(configuration, checkboxes);
    const urlConfig = encodeConfig(config);

    if (googleSheetId) {
      void router.push(
        `/${ROUTES.GOOGLE_SHEETS}/${String(
          googleSheetId
        )}?urlConfig=${urlConfig}`
      );
    } else if (csvKey) {
      void router.push(
        `/${ROUTES.CSV}/${String(csvKey)}?urlConfig=${urlConfig}`
      );
    }
  };

  const convertedCollectionOfTags = useMemo(() => {
    return convertCollectionOfTags(
      extractTags(
        firstRow,
        mergeCheckboxesWithConfig(configuration, checkboxes)
      )
    );
  }, [configuration, checkboxes, firstRow]);

  if (errorMessage !== "") {
    return <ErrorPage errorMessage={errorMessage} />;
  } else if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Box p="24px" backgroundColor="blue.50" display="flex" flexDir="row">
      <Box maxW="1144px" mx="auto" w="full">
        <Text textStyle="h2" mb="24px">
          Configure your Filtable
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap="40px">
          <GridItem colSpan={1}>
            <Box display="flex" flexDir="column" gap="16px">
              <Box>
                <Text>Filtable Title</Text>
                <Input
                  value={configuration["Filtable Title"]}
                  onChange={generateConfigurationTextInputHandleChange(
                    "Filtable Title"
                  )}
                />
              </Box>
              {selectHeadings.map((heading) => {
                return (
                  <Box key={heading}>
                    <Text>{heading}</Text>
                    <SingleSelect
                      name={heading}
                      value={configuration[heading] ?? ""}
                      onChange={generateConfigurationSelectHandleChange(
                        heading
                      )}
                      items={headingsAsSelectItems}
                    />
                  </Box>
                );
              })}
              {checkboxes.map((checkbox, idx) => {
                const checkboxName = `Checkbox ${idx + 1}`;

                return (
                  <Box key={checkboxName} w="full">
                    <Text>{checkboxName}</Text>
                    <Box display="flex" gap="8px" w="full">
                      <SingleSelect
                        name={checkboxName}
                        value={checkbox}
                        onChange={generateCheckboxesSelectHandleChange(idx)}
                        items={headingsAsSelectItems}
                      />
                      <IconButton
                        aria-label="Delete Checkbox"
                        icon={<BxX />}
                        onClick={generateDeleteCheckbox(idx)}
                      />
                    </Box>
                  </Box>
                );
              })}
              <IconButton
                aria-label="Add Checkbox"
                icon={<BxPlus />}
                variant="outline"
                onClick={addCheckbox}
                w="fit-content"
              />
            </Box>
            <Button onClick={createFiltable} mt="24px">
              Create Filtable
            </Button>
          </GridItem>
          <GridItem colSpan={1}>
            <Box mt="24px">
              <Text textStyle="h4" mb="24px">
                Preview: {configuration["Filtable Title"]}
              </Text>
              <PreviewListing
                title={firstRow[configuration["Title"] ?? ""]}
                description={firstRow[configuration["Description"] ?? ""]}
                link={firstRow[configuration["Link URL"] ?? ""]}
                convertedCollectionOfTags={convertedCollectionOfTags}
              />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
export default ConfigureFiltablePage;
