import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Input } from "@opengovsg/design-system-react";
import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import type { HeadingConfig } from "../../../types/configuration";

type Props = {
  data: Array<Record<string, string>>;
  configuration: HeadingConfig;
  setConfiguration: Dispatch<SetStateAction<HeadingConfig>>;
};

const PageOne: FC<Props> = ({ data, configuration, setConfiguration }) => {
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
      <Text textStyle="h4">Name your Filtable</Text>
      <Text textStyle="body-2" mt="4px">
        Filtable Title
      </Text>
      <Input
        mt="12px"
        value={configuration["Filtable Title"]}
        onChange={generateConfigurationTextInputHandleChange("Filtable Title")}
      />
      <Text textStyle="subhead-1" mt="32px">
        {`${data.length} row${data.length !== 1 ? "s" : ""} detected`}
      </Text>
      <Text textStyle="body-2">
        In the next step we’ll choose which of these columns to use as filters
      </Text>
      {data && data.length ? (
        <TableContainer mt="16px" maxHeight="240px" overflowY="scroll">
          <Table variant="unstyled">
            <Thead
              bgColor="brand.primary.100"
              position="sticky"
              top={0}
              zIndex="docked"
            >
              <Tr>
                {Object.keys(data[0] ?? {}).map((heading) => (
                  <Th key={heading} px="16px" py="14px">
                    <Text textStyle="caption-1" color="brand.primary.500">
                      {heading}
                    </Text>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((entry, idx) => {
                const values = Object.values(entry);
                return (
                  <Tr key={idx}>
                    {values.map((value) => (
                      <Td key={value} px="16px" py="14px">
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
    </Box>
  );
};
export default PageOne;
