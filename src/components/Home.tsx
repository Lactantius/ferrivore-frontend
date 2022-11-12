import React from "react";

import IdeaContainer from "./IdeaContainer";
import LandingPage from "./LandingPage";

import "./Home.css";

function Home({ user, token }: HomeProps): JSX.Element {
  return (
    <div className="Home">
      {user && token ? (
        <IdeaContainer user={user} token={token} />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

export default Home;
