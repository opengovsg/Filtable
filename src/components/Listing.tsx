import type { FC } from "react";
import type { HeadingConfig } from "../types/Configuration";
import { doesListingPassFilter, isFilterAllUnselected } from "../utils/filter";

type ListingProps = {
  listing: Record<string, string>;
  filter: Record<string, boolean>;
  configuration: HeadingConfig;
};

const Listing: FC<ListingProps> = ({ listing, filter, configuration }) => {
  const title = listing[configuration.title] as string;
  const description = configuration.description
    ? listing[configuration.description]
    : undefined;
  const clickHereUrl = configuration.clickHereUrl
    ? listing[configuration.clickHereUrl]
    : undefined;

  if (
    !isFilterAllUnselected(filter) &&
    !doesListingPassFilter(listing, filter)
  ) {
    return <></>;
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 bg-gray-200 px-8 py-4">
      <h1 className="text-lg font-bold">{title}</h1>
      <p>{description}</p>
      <a
        href={clickHereUrl}
        className="text-blue cursor-pointer underline"
        target="blank"
        rel="noreferrer"
      >
        Click here
      </a>
    </div>
  );
};
export default Listing;
