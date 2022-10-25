import React from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Home({ user, login, signup }: HomeProps): JSX.Element {
  return (
    <div className="Home">
      <p>Welcome to Ferrivore</p>
      <LoginForm user={user} login={login} />
      <SignupForm user={user} signup={signup} />
    </div>
  );
}

export default Home;
