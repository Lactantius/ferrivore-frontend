import React from "react";
import { Navigate } from "react-router-dom";

function Profile({ user, token }: ProfileProps): JSX.Element {
  if (!user || !token) {
    return <Navigate to="/" />;
  }

  return <h1>Profile</h1>;
}

export default Profile;
