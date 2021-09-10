import React from "react";
import "../style/movies.scss";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";

class Register extends Form {
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  state = {
    data: { username: "", password: "", name: "" },
    t: true,
    f: false,
    errors: {},
  };

  doSubmit = async () => {
    try {
      const response = await userService.registerform(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        var errors = { ...this.state.errors };
      errors.username = ex.response.data;
      this.setState({ errors });
    }
  };

  render() {
    return (
      <div className="regall">
        <div className="reg">
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}

            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}

            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
