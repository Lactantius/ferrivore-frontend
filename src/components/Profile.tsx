import React from "react";
import { Navigate } from "react-router-dom";

import PasswordEditForm from "./PasswordEditForm";
import ProfileEditForm from "./ProfileEditForm";
import "./Profile.css";

function Profile ({ user, token, saveUser }: ProfileProps): JSX.Element {
  if ((user == null) || !token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="Profile">
      <h1 className="Profile-h1">Your Profile</h1>
      <ProfileEditForm user={user} token={token} saveUser={saveUser} />
      <PasswordEditForm user={user} token={token} saveUser={saveUser} />
    </div>
  );
}

export default Profile;
