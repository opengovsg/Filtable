import type { NextPage } from "next";
import { useRouter } from "next/router";
import FiltablePage from "../../components/FiltablePage";
import useGoogleSheet from "../../hooks/useGoogleSheet";

const GoogleSheetFiltable: NextPage = () => {
  const router = useRouter();
  const { sheetId, isSingle } = router.query;

  const filtablePageProps = useGoogleSheet(sheetId, {
    isSingleSheet: isSingle === "true" ? true : false,
  });
  return <FiltablePage {...filtablePageProps} />;
};
export default GoogleSheetFiltable;
