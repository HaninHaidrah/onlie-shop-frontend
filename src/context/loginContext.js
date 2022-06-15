import React, { useState, useEffect } from "react";
import superagent from "superagent";
import base64 from "base-64";
import { decodeToken } from "react-jwt";
import cookie from "react-cookies";
export const LoginContext = React.createContext();

export default function LoginProvider(props) {
  const API = "https://girlish.herokuapp.com";
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [counter, setCounter] = useState(1);

  const loginFunction = async (username, password) => {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set(
          "authorization",
          `Basic ${base64.encode(`${username}:${password}`)}`
        );

      validateMyToken(response.body.token);
    } catch (err) {
      console.log(err);
    }
  };

  const signupFunction = async (username, password, role) => {
    try {
      const response = await superagent.post(`${API}/signup`, {
        username,
        password,
      });
      loginFunction(username, password);
    } catch (err) {
      console.log(err);
    }
  };

  const logoutFunction = () => {
    setLoggedIn(false);
    setUser({});
    cookie.remove("token");
    cookie.remove("counter");
    cookie.remove("products");
  };

  const validateMyToken = (token) => {
    if (token) {
      const user = decodeToken(token);
      setLoggedIn(true);
      setUser(user);
      setToken(token);
      cookie.save("token", token);
    } else {
      setLoggedIn(false);
      setUser({});
    }
  };

  useEffect(() => {
    const myTokenCookie = cookie.load("token");
    cookie.load("counter");
    validateMyToken(myTokenCookie);
  }, []);

  const state = {
    loggedIn: loggedIn,
    user: user,
    loginFunction: loginFunction,
    logoutFunction: logoutFunction,
    counter: counter,
    token: token,
    setCounter: setCounter,
    signupFunction: signupFunction,
  };
  return (
    <>
      <LoginContext.Provider value={state}>
        {props.children}
      </LoginContext.Provider>
    </>
  );
}
