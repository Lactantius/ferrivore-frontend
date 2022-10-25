import React from "react";

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Home(): JSX.Element {
  return (
    <div className="Home">
      <p>Welcome to Ferrivore</p>
      <LoginForm />
      <SignupForm />
    </div>
  );
}

export default Home;
