import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveCustomer } from "../services/custService";

class AddCustomer extends Form {
  state = {
    name: "",
    isGold: "",
    phone: "",
  };

  schema = {
    name: Joi.string(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().required(),
  };

  // doSubmit = async () => {
  //   // // console.log("Submitted");
  //   // console.log(this.state.data);
  //   // console.log(this.mapToPost(this.state.data));
  //   await saveCustomer(this.state.data);

  //   this.props.history.push("/customers");
  // };
  handleChange = (e) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    console.log(name, value);
    this.setState({ [name]: value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const customer = this.mapToViewModel();
    console.log(customer);
    await saveCustomer(customer);
  };
  componentDidMount = async () => {
    // const movieId = this.props.match.params.id;
    // //console.log(movieId);
    // if (movieId === "newmovie") return;
    // const { data: movie } = await getMovie(movieId);
    // //console.log(movie);
    // if (!movie) return this.props.history.replace("/notFound");
    // this.setState({ data: this.mapToViewModel(movie) });
    console.log(this.state.name);
  };

  mapToViewModel = () => {
    return {
      name: this.state.name,
      phone: this.state.phone,
    };
  };

  render() {
    return (
      <div className="regall">
        <div className="reg">
          <h1>Add a New Customer</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="addcustomer">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Phone:
                <input
                  label="Phone"
                  type="text"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </label>
              <button className="submitbtn" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddCustomer;
