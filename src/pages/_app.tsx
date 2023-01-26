import { ThemeProvider } from "@opengovsg/design-system-react";
import { type AppType } from "next/dist/shared/lib/utils";
import MyHead from "../components/MyHead";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <MyHead />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
