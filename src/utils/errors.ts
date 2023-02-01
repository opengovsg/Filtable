import type { ZodError } from "zod";

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
  console.error(error);

  return returnErrorMessage;
};

export const checkDataAndConfigForErrors = ({
  data,
  configuration,
}: {
  data: Array<Record<string, string>>;
  configuration: Array<Record<string, string>>;
}) => {
  if (!data || data.length === 0) {
    throw "no data";
  } else if (!configuration || configuration.length === 0) {
    throw "no config";
  }

  let isAllUndefined = true;
  const actualHeadingsSet = new Set(Object.keys(data[0] ?? {}));
  configuration[0] &&
    Object.values(configuration[0]).forEach((configHeading) => {
      if (actualHeadingsSet.has(configHeading)) {
        isAllUndefined = false;
      }
    });

  if (isAllUndefined) {
    throw "no mapping";
  }
};
