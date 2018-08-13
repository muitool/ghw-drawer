import React from "react";
import PropTypes from "prop-types";
import GhCardViewNoAvatar from "./../cards/GhCardViewNoAvatar";
import RepoView from "./../components/RepoView";

function View4(props) {
  const { tileData, repoName, viewName } = props;

  return (
    <div>
      <RepoView repoName={repoName} viewName={viewName} />
      <GhCardViewNoAvatar tileData={tileData} />
    </div>
  );
}

View4.propTypes = {
  tileData: PropTypes.array.isRequired,
  repoName: PropTypes.string.isRequired,
  viewName: PropTypes.string.isRequired
};

export default View4;
