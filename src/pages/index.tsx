import { useState } from "react";
// Components
import Navbar from "../components/Navbar";
import DesktopLandingPage from "../components/DesktopLandingPage";
import MobileLandingPage from "../components/MobileLandingPage";
// Utils
import { extractSheetId, isValidLink } from "../utils/strings";
import { useRouter } from "next/router";
// Types
import type { ChangeEvent } from "react";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const router = useRouter();
  const [sheetsLink, setSheetsLink] = useState("");

  const handleChangeSheetsLink = (event: ChangeEvent<HTMLInputElement>) => {
    setSheetsLink(event.target.value);
  };

  const handleFilter = () => {
    if (isValidLink(sheetsLink)) {
      const sheetId = extractSheetId(sheetsLink);
      void router.push(sheetId);
    }
  };

  return (
    <>
      <Navbar />
      <DesktopLandingPage
        sheetsLink={sheetsLink}
        handleChangeSheetsLink={handleChangeSheetsLink}
        handleFilter={handleFilter}
      />
      <MobileLandingPage
        sheetsLink={sheetsLink}
        handleChangeSheetsLink={handleChangeSheetsLink}
        handleFilter={handleFilter}
      />
    </>
  );
};

export default Home;
