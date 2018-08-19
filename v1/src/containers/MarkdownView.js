import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 20,
    flex: "1 1 100%",
    maxWidth: "100%",
    margin: "0 auto"
  })
});

function MarkdownView(props) {
  const { classes, markdown } = props;

  return (
    <div>
      <div className={classes.root}>
        <ReactMarkdown source={markdown} />
      </div>
    </div>
  );
}

MarkdownView.propTypes = {
  markdown: PropTypes.string.isRequired
};

export default withStyles(styles)(MarkdownView);
