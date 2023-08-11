import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function _document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <div id="modal-root" />
        <NextScript />
      </body>
    </Html>
  );
}
