import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="ui vertical center aligned segment">
      <div className="ui text container home-page-container">
        <h1 className="ui header">Welcome to Stockport</h1>
        <h2 className="ui header mid-text">
          Get your portfolio started today!
        </h2>
        <Link to="/signup">
          <button className="ui huge primary button">
            Sign Up<i aria-hidden="true" className="right arrow icon"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
