import { useEffect, useState } from "react";
// Components
import { Box, Text } from "@chakra-ui/react";
import ErrorPage from "../../emptyStates/ErrorPage";
import LoadingPage from "../../emptyStates/LoadingPage";
import BxLeftArrowAlt from "../../icons/BxLeftArrowAlt";
import Navbar from "../../landing/Navbar";
import PageOne from "./PageOne";
import PageThree from "./PageThree";
import PageTwo from "./PageTwo";
// Utils
import useSheetsData from "../../../hooks/useSheetsData";
import { initEmptyHeadingConfig } from "../../../utils/configuration";
// Types
import type { NextRouter } from "next/router";
import type { FC } from "react";
import type { HeadingConfig } from "../../../types/configuration";

type Props = {
  router: NextRouter;
  combinedIdAndGid?: string | string[] | undefined;
  csvKey?: string | string[] | undefined;
};

const ConfigureFiltablePage: FC<Props> = ({
  router,
  combinedIdAndGid,
  csvKey,
}) => {
  const [page, setPage] = useState(1);

  const [configuration, setConfiguration] = useState<HeadingConfig>(
    initEmptyHeadingConfig()
  );
  const { title, data, headings, firstRow, isLoading, errorMessage } =
    useSheetsData({
      combinedIdAndGid,
      csvKey,
    });

  const handleBack = () => {
    if (page === 1) {
      void router.push("/");
    } else {
      setPage((page) => page - 1);
    }
  };

  const handleNext = () => {
    if (page !== 3) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    setConfiguration((configuration) => ({
      ...configuration,
      ["Filtable Title"]: title,
    }));
  }, [title]);

  if (errorMessage !== "") {
    return <ErrorPage errorMessage={errorMessage} />;
  } else if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Navbar />
      <Box
        backgroundColor="blue.50"
        display="flex"
        flexDir="row"
        justifyContent="center"
      >
        <Box
          maxW="1440px"
          w="full"
          display="flex"
          justifyContent="center"
          // px="264px" // Gives content max width of 912px
          px="208px" // Gives content max width of 1024px
          // px="148px" // Give content max width of 1144px
        >
          <Box w="full" display="flex" justifyContent="center">
            <Box w="full" position="relative">
              <Box
                top="0"
                right="100%"
                position="absolute"
                display="flex"
                gap="4px"
                alignItems="center"
                mr="50px"
                mt="4px"
                cursor="pointer"
              >
                <BxLeftArrowAlt />
                <Text
                  textStyle="subhead-1"
                  userSelect="none"
                  color="interaction.links.neutral-default"
                  _hover={{ color: "base.content.strong" }}
                  onClick={handleBack}
                >
                  Back
                </Text>
              </Box>
              {page === 1 ? (
                <PageOne
                  data={data}
                  headings={headings}
                  configuration={configuration}
                  setConfiguration={setConfiguration}
                  handleNext={handleNext}
                />
              ) : null}
              {page === 2 ? (
                <PageTwo
                  data={data}
                  headings={headings}
                  configuration={configuration}
                  setConfiguration={setConfiguration}
                  handleNext={handleNext}
                />
              ) : null}
              {page === 3 ? (
                <PageThree
                  firstRow={firstRow}
                  headings={headings}
                  configuration={configuration}
                  setConfiguration={setConfiguration}
                  combinedIdAndGid={combinedIdAndGid}
                  csvKey={csvKey}
                  router={router}
                />
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ConfigureFiltablePage;
