import { useState } from "react";
// Components
import { Box, Grid, GridItem, Hide, Show, Text } from "@chakra-ui/react";
import { Button, BxPlus, Input, Link } from "@opengovsg/design-system-react";
import Navbar from "../components/Navbar";
// Utils
import { extractSheetId, isValidLink } from "../utils/strings";
import { useRouter } from "next/router";
// Types
import type { ChangeEvent } from "react";
import { type NextPage } from "next";
// Constants
import {
  H4PG_LINK,
  PLACEHOLDER_SHEETS_LINK,
  TEMPLATE_LINK,
} from "../utils/constants";
import LandingSection from "../components/LandingSection";

const Home: NextPage = () => {
  const router = useRouter();
  const [sheetsLink, setSheetsLink] = useState("");

  const handleChangeSheetsLink = (event: ChangeEvent<HTMLInputElement>) => {
    setSheetsLink(event.target.value);
  };

  const handleFilter = () => {
    if (isValidLink(sheetsLink)) {
      const sheetId = extractSheetId(sheetsLink);
      void router.push(sheetId);
    }
  };

  return (
    <>
      <Navbar />
      {/* DESKTOP LANDING PAGE */}
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
                <Box display="flex" gap="8px">
                  <Input
                    value={sheetsLink}
                    onChange={handleChangeSheetsLink}
                    placeholder="Paste a google sheets link"
                  />
                  <Button onClick={handleFilter}>Make me filtable</Button>
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
                    *The BETA version of Filtable only supports 1 Title column,
                    1 Description column, 1 link column, and any amount of
                    Filter columns. In the future, we hope to allow users to add
                    as many content columns as they’d need!
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
                  Change your permissions so that “Anyone with the link” can
                  view the google sheet.
                </Text>
              }
            />
            <LandingSection
              contentSide="right"
              heading="Copy and paste the link above"
              imgUrl="landing-page-4.png"
              contentBody={
                <Text>
                  We’ll do the work for you! Any new changes to your google
                  sheet will be automatically updated to the Filtable.
                </Text>
              }
            />
            <LandingSection
              contentSide="left"
              heading="Share or embed"
              imgUrl="landing-page-5.png"
              contentBody={
                <Text>
                  Your Filtable is up and running! Share the link with others,
                  or embed it into a website using an iframe.
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

      {/* MOBILE LANDING PAGE */}
      <Hide above="md">
        <Box
          px="24px"
          py="32px"
          minH="calc(100vh - 82px)" // TODO: 82px is the sum of the govmastheight + navbar height
          bg="brand.primary.50"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box display="flex" flexDir="column" alignItems="center" mb="82px">
            <Text textAlign="center" textStyle="h5">
              Convert a google sheet into a filterable table in minutes.
            </Text>
            <Input
              value={sheetsLink}
              onChange={handleChangeSheetsLink}
              placeholder={PLACEHOLDER_SHEETS_LINK}
              mt="32px"
              mb="16px"
            />
            <Button
              onClick={handleFilter}
              background="brand.secondary.700"
              leftIcon={<BxPlus />}
              w="full"
            >
              <Text textStyle="subhead-1">Create new table</Text>
            </Button>
          </Box>
        </Box>
      </Hide>
    </>
  );
};

export default Home;
