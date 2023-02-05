import type { ZodError } from "zod";
import type { HeadingConfig } from "../types/configuration";

export const generateErrorMessage = (
  error: unknown,
  config?: {
    displayErrorMessage?: boolean;
  }
) => {
  let returnErrorMessage = "";

  if (error === "not found") {
    returnErrorMessage =
      "Oh no! This is not a valid Google Sheets link. Please input a valid link and try again.";
  } else if (error === "unauthorized") {
    returnErrorMessage =
      "Oh no! This Google Sheets link is not publicly visible. Change the viewing permissions to 'Anyone with the link'.";
  } else if (
    ((error as ZodError).issues &&
      (error as ZodError).issues[0]?.message ===
        "Expected array, received object") ||
    "no data" ||
    "no config"
  ) {
    returnErrorMessage =
      "It seems like your Google Sheet isn't formatted properly. Follow our template and try again.";
  } else if (error === "no mapping") {
    ("It seems like your Google Sheet has no matching headings to display the content appropriately. Follow our template and try again.");
  } else {
    returnErrorMessage =
      "Oops, something went wrong. Try doing this action again later.";
  }

  if (Boolean(config?.displayErrorMessage)) {
    returnErrorMessage += ` (Error: ${String(error)})`;
  }

  return returnErrorMessage;
};

export const checkDataAndConfigForErrors = ({
  data,
  configuration,
}: {
  data: Array<Record<string, string>>;
  configuration: HeadingConfig;
}) => {
  if (!data || data.length === 0) {
    throw "no data";
  } else if (!configuration) {
    throw "no config";
  }

  let isAllUndefined = true;
  const actualHeadingsSet = new Set(Object.keys(data[0] ?? {}));

  Object.values(configuration).forEach((configHeading) => {
    if (actualHeadingsSet.has(configHeading)) {
      isAllUndefined = false;
    }
  });

  if (isAllUndefined) {
    throw "no mapping";
  }
};
