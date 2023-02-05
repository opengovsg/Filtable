import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Button, BxRightArrowAlt, Input } from "@opengovsg/design-system-react";
import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import React from "react";
import type { HeadingConfig } from "../../../types/configuration";

type Props = {
  data: Array<Record<string, string>>;
  headings: Array<string>;
  configuration: HeadingConfig;
  setConfiguration: Dispatch<SetStateAction<HeadingConfig>>;
  handleNext: () => void;
};

const PageOne: FC<Props> = ({
  data,
  headings,
  configuration,
  setConfiguration,
  handleNext,
}) => {
  /**
   * Currying helper functions
   */
  const generateConfigurationTextInputHandleChange = (key: string) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setConfiguration((configuration) => ({
        ...configuration,
        [key]: event.target.value,
      }));
    };
  };

  return (
    <Box>
      <Text textStyle="h4" color="base.content.strong">
        Name your Filtable
      </Text>
      <Text textStyle="body-2" mt="4px" color="base.content.medium">
        Filtable Title
      </Text>
      <Input
        mt="12px"
        value={configuration["Filtable Title"]}
        onChange={generateConfigurationTextInputHandleChange("Filtable Title")}
      />
      <Text textStyle="subhead-1" mt="32px" color="base.content.strong">
        {`${data.length} row${data.length !== 1 ? "s" : ""} detected`}
      </Text>
      <Text textStyle="body-2" color="base.content.default">
        In the next step we’ll choose which of these columns to use as filters
      </Text>
      {data && data.length ? (
        <TableContainer
          mt="16px"
          mb="64px"
          maxHeight="240px"
          overflowY="scroll"
        >
          <Table variant="unstyled">
            <Thead
              bgColor="brand.primary.100"
              position="sticky"
              top={0}
              zIndex="docked"
            >
              <Tr>
                {headings.map((heading) => (
                  <Th key={heading} px="16px" py="14px">
                    <Text
                      textStyle="caption-1"
                      textTransform="none"
                      color="brand.primary.500"
                    >
                      {heading}
                    </Text>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((entry) => {
                const values = Object.values(entry);
                return (
                  <Tr key={JSON.stringify(entry)}>
                    {values.map((value, idx) => (
                      <Td key={`${value}-${idx}`} px="16px" py="14px">
                        <Text textStyle="caption-2">{value}</Text>
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : null}
      <Box mb="240px" display="flex" alignItems="center" gap="32px">
        <Button
          textStyle="subhead-1"
          display="flex"
          alignItems="center"
          rightIcon={<BxRightArrowAlt fontSize="lg" />}
          onClick={handleNext}
        >
          Next
        </Button>
        <Text textStyle="caption-2" color="base.content.medium">
          1 of 3
        </Text>
      </Box>
    </Box>
  );
};
export default React.memo(PageOne);
