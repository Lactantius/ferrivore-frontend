import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";

function Router({ user, token, login, signup }: RouterProps): JSX.Element {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home user={user} token={token} login={login} signup={signup} />
        }
      />
    </Routes>
  );
}

export default Router;
