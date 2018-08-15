import React from "react";
import MarkdownViewWrapper from "./../containers/MarkdownViewWrapper"

const markdownurl =
  "https://raw.githubusercontent.com/stormasm/mui-tutorial-demo/master/ghw-drawer/README.md";

const Home = () => (
  <div>
    <h2>Home</h2>
    <MarkdownViewWrapper view={markdownurl} />
  </div>
);

export default Home;
