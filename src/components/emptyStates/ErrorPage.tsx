import { Box, Button, Text } from "@chakra-ui/react";
import { BxChevronLeft } from "@opengovsg/design-system-react";
import router from "next/router";
import type { FC } from "react";
import BxRefresh from "../icons/BxRefresh";

type Props = { errorMessage: string };

const ErrorPage: FC<Props> = ({ errorMessage }) => {
  return (
    <>
      <Box
        p="24px"
        minH="calc(100vh - 32px)" // TODO: 32px is the gov mast height
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
          <Text textStyle="h5" textAlign="center">
            {errorMessage}
          </Text>
          <Box
            display={{
              base: "flex",
            }}
            flexDir={{ base: "column-reverse", md: "row" }}
            gap="8px"
            mt="16px"
          >
            <Button
              leftIcon={<BxChevronLeft />}
              variant="outline"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text textStyle="subhead-1" onClick={() => router.back()}>
                Back
              </Text>
            </Button>
            <Button
              leftIcon={<BxRefresh />}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text textStyle="subhead-1" onClick={() => router.reload()}>
                Try again
              </Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ErrorPage;
