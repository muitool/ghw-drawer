import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GhCard from "./../cards/GhCard";
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  gridListSingleLine: {
    flexWrap: "nowrap",
    backgroundColor: grey[50]
  }
});

function GhCardViewHorizontal(props) {
  const { classes, tileData } = props;

  return (
    <div>
      <GridList
        cellHeight={250}
        className={classes.gridListSingleLine}
        cols={6}
      >
        {tileData.map(tile => (
          <GridListTile key={tile.avatar}>
            <GhCard tile={tile} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

GhCardViewHorizontal.propTypes = {
  tileData: PropTypes.array.isRequired
};

export default withStyles(styles)(GhCardViewHorizontal);
