import { z } from "zod";
import { initZodHeadingConfig } from "./utils/configurations";

export const GoogleSheetResponse = z.array(z.object({}).catchall(z.string()));

export const ConfigurationResponse = z.array(
  z.object(initZodHeadingConfig()).catchall(z.string())
);
