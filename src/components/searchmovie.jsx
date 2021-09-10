import React, { Component } from "react";

class SearchMovie extends Component {
  render() {
    const { value, onChange } = this.props;

    return (
      <input
        type="text"
        name="query"
        className="search"
        placeholder="Search..."
        value={value}
        // onChange={(e) => {(e.currentTarget.value)}}
        onChange={(e) => e.currentTarget.value}
      />
    );
  }
}

export default SearchMovie;
