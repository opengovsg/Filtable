import { Box, Heading } from "@chakra-ui/react";
import type { FC } from "react";

const Navbar: FC = () => {
  return (
    <Box
      as="nav"
      w="full"
      bg="blue.50"
      border="1px"
      borderColor="blue.100"
      px="24px"
      py="12px"
    >
      <Heading
        as="h6"
        fontWeight={500}
        lineHeight="1.5rem"
        fontSize="1.125rem"
        letterSpacing="-0.014em"
      >
        Filtable
      </Heading>
    </Box>
  );
};
export default Navbar;
