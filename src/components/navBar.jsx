import React from "react";
import "../style/movies.scss";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = ({ user }) => {
  // console.log(user);
  return (
    <nav className="navbar">
      <div className="cont">
        <Link className="navbarbrand" to="/">
          VIDLY
        </Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/movies">
            Movies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/customers">
            Customers
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink className="nav-link" to="/rentals">
            Rentals
          </NavLink>
        </li> */}
        {!user && (
          <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link" to="/loginForm">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link" to="/me">
                {user.name[0].toUpperCase() + user.name.slice(1)}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
      {/* </div>
      </div> */}
    </nav>
  );
};

export default NavBar;
