// Components
import {
  RestrictedFooter,
  RestrictedGovtMasthead,
  ThemeProvider,
  theme as ogpTheme,
} from "@opengovsg/design-system-react";
import MyHead from "../components/MyHead";
// Utils
import { extendTheme } from "@chakra-ui/react";
// Constants
import { APP_URL } from "../utils/constants";
// Types
import { type AppType } from "next/dist/shared/lib/utils";
//Styles
import "../styles/globals.css";
import "inter-ui/inter.css";
import { textStyles } from "../utils/styles";

const MyApp: AppType = ({ Component, pageProps }) => {
  const theme = extendTheme(ogpTheme, {
    textStyles,
  });

  return (
    <>
      <MyHead />
      <ThemeProvider theme={theme}>
        <RestrictedGovtMasthead />
        <Component {...pageProps} />
        <RestrictedFooter appName="Filtable" appLink={APP_URL} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
