import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

import Router from "./Router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { loginReq, signupReq } from "./api";

import "./App.css";

function App(): JSX.Element {
  /**
   * Functions for user handling
   */

  const [userToken, setUserToken] = useState(() =>
    window.localStorage.getItem("token")
  );

  const [user, setUser] = useState(() => {
    const stored = window.localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : null;
  });

  const setUserAndStorage = (user: User | null) => {
    setUser(user);
    const stringified = user ? JSON.stringify(user) : "";
    window.localStorage.setItem("user", stringified);
  };

  const setTokenAndStorage = (token: string) => {
    setUserToken(token);
    window.localStorage.setItem("token", token);
  };

  const login = async (loginData: LoginFormVals) => {
    const token = await loginReq(loginData);
    setTokenAndStorage(token.token);
    setUserAndStorage({
      email: token.email,
      username: token.username,
      userId: token.userId,
    });
    return token;
  };

  const signup = async (signupData: SignupFormVals) => {
    const token = await signupReq(signupData);
    setTokenAndStorage(token.token);
    setUserAndStorage({
      email: token.email,
      username: token.username,
      userId: token.userId,
    });
    return token;
  };

  const logout = () => {
    setTokenAndStorage("");
    setUserAndStorage(null);
  };

  const getUser = () => {
    return userToken ? (jwt.decode(userToken) as User) : null;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user} logout={logout} />
        <Router user={user} token={userToken} login={login} signup={signup} />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
