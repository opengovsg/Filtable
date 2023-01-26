import { useState } from "react";
// Components
import { AddIcon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Button, Input } from "@opengovsg/design-system-react";
// Utils
import { extractSheetId, isInvalidLink } from "../utils/strings";
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
    if (isInvalidLink(sheetsLink)) {
      return;
    }
    const sheetId = extractSheetId(sheetsLink);
    void router.push(sheetId);
  };

  return (
    <Box
      px="24px"
      py="32px"
      minH="calc(100vh - 82px)"
      bg="brand.primary.50"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" flexDir="column" alignItems="center" mb="82px">
        <Heading
          textAlign="center"
          as="h5"
          fontWeight={600}
          lineHeight="1.75rem"
          fontSize="1.25rem"
          letterSpacing="-0.014em"
        >
          Convert a google sheet into a filterable table in minutes.
        </Heading>
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
          leftIcon={<AddIcon />}
          w="full"
        >
          <Text
            fontWeight={500}
            lineHeight="1.5rem"
            fontSize="1rem"
            letterSpacing="-0.006em"
          >
            Create new table
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
