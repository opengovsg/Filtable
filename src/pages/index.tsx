import { useState } from "react";
// Components
import {
  Box,
  Grid,
  GridItem,
  Hide,
  ListItem,
  OrderedList,
  Show,
  Text,
} from "@chakra-ui/react";
import { Button, BxPlus, Input } from "@opengovsg/design-system-react";
import Navbar from "../components/Navbar";
// Utils
import { extractSheetId, isValidLink } from "../utils/strings";
import { useRouter } from "next/router";
// Types
import type { ChangeEvent } from "react";
import { type NextPage } from "next";
// Constants
import { PLACEHOLDER_SHEETS_LINK } from "../utils/constants";

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
        <Box bg="brand.primary.50" display="flex" flexDir="row" px="64px">
          <Box maxW="912px" w="full" mx="auto" display="flex" flexDir="column">
            <Grid templateColumns="repeat(2 ,1fr)" pt="32px" pb="96px">
              <GridItem
                colSpan={1}
                display="flex"
                flexDir="column"
                gap="32px"
                mr="32px"
              >
                <Text textStyle="h1">Turn tables into filterable lists</Text>
                <Box display="flex" gap="8px">
                  <Input
                    value={sheetsLink}
                    onChange={handleChangeSheetsLink}
                    placeholder={PLACEHOLDER_SHEETS_LINK}
                  />
                  <Button onClick={handleFilter}>Make me filtable</Button>
                </Box>
              </GridItem>
              <GridItem
                colSpan={1}
                display="grid"
                placeItems="center"
                ml="74px"
              >
                <Text textStyle="h1">IMAGE</Text>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2 ,1fr)" py="74px">
              <GridItem
                colSpan={1}
                display="grid"
                placeItems="center"
                mr="74px"
              >
                <Text textStyle="h1">IMAGE</Text>
              </GridItem>
              <GridItem colSpan={1} display="flex" flexDir="column">
                <Text textStyle="h2" mb="16px">
                  How to get started
                </Text>
                <OrderedList>
                  <ListItem>
                    Setup a “database” in a Google Sheet by copying your data
                    into the first sheet
                  </ListItem>
                  <ListItem>
                    Create a second sheet to setup your columns by following
                    this Template
                  </ListItem>
                  <ListItem>
                    Enable general access such that Anyone with the link can
                    view the sheet
                  </ListItem>

                  <ListItem>
                    Copy the link to the sheet and paste it in the link above!
                  </ListItem>
                </OrderedList>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2 ,1fr)" py="74px">
              <GridItem colSpan={1} display="flex" flexDir="column">
                <Text textStyle="h2" mb="16px">
                  Who we are
                </Text>
                <Text>
                  We’re a team from Open Government Products. Filtable is a
                  product under our #Hackforpublicgood
                </Text>
              </GridItem>
              <GridItem
                colSpan={1}
                display="grid"
                placeItems="center"
                ml="74px"
              >
                <Text textStyle="h1">IMAGE</Text>
              </GridItem>
            </Grid>
          </Box>
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
