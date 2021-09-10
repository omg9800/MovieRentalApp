import "../style/movies.scss";
import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import SearchMovie from "./searchmovie";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
import _ from "lodash";
import { getMovies, deleteMovie } from "../services/movieService";
import { toast } from "react-toastify";
var axios = require("axios").default;

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    currentPage: 1,
    pageSize: 4,
    add: false,
    searchQuery: "",
    //selectedGenre: { _id: "", name: "All Genre" },
    selectedGenre: null,
  };

  async componentDidMount() {
    const { data } = await getGenres();
    console.log(data);
    const genres = [{ _id: "", name: "All Genre" }, ...data];
    //console.log(this.state.genres);
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handleRent = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    movie.numberInStock =
      movie.numberInStock - 1 >= 0 ? movie.numberInStock - 1 : 0;
    movies.push(movie);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (act) => {
    // const currentPage = act;
    this.setState({ currentPage: act });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
    //console.log(this.state.selectedGenre);
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      selectedGenre,
      currentPage,
      movies: allMovies,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies; //selectedGenre._id
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  handleSearch = (e) => {
    this.setState({
      searchQuery: e.currentTarget.value,
      selectedGenre: null,
      currentPage: 1,
    });
    console.log(e.currentTarget);
  };

  render() {
    const count = this.state.movies.length;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no movies in the Database</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="colg">
          <div className="rowgenre">
            <ListGroup
              items={this.state.genres}
              textProperty="_id"
              valueProperty="name"
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="list">
            <div className="newmovie">
              <Link
                className="btn-newmovie"
                to="/movies/newmovie"
                style={{ marginBottom: 20 }}
              >
                New Movies
              </Link>

              <p>Showing {totalCount} movies in the database</p>
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

            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              onRent={this.handleRent}
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
    );
  }
}

export default Movies;
