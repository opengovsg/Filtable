import type { ZodError } from "zod";

export const generateErrorMessage = (
  error: unknown,
  displayErrorMessage?: boolean
) => {
  let returnErrorMessage = "";

  if (error === "unauthorized") {
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
  } else {
    returnErrorMessage =
      "Oops, something went wrong. Try doing this action again later.";
  }

  if (displayErrorMessage) {
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
};
