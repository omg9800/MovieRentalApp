import "../style/movies.scss";
import React, { Component } from "react";
import CustomersTable from "./customersTable";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import App from "./loader/Loader";
import {
  getCustomers,
  deleteCustomer,
  getMovies,
} from "../services/custService";
import { getRentals } from "../services/rentService";
import _ from "lodash";
//import { } from "../services/movieService";
import { toast } from "react-toastify";
import AddCustomer from "./customerForm";
var axios = require("axios").default;

class Movies extends Component {
  state = {
    customers: [],
    sortColumn: { path: "name", order: "asc" },
    currentPage: 1,
    pageSize: 4,
    add: false,
    searchQuery: "",
    movies: [],
    //selectedGenre: { _id: "", name: "All Genre" },
    selectedGenre: null,
    flag: true,
  };

  async componentDidMount() {
    // const { data } = await getCustomers();
    // const genres = [{ _id: "", name: "All Genre" }, ...data];
    //console.log(this.state.genres);
    //const rentals = await getRentals();
    const { data: customers } = await getCustomers();
    // var customers = [];
    // rentals.data.map((m) => customers.push(m.customer));
    // console.log(customers);
    // console.log(customer);
    this.setState({ flag: false });
    this.setState({ customers });
  }

  handleDelete = async (customer) => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter((m) => m._id !== customer._id);
    this.setState({ customers });
    try {
      await deleteCustomer(customer._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This customer has already been deleted.");

      this.setState({ customers: originalCustomers });
    }
  };

  handlePageChange = async (act) => {
    // const currentPage = act;
    this.setState({ currentPage: act });
  };

  handleMovies = async (customer) => {
    const k = await customer.movies;
    console.log(k);
    //this.setState({ currentPage: act });
  };

  // handleGenreSelect = (genre) => {
  //   this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  //   //console.log(this.state.selectedGenre);
  // };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      //selectedGenre,
      currentPage,
      customers: allCustomers,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allCustomers; //selectedGenre._id
    if (searchQuery)
      filtered = allCustomers.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    // else if (selectedGenre && selectedGenre._id)
    //   filtered = allCustomers.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customers = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: customers };
  };

  handleSearch = (e) => {
    this.setState({
      searchQuery: e.currentTarget.value,
      //selectedGenre: null,
      currentPage: 1,
    });
    console.log(e.currentTarget);
  };

  render() {
    const count = this.state.customers.length;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0 && this.flag == false) return <AddCustomer />;

    const { totalCount, data: customers } = this.getPageData();

    return (
      <>
        {this.state.flag ? (
          <div
            className="center"
            style={{
              // backgroundColor: "#02176f",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <App />
          </div>
        ) : (
          <div className="row">
            <div className="colg">
              {/* <div className="rowgenre">
            <ListGroup
              items={this.state.genres}
              textProperty="_id"
              valueProperty="name"
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div> */}

              <div className="top">
                <div className="newmovie">
                  <Link
                    className="btn-newmovie"
                    to="/customers/newcustomer"
                    style={{ marginBottom: 20 }}
                  >
                    New Customer
                  </Link>

                  <p>Showing {totalCount} customers in the database</p>
                </div>

                <input
                  type="text"
                  name="query"
                  className="search"
                  placeholder="Search..."
                  value={this.state.searchQuery}
                  // onChange={(e) => onchange={(e.currentTarget.value)}}
                  onChange={this.handleSearch}
                />
              </div>
              <div className="fullpage">
                <CustomersTable
                  customers={customers}
                  sortColumn={sortColumn}
                  onDelete={this.handleDelete}
                  onLike={this.handleLike}
                  onSort={this.handleSort}
                />

                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Movies;
