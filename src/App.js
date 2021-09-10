import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import jwtDecode from "jwt-decode";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import CustomerDetails from "./components/customerdDetails";
import Logout from "./components/logout";
import Register from "./components/register";
import Main from "./components/main";
import "./App.css";
import MovieForm from "./components/movieForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddRental from "./components/rentalForm";
import AddCustomer from "./components/customerForm";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    return (
      <div>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/loginForm" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/movies" exact component={Movies} />
            <Route path="/movies/rental" exact component={AddRental} />

            {/* <Route path="/main" component={Main} /> */}
            <Route path="/movies/:id" exact component={MovieForm} />
            <Route path="/movies" render={(props) => <Movies />} />
            <Route path="/register" component={Register} />

            <Route path="/customers" exact component={Customers} />
            <Route path="/customerdetails" component={CustomerDetails} />
            <Route path="/rentals" component={Rentals} />
            <Route
              path="/customers/newcustomer"
              exact
              component={AddCustomer}
            />
            <Route path="/notFound" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/notFound" component={NotFound} />
          </Switch>
        </main>
      </div>
      //  <Movies/>
    );
  }
}

export default App;
