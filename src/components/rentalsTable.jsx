import React, { Component } from "react";
import RentTable from "./common/rentTable";
class RentalsTable extends Component {
  columns = [
    { path: "customer.name", label: "Name" },
    { path: "customer.phone", label: "Phone" },
    { path: "customer.isGold", label: "isGold" },
    { path: "movie.title", label: "Title" },
    { path: "movie.dailyRentalRate", label: "Daily Rental Rate" },

    {
      key: "delete",
      content: (customer) => (
        <button
          onClick={() => this.props.onDelete(customer)}
          className="btn delete"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { customers, onSort, sortColumn } = this.props;
    return (
      <RentTable
        data={customers}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default RentalsTable;
