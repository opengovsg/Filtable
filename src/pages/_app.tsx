import { ThemeProvider } from "@opengovsg/design-system-react";
import { type AppType } from "next/dist/shared/lib/utils";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
