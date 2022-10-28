import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Profile from "./Profile";
import IdeaList from "./IdeaList";
import IdeaDetails from "./IdeaDetails";
import AddIdeaForm from "./AddIdeaForm";
import AboutPage from "./AboutPage";
import PageNotFound from "./PageNotFound";

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
      <Route path="/profile" element={<Profile user={user} token={token} />} />
      <Route path="/ideas" element={<IdeaList user={user} token={token} />} />
      <Route
        path="/ideas/:id"
        element={<IdeaDetails user={user} token={token} />}
      />
      <Route path="/new" element={<AddIdeaForm user={user} token={token} />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
