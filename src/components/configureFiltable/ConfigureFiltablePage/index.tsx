import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  SingleSelect,
  BxX,
  BxPlus,
  Input,
  IconButton,
  Button,
  BxChevronLeft,
} from "@opengovsg/design-system-react";
import type { NextRouter } from "next/router";
import type { ChangeEvent, FC } from "react";
import { useState, useMemo } from "react";
import useSheetsData from "../../../hooks/useSheetsData";
import type { HeadingConfig } from "../../../types/configuration";
import type { Headings } from "../../../types/headings";
import {
  initEmptyHeadingConfig,
  encodeConfig,
  convertCollectionOfTags,
  extractTags,
} from "../../../utils/configuration";
import { ROUTES } from "../../../utils/routes";
import ErrorPage from "../../emptyStates/ErrorPage";
import LoadingPage from "../../emptyStates/LoadingPage";
import BxLeftArrowAlt from "../../icons/BxLeftArrowAlt";
import Navbar from "../../landing/Navbar";
import PreviewListing from "../PreviewListing";
import PageOne from "./PageOne";
import PageThree from "./PageThree";
import PageTwo from "./PageTwo";

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
  const [page, setPage] = useState(1);

  const [configuration, setConfiguration] = useState<HeadingConfig>(
    initEmptyHeadingConfig()
  );
  // Allow users to dynamically create more checkboxes
  const [checkboxes, setCheckboxes] = useState<Array<string>>([""]);
  const { data, headings, firstRow, isLoading, errorMessage } = useSheetsData({
    googleSheetId,
    csvKey,
  });

  const selectHeadings: Array<Headings> = ["Title", "Description", "Link URL"];
  const headingsAsSelectItems = headings.map((heading) => ({ value: heading }));

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

  const createFiltable = () => {
    const urlConfig = encodeConfig([configuration]);

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
    return convertCollectionOfTags(extractTags(firstRow, configuration));
  }, [configuration, checkboxes, firstRow]);

  const handleBack = () => {
    if (page === 1) {
      void router.push("/");
    } else {
      setPage((page) => page - 1);
    }
  };

  const handleNext = () => {
    if (page !== 3) {
      setPage((page) => page + 1);
    }
  };

  if (errorMessage !== "") {
    return <ErrorPage errorMessage={errorMessage} />;
  } else if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Navbar />
      <Box
        backgroundColor="blue.50"
        display="flex"
        flexDir="row"
        justifyContent="center"
      >
        <Box
          maxW="1440px"
          w="full"
          display="flex"
          justifyContent="center"
          // px="264px" // Gives content max width of 912px
          px="208px" // Gives content max width of 1024px
          // px="148px" // Give content max width of 1144px
        >
          <Box w="full" display="flex" justifyContent="center">
            <Box w="full" position="relative">
              <Box
                top="0"
                right="100%"
                position="absolute"
                display="flex"
                gap="4px"
                alignItems="center"
                mr="50px"
                mt="4px"
                cursor="pointer"
              >
                <BxLeftArrowAlt />
                <Text
                  textStyle="subhead-1"
                  userSelect="none"
                  color="interaction.links.neutral-default"
                  _hover={{ color: "base.content.strong" }}
                  onClick={handleBack}
                >
                  Back
                </Text>
              </Box>
              {page === 1 ? (
                <PageOne
                  data={data}
                  headings={headings}
                  configuration={configuration}
                  setConfiguration={setConfiguration}
                  handleNext={handleNext}
                />
              ) : null}
              {page === 2 ? (
                <PageTwo
                  data={data}
                  headings={headings}
                  configuration={configuration}
                  setConfiguration={setConfiguration}
                  handleNext={handleNext}
                />
              ) : null}
              {page === 3 ? (
                <PageThree
                  firstRow={firstRow}
                  headings={headings}
                  configuration={configuration}
                  setConfiguration={setConfiguration}
                  createFiltable={createFiltable}
                />
              ) : null}
            </Box>
            {/* <Text textStyle="h2" mb="24px">
              Configure your Filtable
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap="40px">
              <GridItem colSpan={1}>
                <Box display="flex" flexDir="column" gap="16px">
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
            </Grid> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ConfigureFiltablePage;
