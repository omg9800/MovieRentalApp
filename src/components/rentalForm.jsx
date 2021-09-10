import "../style/movies.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  getCustomers,
  saveCustomer,
  deleteCustomer,
  getMovies,
} from "../services/custService";
import { saveRental } from "../services/rentService";
import { toast } from "react-toastify";
class AddMovie extends Component {
  state = {
    data: { customerId: "", movieId: "" },
    name: "",
    phone: "",
  };

  handleChange = (evt) => {
    //console.log(evt.target);
    const value = evt.target.value;
    this.setState({ [evt.target.name]: value });
  };

  async componentDidMount() {}

  handleSubmit = async (event) => {
    // alert("A name was submitted: " + this.state.name);
    event.preventDefault();
    const movie = this.props.location.aboutProps;
    const movieId = movie._id;
    const customers = await getCustomers();
    const customer = customers.data.filter((m) => m.phone === this.state.phone);
    let customerId;
    //console.log(customer);
    if (customer.length !== 0) customerId = customer[0]._id;

    this.setState({ data: { movieId, customerId } });
    try {
      await saveRental(this.state.data);
      toast.success("Movie has been rented");
      //window.location("/");
    } catch (ex) {
      toast.error("Customer not found...");
    }

    // await saveCustomer(customer[0]);
    console.log(this.state.data);
    // console.log(movieId);
  };
  render() {
    //console.log(this.props.location.aboutProps);
    //console.log(this.state.data);
    //console.log(this.state.data);
    return (
      <div className="regall">
        <div className="rentalform">
          {/* <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label> */}
          <h3>Enter Customer's Mobile No.</h3>
          <input
            label="Phone"
            type="text"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
          <button className="submitbtn" onClick={this.handleSubmit}>
            Submit{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default AddMovie;
