import React, { Component } from "react";
import CusTable from "./common/cusTable";

class CustomersTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "phone", label: "Phone" },
    { path: "isGold", label: "isGold" },
    {
      key: "delete",
      content: (customer) => (
        <button
          to="/newmovie"
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
      <CusTable
        data={customers}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default CustomersTable;
