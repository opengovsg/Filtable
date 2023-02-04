import type { FC } from "react";
// Components
import { Box } from "@chakra-ui/react";
import { BxX } from "@opengovsg/design-system-react";
import ListingFullContent from "../filtable/ListingFullContent";

type Props = {
  title: string | undefined;
  description: string | undefined;
  convertedCollectionOfTags: Array<Array<string>>;
  link: string | undefined;
};

const PreviewListing: FC<Props> = (props) => {
  return (
    <Box w="full" rounded="8px" shadow="md" h="full" p="24px" bg="white">
      <BxX position="absolute" top="24px" right="24px" />
      <ListingFullContent {...props} />
    </Box>
  );
};
export default PreviewListing;
