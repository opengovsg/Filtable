// Components
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
// Utils
import { useRouter } from "next/router";
// Types
import type { FC } from "react";

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
      border="1px"
      borderColor="blue.100"
      px="24px"
      py="12px"
      display="flex"
      flexDir="row"
      position="relative"
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
          <Text textStyle="h6">Filtable</Text>
        </>
      )}
    </Box>
  );
};
export default Navbar;
