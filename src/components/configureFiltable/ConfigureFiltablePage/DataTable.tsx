import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from "@chakra-ui/react";
import type { FC } from "react";
import React from "react";

type Props = {
  data: Array<Record<string, string>>;
  headings: Array<string>;
};

const DataTable: FC<Props> = ({ data, headings }) => {
  return (
    <TableContainer mt="16px" mb="64px" maxHeight="240px" overflowY="scroll">
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
  );
};
export default React.memo(DataTable);
