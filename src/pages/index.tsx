import { useState } from "react";
// Components
import Navbar from "../components/landing/Navbar";
import DesktopLandingPage from "../components/landing/DesktopLandingPage";
import MobileLandingPage from "../components/landing/MobileLandingPage";
// Utils
import { extractId, isDefinedLink, isValidLink } from "../utils/strings";
import { useRouter } from "next/router";
// Types
import type { ChangeEvent, ChangeEventHandler } from "react";
import { type NextPage } from "next";
import { uploadCsvFile } from "../api/csv";
import { ROUTES } from "../utils/routes";

const Home: NextPage = () => {
  const router = useRouter();
  const [sheetsLink, setSheetsLink] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [sheetsError, setSheetsError] = useState("");

  const handleChangeSheetsLink = (event: ChangeEvent<HTMLInputElement>) => {
    setSheetsLink(event.target.value);
  };

  const createFiltableFromLink = () => {
    setSheetsLink("");
    if (isDefinedLink(sheetsLink) && extractId(sheetsLink)) {
      const sheetId = extractId(sheetsLink);
      void router.push(`${ROUTES.GOOGLE_SHEETS}/${sheetId}/configure`);
    } else {
      setSheetsError("Please input a google sheets link");
    }
  };

  const handleUploadFile = (file?: File | undefined) => {
    setFile(file);
  };

  const createFiltableFromCsv = async () => {
    try {
      if (file) {
        const key = await uploadCsvFile(file);
        void router.push(`${ROUTES.CSV}/${key}/configure`);
      }
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <>
      <Navbar />
      <DesktopLandingPage
        sheetsLink={sheetsLink}
        handleChangeSheetsLink={handleChangeSheetsLink}
        sheetsError={sheetsError}
        createFiltableFromLink={createFiltableFromLink}
        file={file}
        handleUploadFile={handleUploadFile}
        createFiltableFromCsv={createFiltableFromCsv}
      />
      <MobileLandingPage
        sheetsLink={sheetsLink}
        handleChangeSheetsLink={handleChangeSheetsLink}
        createFiltableFromLink={createFiltableFromLink}
      />
    </>
  );
};

export default Home;
