import React from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import MenuItem from "@material-ui/core/MenuItem";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import GhCardViewHorizontal from "./../cards/GhCardViewHorizontal";

const num_of_item_dropdowns = 6;

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input
        },
        ...other
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: "relative",
    height: 250
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  gridListSingleLine: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    //backgroundColor: lightGreen[100]
    backgroundColor: theme.palette.background.paper
  }
});

class GridListAutoSuggest extends React.Component {
  constructor(props) {
    super(props);

    const { tileData } = this.props;

    this.state = {
      value: "",
      suggestions: [],
      data: tileData,
      datasug: {},
      isLoading: false,
      error: null,
    };
  }

  buildSuggestions(value) {
    // In the future we may only grab locations with the value
    const sugary = [];
    const sug = this.state.data;
    sug.forEach(function(item, index) {
      let obj = {};
      obj.label = item.location;
      if (obj.label != null) {
        sugary.push(obj);
      }
    });
    return sugary;
  }

  buildSuggestionsData(value) {
    // Grab all of the objects in the array that match the location
    const sugary = [];
    const sug = this.state.data;
    sug.forEach(function(item, index) {
      if (item.location === value.label) {
        sugary.push(item);
      }
    });

    const obj = {};
    obj.hits = sugary;
    return obj;
  }

  getSuggestions(value) {
    const mysuggestions = this.buildSuggestions(value);

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : mysuggestions.filter(suggestion => {
          const keep =
            count < num_of_item_dropdowns &&
            suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  handleSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    const mydata = this.buildSuggestionsData(suggestion);
    this.setState({
      datasug: mydata
    });
  };

  componentDidMount() {
    const { tileData } = this.props;
    this.setState({ data: tileData, isLoading: false });
  }

  render() {
    const { classes, tileData } = this.props;
    const hits = tileData;
    const hitsug = this.state.datasug.hits || [];

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <div>
          <Autosuggest
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion
            }}
            renderInputComponent={renderInput}
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
            onSuggestionSelected={this.handleSuggestionSelected}
            renderSuggestionsContainer={renderSuggestionsContainer}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              classes,
              placeholder: "Search a location starting with the first letter",
              value: this.state.value,
              onChange: this.handleChange
            }}
          />
        </div>

        <div className={classes.root}>
          <GhCardViewHorizontal tileData={hitsug} />
        </div>

        <div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>login</CustomTableCell>
                  <CustomTableCell>name</CustomTableCell>
                  <CustomTableCell>location</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hits.map((key, index) => {
                  return (
                    <TableRow key={index}>
                      <CustomTableCell>
                        <a href={"https://github.com/" + key.login}>
                          {key.login}
                        </a>
                      </CustomTableCell>
                      <CustomTableCell>{key.name}</CustomTableCell>
                      <CustomTableCell>{key.location}</CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

GridListAutoSuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  tileData: PropTypes.array.isRequired
};

export default withStyles(styles)(GridListAutoSuggest);
