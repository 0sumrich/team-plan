import App from "next/app";
import Layout from "../components/Layout";
import "./global.css";

function TeamPlan({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default TeamPlan;
