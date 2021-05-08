import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import { connect } from "react-redux";
import { Redirect } from "react-router";
// import fadeIn from 'react-animations/lib/fade-in'
// import { loginUser } from "../store/actions/apiactions";
// import { toast } from "react-toastify";
// import PMlogo from "./pmlogo.png";
import "./dashboardstyle.css";

class LoginComp extends Component {
  state = {
    username: "",
    password: "",
    redirectionCorrect: false,
  };

  componentWillMount = () => {
    this.validator = new SimpleReactValidator();
  };

  OnSubmit = () => {};
  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onLogin = async () => {
    if (this.validator.allValid()) {
      let obj = {
        username: this.state.username,
        password: this.state.password,
      };
      localStorage.setItem("User", JSON.stringify(obj));
      if (this.state.username == "foo" && this.state.password == "bar") {
        this.setState({ redirectionCorrect: true });
      }
      //   let request = (await this.props) && this.props.loginUser(obj);
      //   console.log(
      //     "email and password",
      //     this.state.username,
      //     this.state.password
      //   );
    } else {
      this.validator.showMessages();
      this.forceUpdate();
      //   console.log("some errors ");
    }
  };
  redirection = () => {
    let localData = localStorage.getItem("User");
    // console.log("localdata", localData);

    if (localData) {
      let finalData = JSON.parse(localData);
      //   console.log("userdata22", finalData["username"]);

      if (finalData["username"] == "foo" && finalData["password"] == "bar") {
        // console.log("herer");
        return <Redirect to="/home" />;
      }
    }
  };
  render() {
    return (
      <div>
        <div class="main-wrapper animate">
          {this.redirection()}
          {this.state.redirectionCorrect && this.redirection()}

          <div class="page-wrapper full-page">
            <div class="page-content d-flex align-items-center justify-content-center">
              <div class="row w-100 mx-0 auth-page">
                <div class="col-md-8 col-xl-6 mx-auto">
                  <div class="card">
                    <div class="row" style={{ justifyContent: "center" }}>
                      <div class="col-md-8 pl-md-0">
                        <div class="auth-form-wrapper px-4 py-5">
                          <h5 class="text-muted font-weight-normal mb-4">
                            <b>Welcome ! Log in to your account.</b>
                          </h5>
                          <div class="form-group">
                            <label for="exampleInputEmail1">Username</label>
                            <input
                              type="text"
                              name="username"
                              class="form-control"
                              onChange={this.inputHandler}
                              id="exampleInputEmail1"
                              placeholder="Username"
                            />
                            <p style={{ color: "red" }}>
                              {this.validator.message(
                                "Username",
                                this.state.username,
                                "required"
                              )}
                            </p>
                          </div>
                          <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input
                              type="password"
                              class="form-control"
                              name="password"
                              id="exampleInputPassword1"
                              onChange={this.inputHandler}
                              autocomplete="current-password"
                              placeholder="Password"
                            />
                            <p style={{ color: "red" }}>
                              {this.validator.message(
                                "Password",
                                this.state.password,
                                "required"
                              )}
                            </p>
                          </div>
                          <div class="mt-3">
                            <button
                              class="btn btn-primary mr-2 mb-2 mb-md-0 text-white"
                              onClick={this.onLogin}
                            >
                              Login
                            </button>
                          </div>

                          {/* <a
                            href="register.html"
                            class="d-block mt-3 text-muted"
                          >
                            Not a user? Sign up
                          </a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComp;
