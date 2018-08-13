import React from "react";
import PropTypes from "prop-types";
import GhCardViewVertical from "./../cards/GhCardViewVertical";
import RepoView from "./../components/RepoView";

function View1(props) {
  const { tileData, repoName, viewName } = props;

  return (
    <div>
      <RepoView repoName={repoName} viewName={viewName} />
      <GhCardViewVertical tileData={tileData} />
    </div>
  );
}

View1.propTypes = {
  tileData: PropTypes.array.isRequired,
  repoName: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired
};

export default View1;
