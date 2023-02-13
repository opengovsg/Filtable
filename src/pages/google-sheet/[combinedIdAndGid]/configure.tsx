import type { NextPage } from "next";
import { useRouter } from "next/router";
import ConfigureFiltablePage from "../../../components/configureFiltable/ConfigureFiltablePage";

const Configure: NextPage = () => {
  const router = useRouter();
  const { combinedIdAndGid } = router.query;

  return (
    <ConfigureFiltablePage
      router={router}
      combinedIdAndGid={combinedIdAndGid}
    />
  );
};
export default Configure;
