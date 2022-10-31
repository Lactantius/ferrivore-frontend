import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import PasswordEditForm from "./PasswordEditForm";
import ProfileEditForm from "./ProfileEditForm";

function Profile({ user, token, saveUser }: ProfileProps): JSX.Element {
  if (!user || !token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="Profile">
      <ProfileEditForm user={user} token={token} saveUser={saveUser} />
      <PasswordEditForm user={user} token={token} saveUser={saveUser} />
    </div>
  );
}

export default Profile;
