import React from "react";
import App, { Container } from "next/app";
import Layout from "../components/Layout";

export default class TeamPlan extends App {
  // static async getInitialProps({ Component, router, ctx }) {
  //   let pageProps = {} 
  //   pageProps.user = ctx.req ? ctx.req.user : undefined;
  //   return { pageProps };
  // }
  render() {
    const { Component, pageProps } = this.props;
    return (
        <Layout>
          <Component {...pageProps}/>
        </Layout>
    );
  }
}