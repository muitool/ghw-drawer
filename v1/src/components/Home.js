import React from "react";
import MarkdownViewWrapper from "./../containers/MarkdownViewWrapper"

const markdownurl =
  "https://raw.githubusercontent.com/muitool/ghw-drawer/master/README.md"

const Home = () => (
  <div>
    <MarkdownViewWrapper view={markdownurl} />
  </div>
);

export default Home;
