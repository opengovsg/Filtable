import type { ZodError } from "zod";
import { mandatoryHeadings } from "../types/headings";

export const generateErrorMessage = (error: unknown) => {
  if (error === "unauthorized") {
    return "Oh no! The Google Sheets link is not publicly visible. Change the viewing permissions to 'Anyone with the link'.";
  } else if (
    (error as ZodError).issues[0]?.message === "Expected array, received object"
  ) {
    return "Oh no! The Google Sheets link does not have the right format. Please follow the guide and format it correctly.";
  } else if ((error as ZodError).issues[0]?.message === "Required") {
    return `Oh no! The 2nd sheet in the Google Sheets link does not provide the following headings (${mandatoryHeadings.join(
      ", "
    )}). Please follow the guide and format it correctly.`;
  } else {
    return "Oh no! Something went wrong.";
  }
};
