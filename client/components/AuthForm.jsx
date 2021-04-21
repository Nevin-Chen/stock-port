import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";

const LoginForm = props => {
  const { formName, displayName, handleSubmit, error } = props;
  return (
    <div className="ui three column middle aligned center aligned grid">
      <div className="eight wide column">
        <form onSubmit={handleSubmit} name={formName} className="ui large form">
          <div className="ui stacked segment">
            {displayName === "Sign Up" && (
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
            )}
            <div className="field">
              <div className="ui left icon input">
                <i className="address card icon"></i>
                <input
                  name="email"
                  type="text"
                  placeholder="E-mail address"
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="ui fluid large teal submit button"
              >
                {displayName}
              </button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </div>
        </form>
      </div>
    </div>
  );
};

const mapLogin = state => {
  return {
    formName: "login",
    displayName: "Login",
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    formName: "signup",
    displayName: "Sign Up",
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const userName =
        evt.target.name === "signup" ? evt.target.username.value : "";
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(userName, email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(LoginForm);
export const Signup = connect(mapSignup, mapDispatch)(LoginForm);

LoginForm.propTypes = {
  formName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
