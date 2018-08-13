import React from "react";
import PropTypes from "prop-types";

import View1 from "./../views/View1";
import View2 from "./../views/View2";
import View3 from "./../views/View3";
import View4 from "./../views/View4";

function DataView(props) {
  const { tileData, repoName, viewName } = props;

  if (viewName === "view1") {
    return (
      <View1 tileData={tileData} repoName={repoName} viewName={viewName} />
    );
  }

  if (viewName === "view2") {
    return (
      <View2 tileData={tileData} repoName={repoName} viewName={viewName} />
    );
  }

  if (viewName === "view3") {
    return (
      <View3 tileData={tileData} repoName={repoName} viewName={viewName} />
    );
  }

  return <View4 tileData={tileData} repoName={repoName} viewName={viewName} />;
}

DataView.propTypes = {
  tileData: PropTypes.array.isRequired,
  repoName: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired
};

export default DataView;
