import React, { useRef, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Image from "./img/Login-Greetings.jpeg";
import "./Login.css";

import { signIn, forgotPassword } from "./Authentication";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);

  const [loginStatus, setLoginStatus] = useState({
    status: false,
    loading: false,
    msg: "",
    forgot: false,
  });

  const RedirectFromLogin = async (email, password) => {
    await signIn(email, password).then((response) => {
      setLoginStatus(response);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RedirectFromLogin(email.current.value, password.current.value);
  };

  return (
    <>
      {loginStatus.status ? (
        <RedirectPage LoginStatus={loginStatus} />
      ) : (
        <>
          <div className="navbar" id="navbar">
            <h2 className="leftNav">H D</h2>
            <div className="btn" >
              <Link to="/" className="btn">
                <p>Home</p>
              </Link>
            </div>
            <div>
              <Link to="/Login" className="btn">
                <p>Sign In</p>
              </Link>
            </div>
          </div>
          <h1 id="head">Sign-In</h1>
          <div className="main">
            <div className="left">
              <form className="login">
                <div>
                  <label htmlFor="email" className="loginlabel">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="logininput"
                    ref={email}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="loginlabel">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="logininput"
                    ref={password}
                  />
                </div>
                <button
                  className="loginsignin"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <p
                  className="forgot"
                  onClick={async () => {
                    await forgotPassword(email.current.value).then((resp) => {
                      alert("Check your email");
                    });
                  }}
                >
                  Forgot Password?
                </p>
              </form>
            </div>
            <div className="right">
              <img src={Image} alt="" className="img" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

const RedirectPage = ({ LoginStatus }) => {
  return (
    <>
      {LoginStatus.userData.type === "charity" ? (
        <Navigate
          to="/CharityHomePage"
          state={{
            uid: LoginStatus.uid,
            name: LoginStatus.userData.Name,
            address: LoginStatus.userData.Address,
            city: LoginStatus.userData.City,
            postcode: LoginStatus.userData.Postcode,
            phoneNo: LoginStatus.userData.Phone,
            email: LoginStatus.userData.Email,
          }}
        />
      ) : (
        <Navigate
          to="/DonorHomepage"
          state={{
            uid: LoginStatus.uid,
            name: LoginStatus.userData.Name,
            address: LoginStatus.userData.Address,
            city: LoginStatus.userData.City,
            postcode: LoginStatus.userData.Postcode,
            phoneNo: LoginStatus.userData.Phone,
            email: LoginStatus.userData.Email,
          }}
        />
      )}
    </>
  );
};

export default Login;
