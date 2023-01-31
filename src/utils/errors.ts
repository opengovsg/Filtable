import type { ZodError } from "zod";

export const generateErrorMessage = (error: unknown) => {
  if (error === "unauthorized") {
    return "Oh no! This Google Sheets link is not publicly visible. Change the viewing permissions to 'Anyone with the link'.";
  } else if (
    (error as ZodError).issues[0]?.message === "Expected array, received object"
  ) {
    return "It seems like your Google Sheet isn't formatted properly. Follow our template and try again.";
  } else {
    return "Oops, something went wrong. Try doing this action again later.";
  }
};
