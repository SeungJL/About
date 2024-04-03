import Head from "next/head";

interface ISeo {
  title: string;
}

const Seo = ({ title }: ISeo) => (
  <Head>
    <title>{title}</title>
  </Head>
);

export default Seo;
