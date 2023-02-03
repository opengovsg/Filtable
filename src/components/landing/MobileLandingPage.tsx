import { Hide, Box, Button, Text } from "@chakra-ui/react";
import { BxPlus, Input } from "@opengovsg/design-system-react";
import type { ChangeEventHandler, FC } from "react";
import { PLACEHOLDER_SHEETS_LINK } from "../../utils/constants";

type Props = {
  sheetsLink: string;
  handleChangeSheetsLink: ChangeEventHandler<HTMLInputElement>;
  createFiltableFromLink: () => void;
};

const MobileLandingPage: FC<Props> = ({
  sheetsLink,
  handleChangeSheetsLink,
  createFiltableFromLink,
}) => {
  return (
    <Hide above="md">
      <Box
        px="24px"
        py="32px"
        minH="calc(100vh - 82px)" // TODO: 82px is the sum of the govmastheight + navbar height
        bg="brand.primary.50"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box display="flex" flexDir="column" alignItems="center" mb="82px">
          <Text textAlign="center" textStyle="h5">
            Convert a google sheet into a filterable table in minutes.
          </Text>
          <Input
            value={sheetsLink}
            onChange={handleChangeSheetsLink}
            placeholder={PLACEHOLDER_SHEETS_LINK}
            mt="32px"
            mb="16px"
          />
          <Button
            onClick={createFiltableFromLink}
            background="brand.secondary.700"
            leftIcon={<BxPlus />}
            w="full"
          >
            <Text textStyle="subhead-1">Create new table</Text>
          </Button>
        </Box>
      </Box>
    </Hide>
  );
};
export default MobileLandingPage;
