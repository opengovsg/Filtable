import { Banner } from "@opengovsg/design-system-react";
import type { FC } from "react";
import { H4PG_LINK } from "../utils/constants";

const HackathonBanner: FC = () => {
  return (
    <Banner useMarkdown isDismissable>
      {`Filtable is a work-in-progess project for Open Government Product’s [Hack
      for Public Good 2023](${H4PG_LINK}).`}
    </Banner>
  );
};
export default HackathonBanner;
