import React from "react";

import LoginForm from "./LoginForm";

function Home(): JSX.Element {
  return (
    <div className="Home">
      <p>Welcome to Ferrivore</p>
      <LoginForm />
    </div>
  );
}

export default Home;
