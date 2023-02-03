import {
  Show,
  Box,
  Grid,
  GridItem,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { Input } from "@opengovsg/design-system-react";
import type { ChangeEventHandler, FC } from "react";
import { TEMPLATE_LINK, H4PG_LINK } from "../../utils/constants";
import LandingSection from "../LandingSection";

type Props = {
  sheetsLink: string;
  handleChangeSheetsLink: ChangeEventHandler<HTMLInputElement>;
  createFiltableFromLink: () => void;
  file: File | undefined;
  handleUploadFile: ChangeEventHandler<HTMLInputElement>;
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
              <Box display="flex" flexDir="column" gap="16px">
                <Box display="flex" gap="8px">
                  <Input
                    value={sheetsLink}
                    onChange={handleChangeSheetsLink}
                    placeholder="Paste a google sheets link"
                  />
                  <Button onClick={createFiltableFromLink}>
                    Make me filtable
                  </Button>
                </Box>
                <Box display="flex" gap="8px">
                  <Input type="file" onChange={handleUploadFile} />
                  <Button onClick={void createFiltableFromCsv}>
                    Upload CSV
                  </Button>
                </Box>
              </Box>
            </GridItem>
            <GridItem colSpan={1} display="grid" placeItems="center">
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
