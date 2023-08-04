import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function _document() {
  return (
    <Html lang="ko">
      <Head>
        <title>전기차 충전소 조회</title>
        <link rel="icon" href="/ocube.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
