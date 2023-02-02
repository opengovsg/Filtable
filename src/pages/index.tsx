import { useState } from "react";
// Components
import Navbar from "../components/Navbar";
import DesktopLandingPage from "../components/DesktopLandingPage";
import MobileLandingPage from "../components/MobileLandingPage";
// Utils
import { extractId, isValidLink } from "../utils/strings";
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

  const handleChangeSheetsLink = (event: ChangeEvent<HTMLInputElement>) => {
    setSheetsLink(event.target.value);
  };

  const createFiltableFromLink = () => {
    if (isValidLink(sheetsLink)) {
      const sheetId = extractId(sheetsLink);
      void router.push(`${ROUTES.GOOGLE_SHEETS}/${sheetId}`);
    }
  };

  const handleUploadFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFile(e.target.files ? e.target.files[0] : undefined);
  };

  const createFiltableFromCsv = async () => {
    try {
      if (file) {
        const key = await uploadCsvFile(file);
        void router.push(`${ROUTES.CSV}/${key}`);
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
