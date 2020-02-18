import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="ui vertical center aligned segment">
      <div className="ui text container home-page-container">
        <h1 className="ui header">Welcome to Stockport</h1>
        <h2 className="ui header">Get your portfolio started today!</h2>
        <button className="ui huge primary button">
          <Link to="/login">
            Login<i aria-hidden="true" className="right arrow icon"></i>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
