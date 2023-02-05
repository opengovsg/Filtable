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
import {
  Attachment,
  BxRightArrowAlt,
  Input,
} from "@opengovsg/design-system-react";
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
                  <Text
                    textStyle="legal"
                    color="interaction.critical.default"
                    mt="32px"
                  >
                    *No sensitive data should be uploaded to Filtable
                  </Text>
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
          id="how-it-works"
        >
          <Text textStyle="h2" mr="auto" my="64px">
            How it works 🤔
          </Text>
          <Box display="flex" flexDir="column" gap="64px" mb="80px">
            <Grid templateColumns="repeat(2 ,1fr)" gap="40px">
              <GridItem colSpan={1} display="flex" flexDir="column" gap="16px">
                <img
                  src="sheets-logo.png"
                  alt="Google Sheets Logo"
                  width="46.55px"
                />
                <Text textStyle="h4">Paste a google sheets link</Text>
                <Text textStyle="body-2">
                  Make sure to change your permissions so that “Anyone with the
                  link” can view the google sheet. Any new edits to your google
                  sheet will be automatically updated to the Filtable.
                </Text>
                <Link
                  display="flex"
                  alignItems="center"
                  gap="10px"
                  variant="standalone"
                  p="0"
                >
                  <Text textStyle="subhead-1">
                    Use our sample sheet to try it out
                  </Text>
                  <BxRightArrowAlt fontSize="lg" />
                </Link>
              </GridItem>
              <GridItem colSpan={1} display="flex" flexDir="column" gap="16px">
                <img
                  src="excel-logo.png"
                  alt="Microsoft Excel Logo"
                  width="68.77px"
                />
                <Text textStyle="h4">Or upload a .CSV file</Text>
                <Text textStyle="body-2">
                  .csv files cannot be updated/changed after the Filtable has
                  been made. You’d have to re-upload a new file and create a new
                  Filtable.
                </Text>
              </GridItem>
            </Grid>
            <LandingSection
              contentSide="left"
              heading="Transform rows in a table into listings"
              imgUrl="transform-rows.png"
              contentBody={
                <>
                  <Text textStyle="body-1">
                    After uploading or sharing your table, Filtable will analyse
                    your data and turn each row into one listing in the list.
                    You can design how the listing looks like by mapping your
                    table’s columns to a <strong>Title</strong>,{" "}
                    <strong>Description</strong>, <strong>Link</strong>, and{" "}
                    <strong>Tag</strong> field.
                  </Text>
                  <Text textStyle="body-1" mt="24px">
                    Filtable also supports the addition of{" "}
                    <strong>multiple text or tag columns</strong>.
                  </Text>
                </>
              }
            />
            <LandingSection
              contentSide="right"
              heading="Your Filtable users can then use filters to narrow their search"
              imgUrl="narrow-search.png"
              contentBody={
                <Text textStyle="body-1">
                  After creation, users of your Filtable can then select
                  specific tags and return results, visit links directly, and
                  share resources with others.
                </Text>
              }
            />
          </Box>
        </Box>
      </Box>
      <Box bg="brand.primary.50" display="flex" flexDir="column" px="64px">
        <Box
          maxW="912px"
          mx="auto"
          display="flex"
          flexDir="column"
          alignItems="center"
          id="pro-tips"
        >
          <Text textStyle="h2" mr="auto" mt="80px" mb="48px">
            Pro tips 💡
          </Text>
          <Box display="flex" flexDir="column" gap="48px" mb="80px">
            <LandingSection
              contentSide="left"
              heading="Create multiple filters"
              imgUrl="create-multiple-filters.png"
              contentBody={
                <>
                  <Text textStyle="body-1">
                    Multiple layers of filters allow users to search through
                    your list more efficiently! Filtable will assign different
                    colour schemes to different filter categories.
                  </Text>
                  <Text textStyle="body-1" fontStyle="italic" mt="24px">
                    Filtable currently does not allow users to exclude a
                    specific tag.
                  </Text>
                </>
              }
            />
            <LandingSection
              contentSide="right"
              heading="Add multiple tags"
              imgUrl="add-multiple-tags.png"
              contentBody={
                <>
                  <Text textStyle="body-1">
                    A listing can be associated with more than one tag. Add
                    multiple tags by splitting them with a semicolon(;) in your
                    table.
                  </Text>
                  <Text textStyle="code-1" my="24px">
                    tag 1;tag 2;tag 3{" "}
                  </Text>
                  <Text textStyle="body-1">
                    Be careful! Commas will not split tags – instead they’ll be
                    included in tags.
                  </Text>
                </>
              }
            />
            <LandingSection
              contentSide="left"
              heading="Add additional lines of text"
              imgUrl="add-additional-text.png"
              contentBody={
                <Text textStyle="body-1">
                  Split up useful info across multiple fields so it’s easier for
                  users to read through! Only description fields appear in
                  preview.
                </Text>
              }
            />
          </Box>
        </Box>
      </Box>

      <Box
        bg="white"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        py="74px"
      >
        <Text textStyle="h2" mb="16px" textAlign="center">
          About the team
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
