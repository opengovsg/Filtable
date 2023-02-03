import type { NextPage } from "next";
import { useRouter } from "next/router";
import FiltablePage from "../../../components/filtable/FiltablePage";
import useGoogleSheet from "../../../hooks/useGoogleSheet";
import type { ConfigLocation } from "../../../types/configuration";

const GoogleSheetFiltable: NextPage = () => {
  const router = useRouter();
  const { sheetId, urlConfig } = router.query;

  const configLocation: ConfigLocation = "url";

  const filtablePageProps = useGoogleSheet({
    googleSheetId: sheetId,
    configLocation,
    urlConfig: String(urlConfig),
  });
  return <FiltablePage {...filtablePageProps} />;
};
export default GoogleSheetFiltable;
