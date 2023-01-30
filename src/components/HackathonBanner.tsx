import { Box, Text } from "@chakra-ui/react";
import type { FC } from "react";

const HackathonBanner: FC = () => {
  return (
    <Box
      bg="black"
      py="1"
      px="8"
      display="flex"
      flexDir="row"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        textStyle="body-2"
        textColor="white"
        textAlign="center"
        fontSize="xs"
      >
        Filtable is a work-in-progress hackathon project for OGP&apos;s Hack for
        Public Good
      </Text>
    </Box>
  );
};
export default HackathonBanner;
