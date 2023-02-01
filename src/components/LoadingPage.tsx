import { Box } from "@chakra-ui/react";
import { Spinner } from "@opengovsg/design-system-react";
import type { FC } from "react";

const LoadingPage: FC = () => {
  return (
    <>
      <Box
        minH="calc(100vh - 32px)" // TODO: 32px is the GovMast height
        w="full"
        display="grid"
        placeItems="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="8px"
        >
          <Spinner fontSize="8xl" />
          Loading...
        </Box>
      </Box>
    </>
  );
};
export default LoadingPage;
