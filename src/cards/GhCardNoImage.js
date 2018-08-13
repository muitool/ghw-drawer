// This was a SimpleMediaCard
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 175
  },
  media: {
    height: 90
  }
};

function Gh1CardNoImage(props) {
  const { classes, tile } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="headline" component="p">
            <a href={"https://github.com/" + tile.login} target="_blank">
              {tile.login}
            </a>
          </Typography>
          <Typography component="p">{tile.name}</Typography>
          <Typography component="p">
            <b>{tile.location}</b>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

Gh1CardNoImage.propTypes = {
  classes: PropTypes.object.isRequired,
  tile: PropTypes.object.isRequired
};

export default withStyles(styles)(Gh1CardNoImage);
