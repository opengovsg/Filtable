import { Grid, GridItem, Text } from "@chakra-ui/react";
import type { FC } from "react";

type Props = {
  contentSide: "left" | "right";
  imgUrl: string;
  heading: string;
  contentBody: JSX.Element;
};

const LandingSection: FC<Props> = ({
  contentSide,
  imgUrl,
  heading,
  contentBody,
}) => {
  return (
    <Grid templateColumns="repeat(2 ,1fr)" gap="40px">
      {contentSide === "left" ? (
        <GridItem
          colSpan={1}
          display="flex"
          flexDir="column"
          justifyContent="center"
        >
          <Text textStyle="h4" mb="16px">
            {heading}
          </Text>
          {contentBody}
        </GridItem>
      ) : null}

      <GridItem colSpan={1} display="grid" placeItems="center">
        <img src={imgUrl} alt={imgUrl} />
      </GridItem>

      {contentSide === "right" ? (
        <GridItem
          colSpan={1}
          display="flex"
          flexDir="column"
          justifyContent="center"
        >
          <Text textStyle="h4" mb="16px">
            {heading}
          </Text>
          {contentBody}
        </GridItem>
      ) : null}
    </Grid>
  );
};
export default LandingSection;
