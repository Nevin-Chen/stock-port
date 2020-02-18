import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <Fragment>
    <nav className="ui borderless menu">
        <div className="left item">
          <Link to="/">
            <h1>Stock-Port</h1>
          </Link>
        </div>
        <div className="ui container">
        {isLoggedIn ? (
          <div className="right item">
            <Link to="#" onClick={handleClick}>
              <span className="ui blue inverted button">Logout</span>
            </Link>
          </div>
        ) : (
          <div className="right item">
            <Link to="/login">
              <span className="ui blue inverted button" role="button">
                Login
              </span>
            </Link>
            <Link to="/signup">
              <span className="ui blue inverted button" role="button">
                Sign Up
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  </Fragment>
);

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
