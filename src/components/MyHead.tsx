import Head from "next/head";
import type { FC } from "react";

const MyHead: FC = () => {
  return (
    <Head>
      <title>Filtable</title>
      <meta
        name="description"
        content="Filtable by Open Government Products (OGP)"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
export default MyHead;
