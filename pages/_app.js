import React from "react";
import App, { Container, Head } from "next/app";
import Layout from "../components/Layout";

class TeamPlan extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default TeamPlan;