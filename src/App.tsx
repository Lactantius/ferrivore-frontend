import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt from "jsonwebtoken";

import Router from "./Router";

import "./App.css";

function App(): JSX.Element {
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

  const getUser = () => {
    return userToken ? (jwt.decode(userToken) as UserToken) : null;
  };

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
