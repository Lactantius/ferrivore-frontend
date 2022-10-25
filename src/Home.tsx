import React from "react";
import { Link } from "react-router-dom";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import IdeaContainer from "./IdeaContainer";
import AddIdeaForm from "./AddIdeaForm";

import "./Home.css";

function Home({ user, token, login, signup }: HomeProps): JSX.Element {
  return (
    <div className="Home">
      <h1>Ferrivore</h1>
      {user && token ? (
        <>
          <IdeaContainer user={user} token={token} />
          <AddIdeaForm user={user} token={token} />
        </>
      ) : (
        <>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </>
      )}
    </div>
  );
}

export default Home;
