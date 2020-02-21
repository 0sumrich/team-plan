import React from "react";
import Head from "next/head";
import Header from "./Header";

const Layout = ({children}) => (
  <>
    <Head>
      <title>Team Plan</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
      />
    </Head>
    <>
      <Header />
      <main className="container">{children}</main>
    </>
  </>
);

export default Layout;
