import {
  Show,
  Box,
  Grid,
  GridItem,
  Button,
  Text,
  Link,
  Divider,
} from "@chakra-ui/react";
import { Attachment, Input } from "@opengovsg/design-system-react";
import type { ChangeEventHandler, FC } from "react";
import { useState } from "react";
import { TEMPLATE_LINK, H4PG_LINK } from "../../utils/constants";
import LandingSection from "./LandingSection";

type Props = {
  sheetsLink: string;
  handleChangeSheetsLink: ChangeEventHandler<HTMLInputElement>;
  createFiltableFromLink: () => void;
  file: File | undefined;
  handleUploadFile: (file?: File | undefined) => void;
  createFiltableFromCsv: () => Promise<void>;
};

const DesktopLandingPage: FC<Props> = ({
  sheetsLink,
  handleChangeSheetsLink,
  createFiltableFromLink,
  file,
  handleUploadFile,
  createFiltableFromCsv,
}) => {
  const [fileUploadError, setFileUploadError] = useState("");

  const handleFileValidation = (file: File) => {
    if (file.type !== "text/csv") {
      return "Please upload a .CSV file";
    }
    setFileUploadError("");
    return null;
  };

  const handleFileUploadError = (error: string) => {
    setFileUploadError(error);
  };

  return (
    <Show above="md">
      <Box bg="brand.primary.50" display="flex" flexDir="column" px="64px">
        <Box maxW="1144px" w="full" mx="auto" display="flex" flexDir="column">
          <Grid templateColumns="repeat(2 ,1fr)">
            <GridItem
              colSpan={1}
              display="flex"
              flexDir="column"
              justifyContent="center"
              gap="32px"
              pr="40px"
            >
              <Text textStyle="h1">Turn tables into filterable lists</Text>
              <Box
                display="flex"
                bg="white"
                p="24px"
                rounded="16px"
                flexDir="column"
                shadow="sm"
                mb="128px"
              >
                <Box>
                  <Text mb="12px" textStyle="subhead-1">
                    Paste a google sheets link
                  </Text>
                  <Box display="flex" gap="8px">
                    <Input
                      value={sheetsLink}
                      onChange={handleChangeSheetsLink}
                      placeholder="docs.google.com/spreadsheets/"
                    />
                    <Button onClick={createFiltableFromLink}>
                      Make me filtable
                    </Button>
                  </Box>
                </Box>

                <Box
                  color="slate.200"
                  display="flex"
                  alignItems="center"
                  gap="24px"
                  my="32px"
                >
                  <Divider border="1px" />
                  <Text textStyle="subhead-3">OR</Text>
                  <Divider border="1px" />
                </Box>

                <Box display="flex" flexDir="column">
                  <Box display="flex" justifyContent="space-between">
                    <Text textStyle="subhead-1" mb="12px">
                      Upload a .CSV file
                    </Text>
                    {fileUploadError ? (
                      <Text color="red.400">{fileUploadError}</Text>
                    ) : null}
                  </Box>
                  <Attachment
                    name="file"
                    value={file}
                    onChange={handleUploadFile}
                    onFileValidation={handleFileValidation}
                    onError={handleFileUploadError}
                  />
                  {file ? (
                    <Button
                      mt="12px"
                      onClick={() => {
                        void createFiltableFromCsv();
                      }}
                    >
                      Upload .CSV file
                    </Button>
                  ) : (
                    <Text
                      textStyle="body-2"
                      color="base.content.medium"
                      mt="8px"
                    >
                      Maximum file size: 20 MB
                    </Text>
                  )}
                </Box>
              </Box>
            </GridItem>
            <GridItem colSpan={1} display="grid" placeItems="flex-start">
              <img src="landing-page-1.png" alt="Sheets Image" />
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <Box bg="white" display="flex" flexDir="column" px="64px">
        <Box
          maxW="912px"
          mx="auto"
          display="flex"
          flexDir="column"
          alignItems="center"
          bg="white"
        >
          <Text textStyle="h2" mx="auto" mt="64px">
            Get started
          </Text>
          <LandingSection
            contentSide="right"
            heading="Setup your 'database' in google sheets"
            imgUrl="landing-page-2.png"
            contentBody={
              <>
                <Text textStyle="body-1">
                  Duplicate this <Link href={TEMPLATE_LINK}>template</Link> to
                  get started. Make sure to follow the formatting!
                </Text>
                <Text textStyle="caption-2">
                  *The BETA version of Filtable only supports 1 Title column, 1
                  Description column, 1 link column, and any amount of Filter
                  columns. In the future, we hope to allow users to add as many
                  content columns as they’d need!
                </Text>
              </>
            }
          />
          <LandingSection
            contentSide="left"
            heading="Make it publicly viewable"
            imgUrl="landing-page-3.png"
            contentBody={
              <Text>
                Change your permissions so that “Anyone with the link” can view
                the google sheet.
              </Text>
            }
          />
          <LandingSection
            contentSide="right"
            heading="Copy and paste the link above"
            imgUrl="landing-page-4.png"
            contentBody={
              <Text>
                We’ll do the work for you! Any new changes to your google sheet
                will be automatically updated to the Filtable.
              </Text>
            }
          />
          <LandingSection
            contentSide="left"
            heading="Share or embed"
            imgUrl="landing-page-5.png"
            contentBody={
              <Text>
                Your Filtable is up and running! Share the link with others, or
                embed it into a website using an iframe.
              </Text>
            }
          />
        </Box>
      </Box>
      <Box
        bg="brand.primary.50"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        py="74px"
      >
        <Text textStyle="h2" mb="16px" textAlign="center">
          Meet the team
        </Text>
        <Text textStyle="body-1" textAlign="center" whiteSpace="pre-wrap">
          Filtable is a project under Open Government Products’{"\n"}
          <Link href={H4PG_LINK} target="_blank" rel="noreferrer">
            Hack for Public Good 2023
          </Link>
          .
        </Text>
      </Box>
    </Show>
  );
};
export default DesktopLandingPage;
