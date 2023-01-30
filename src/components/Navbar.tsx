// Components
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Hide, Show, Text } from "@chakra-ui/react";
// Utils
import { useRouter } from "next/router";
// Types
import type { FC } from "react";
import FiltableIcon from "./icons/FiltableIcon";

type Props = {
  filtableTitle?: string;
};

const Navbar: FC<Props> = ({ filtableTitle }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Box
      as="nav"
      w="full"
      bg="blue.50"
      border={{ base: "1px", md: "0" }}
      borderColor="blue.100"
      px="24px"
      py={{ base: "12px", md: "92px" }}
      display="flex"
      flexDir="row"
    >
      <Box
        maxW="912px"
        w="full"
        display="flex"
        flexDir="row"
        position="relative"
        mx="auto"
      >
        {filtableTitle ? (
          <>
            <ArrowBackIcon
              position="absolute"
              left="24px"
              top="0"
              bottom="0"
              my="auto"
              onClick={handleBack}
            />
            <Text textStyle="body-2" mx="auto">
              {filtableTitle}
            </Text>
          </>
        ) : (
          <>
            <Hide above="md">
              <FiltableIcon size="sm" />
            </Hide>
            <Show above="md">
              <FiltableIcon size="lg" />
            </Show>
          </>
        )}
      </Box>
    </Box>
  );
};
export default Navbar;
