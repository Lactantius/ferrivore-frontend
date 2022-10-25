import React from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import IdeaContainer from "./IdeaContainer";
import AddIdeaForm from "./AddIdeaForm";

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
          <LoginForm user={user} login={login} />
          <SignupForm user={user} signup={signup} />
        </>
      )}
    </div>
  );
}

export default Home;
