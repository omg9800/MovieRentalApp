import "../style/movies.scss";
import React, { Component } from "react";
import Movies from "./movies";
import userlogo from "../style/user.png";
import MoviesTable from "./moviesTable";
import { deleteMovie } from "./../services/custService";
import { getMovies, getMovie } from "./../services/movieService";
import { toast } from "react-toastify";
class CustomerDetails extends Movies {
  state = {
    allMovies: [],
    movies: [],
    rental: 0,
  };

  async componentDidMount() {
    var user = this.props.location.aboutProps;
    const allMovies = await getMovies();
    //console.log(allMovies.data);
    this.setState({ allMovies: allMovies.data });

    try {
      for (let i = 0; i < user.movies.length; i++) {
        // console.log(user.movies[i]);
        var id = user.movies[i];
        var movies = [...this.state.movies];
        const movie = this.state.allMovies.filter((m) => m._id === id);
        //console.log(user);
        movies.push(movie[0]);
        this.setState({ movies });
      }
    } catch (ex) {
      toast.error("No movies rented by this user");
    }
  }

  handleDelete = async (mid, cid) => {
    //var user = this.props.location.aboutProps;
    console.log(mid, cid);
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter((m) => m._id !== mid);
    this.setState({ movies });
    try {
      await deleteMovie(mid, cid);
      toast.success("Movie returned Successfully.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        // toast.error("This movie has already been deleted.");
        console.log(ex.response);
      this.setState({ movies: originalMovies });
    }
  };

  handlerRental() {
    var ans = 0;
    this.state.movies.map((m) => (ans = ans + m.dailyRentalRate));
    return ans;
  }

  render() {
    var user = this.props.location.aboutProps;

    return (
      <div className="parent">
        <div className="cdetails">
          <h1>Customer Details</h1>
          <img src={userlogo} />
          <ul>
            <li>
              <p>Name:</p>
              <p>{user.name}</p>
            </li>
            <li>
              {" "}
              <p>Phone :</p>
              <p>{user.phone}</p>
            </li>
            <li>
              <p>IsGold:</p>
              <p>{user.isGold === true ? "Yes" : "No"}</p>
            </li>
            <li>
              <p>Rental :</p>
              <p>{this.handlerRental()}</p>
            </li>
            {/* <li>
              <p>Date :</p>
              <p>{user.movies.dateOut}</p>
            </li> */}
          </ul>
        </div>

        <div className="rentdetails">
          {!this.state.movies.length && (
            <div>{<h2>There are no movies</h2>}</div>
          )}
          {this.state.movies.length > 0 && (
            <div className="rentedMovies">
              <table>
                <tr>
                  <th>Title</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th>Genre</th>
                </tr>
                {this.state.movies.map((m) => (
                  <tr>
                    <td>{m.title}</td>
                    <td>{m.numberInStock}</td>
                    <td>{m.dailyRentalRate}</td>
                    <td>{m.genre.name}</td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(m._id, user._id)}
                        className="btn-newrental"
                      >
                        Return
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CustomerDetails;
