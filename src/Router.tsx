import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Router({ user, token, login, signup }: RouterProps): JSX.Element {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home user={user} token={token} login={login} signup={signup} />
        }
      />
      <Route path="/login" element={<LoginForm user={user} login={login} />} />
      <Route
        path="/signup"
        element={<SignupForm user={user} signup={signup} />}
      />
    </Routes>
  );
}

export default Router;
