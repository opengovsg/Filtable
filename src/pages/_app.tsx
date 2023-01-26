import {
  RestrictedFooter,
  RestrictedGovtMasthead,
  ThemeProvider,
} from "@opengovsg/design-system-react";
import { type AppType } from "next/dist/shared/lib/utils";
import MyHead from "../components/MyHead";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { APP_URL } from "../utils/constants";
import "inter-ui/inter.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <MyHead />
      <ThemeProvider>
        <RestrictedGovtMasthead />
        <Navbar />
        <Component {...pageProps} />
        <RestrictedFooter appName="Filtable" appLink={APP_URL} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
