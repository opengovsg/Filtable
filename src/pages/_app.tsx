// Components
import {
  RestrictedFooter,
  RestrictedGovtMasthead,
  ThemeProvider,
} from "@opengovsg/design-system-react";
import MyHead from "../components/MyHead";
// Constants
import { APP_URL } from "../utils/constants";
// Types
import { type AppType } from "next/dist/shared/lib/utils";
//Styles
import "../styles/globals.css";
import "inter-ui/inter.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <MyHead />
      <ThemeProvider>
        <RestrictedGovtMasthead />
        <Component {...pageProps} />
        <RestrictedFooter appName="Filtable" appLink={APP_URL} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
