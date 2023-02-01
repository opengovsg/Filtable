import { useState } from "react";
// Components
import Navbar from "../components/Navbar";
import DesktopLandingPage from "../components/DesktopLandingPage";
import MobileLandingPage from "../components/MobileLandingPage";
// Utils
import { extractId, isValidLink } from "../utils/strings";
import { useRouter } from "next/router";
// Types
import type { ChangeEvent } from "react";
import { type NextPage } from "next";
import useTest from "../hooks/useTest";

const Home: NextPage = () => {
  const router = useRouter();
  const [sheetsLink, setSheetsLink] = useState("");

  useTest();

  const handleChangeSheetsLink = (event: ChangeEvent<HTMLInputElement>) => {
    setSheetsLink(event.target.value);
  };

  const handleFilter = () => {
    if (isValidLink(sheetsLink)) {
      const sheetId = extractId(sheetsLink);
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
