/*
<style>
                body {
                width: 95vw;
                height: 95vh;
                font-family: 'Quicksand', sans-serif;
              }

              #svg {
                display: block;
                margin: auto;
                font-family: 'Quicksand', sans-serif;
                padding-top: 5px;
              }
              </style>
              */
import React from "react";
import Head from "next/head";
import Header from "./Header";
import "../styles/global.css";

const Layout = props => (
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
      <main className="container">{props.children}</main>
    </>
  </>
);

export default Layout;
