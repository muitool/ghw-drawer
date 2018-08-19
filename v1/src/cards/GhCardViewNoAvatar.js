import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GhCard from "./GhCardNoImage";
import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
  root: {
    display: "flex",
    height: 300
  },
  gridList: {
    width: "100%",
    backgroundColor: grey[50]
  }
});

function GhCardViewNoAvatar(props) {
  const { classes, tileData } = props;

  return (
    <div>
      <div className={classes.root}>
        <GridList cellHeight={150} className={classes.gridList} cols={6}>
          {tileData.map(tile => (
            <GridListTile key={tile.avatar}>
              <GhCard tile={tile} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}

GhCardViewNoAvatar.propTypes = {
  tileData: PropTypes.array.isRequired
};

export default withStyles(styles)(GhCardViewNoAvatar);
