import { useState } from "react";
// Components
import { Box, Text } from "@chakra-ui/react";
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
    </>
  );
};

export default Home;
