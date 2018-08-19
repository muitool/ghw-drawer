import React from "react";
import PropTypes from "prop-types";
import GhCardViewHorizontal from "./../cards/GhCardViewHorizontal";
import RepoView from "./../components/RepoView";

function View2(props) {
  const { tileData, repoName, viewName } = props;

  return (
    <div>
      <RepoView repoName={repoName} viewName={viewName} />
      <GhCardViewHorizontal tileData={tileData} />
    </div>
  );
}

View2.propTypes = {
  tileData: PropTypes.array.isRequired,
  repoName: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired
};

export default View2;
