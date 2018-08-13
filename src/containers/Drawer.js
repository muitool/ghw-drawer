import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import find from "lodash/find";
import withRoot from "../withRoot";

import { Route } from "react-router-dom";
import AppDrawer from "./../modules/components/AppDrawer";

import CardWrapper from "./../containers/GhCardWrapper";

import Tooltip from '@material-ui/core/Tooltip';
import GithubIcon from '@material-ui/docs/svgIcons/GitHub';

import MarkdownViewWrapper from "./MarkdownViewWrapper"

const markdownurl =
  "https://raw.githubusercontent.com/stormasm/mui-tutorial-demo/master/ghw-drawer/README.md";

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  },
  flex: {
    flex: 1
  }
});

const pages = [
  {
    pathname: "/repo1",
    children: [
      {
        pathname: "/repo1/view1"
      },
      {
        pathname: "/repo1/view2"
      },
      {
        pathname: "/repo1/view3"
      },
      {
        pathname: "/repo1/view4"
      }
    ]
  },
  {
    pathname: "/repo2",
    children: [
      {
        pathname: "/repo2/view1"
      },
      {
        pathname: "/repo2/view2"
      },
      {
        pathname: "/repo2/view3"
      },
      {
        pathname: "/repo2/view4"
      }
    ]
  },
  {
    pathname: "/repo3",
    children: [
      {
        pathname: "/repo3/view1"
      },
      {
        pathname: "/repo3/view2"
      },
      {
        pathname: "/repo3/view3"
      },
      {
        pathname: "/repo3/view4"
      }
    ]
  },
  {
    pathname: "/",
    title: false
  }
];

function findActivePage(currentPages, url) {
  const activePage = find(currentPages, page => {
    if (page.children) {
      return url.pathname.indexOf(page.pathname) === 0;
    }

    // Should be an exact match if no children
    return url.pathname === page.pathname;
  });

  if (!activePage) {
    return null;
  }

  // We need to drill down
  if (activePage.pathname !== url.pathname) {
    return findActivePage(activePage.children, url);
  }

  return activePage;
}

class Drawer extends React.Component {
  state = {
    mobileOpen: false
  };

  getChildContext() {
    let myurl = {};
    myurl.pathname = this.props.history.location.pathname;

    return {
      url: myurl ? myurl : null,
      pages,
      activePage: findActivePage(pages, myurl)
    };
  }

  handleDrawerOpen = () => {
    this.setState({ mobileOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  render() {
    const { classes } = this.props;
    const title = "Github Worlds";

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                {title}
              </Typography>

            <Tooltip title="GitHub repository" enterDelay={300}>
              <IconButton
                className={classes.githubButton}
                component="a"
                color="inherit"
                href="https://github.com/stormasm/ghw-drawer"
                aria-label="GitHub repository"
              >
                <GithubIcon />
              </IconButton>
            </Tooltip>

          </Toolbar>
        </AppBar>

        <AppDrawer
          className={classes.drawer}
          disablePermanent={false}
          onClose={this.handleDrawerClose}
          onOpen={this.handleDrawerOpen}
          mobileOpen={this.state.mobileOpen}
        />

        <Typography type="display1" gutterBottom>
          Choose a Github Repository
        </Typography>
        <Typography type="subheading" gutterBottom>
          and your favorite data view to explore further...
        </Typography>

        <div style={{ flex: 1, padding: "10px" }}>
          <Route path="/:repo/:view" component={CardWrapper} />
        </div>

        <MarkdownViewWrapper view={markdownurl} />

      </div>
    );
  }
}

Drawer.propTypes = {
  classes: PropTypes.object.isRequired
};

Drawer.childContextTypes = {
  url: PropTypes.object,
  pages: PropTypes.array,
  activePage: PropTypes.object
};

export default withRoot(withStyles(styles)(Drawer));
