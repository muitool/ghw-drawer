import React from "react";
import PropTypes from "prop-types";
import MarkdownView from "./MarkdownView";

class MarkdownViewWrapper extends React.Component {
  constructor(props) {
    super(props);

    const { view } = props;

    this.state = {
      data: {},
      isLoading: false,
      error: null,
      viewName: view
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isLoading: true });
    this.setState({ viewName: nextProps.view });

    const url = nextProps.view;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(
            "Sorry, something went wrong in the MarkdownViewWrapper part I"
          );
        }
      })
      .then(data => this.setState({ data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.setState({ viewName: this.props.view });

    const url = this.state.viewName;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(
            "Sorry, something went wrong in the MarkdownViewWrapper part II"
          );
        }
      })
      .then(data => this.setState({ data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const mydata = this.state.data;
    const mytype = typeof mydata;

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }

    if (mytype === "string") {
      return (
        <div>
          <MarkdownView markdown={mydata} />
        </div>
      );
    } else {
      return "No data yet...";
    }
  }
}

MarkdownViewWrapper.propTypes = {
  view: PropTypes.string.isRequired
};

export default MarkdownViewWrapper;
