import React from "react";

const GetRepoName = repo => {
  const name = repo.split(".");
  return name[0];
};

function RepoView(props) {
  const name = GetRepoName(props.repoName);
  return (
    <div>
      <h3>
        Repo: {name} : {props.viewName}
      </h3>
    </div>
  );
}

export default RepoView;
