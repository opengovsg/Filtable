// Components
import {
  RestrictedFooter,
  ThemeProvider,
} from "@opengovsg/design-system-react";
import "inter-ui/inter.css";
import HackathonBanner from "../components/shared/HackathonBanner";
import MyHead from "../components/shared/MyHead";
// Constants
import { APP_URL, FOOTER_LINKS } from "../utils/constants";
// Types
import { type AppType } from "next/dist/shared/lib/utils";
//Styles
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <MyHead />
      <ThemeProvider>
        <HackathonBanner />
        <Component {...pageProps} />
        <RestrictedFooter
          appName="Filtable"
          appLink={APP_URL}
          footerLinks={FOOTER_LINKS}
        />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
