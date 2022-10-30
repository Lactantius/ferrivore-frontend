import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PasswordEditForm from "./PasswordEditForm";
import ProfileEditForm from "./ProfileEditForm";

function Profile({ user, token }: ProfileProps): JSX.Element {
  if (!user || !token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="Profile">
      <ProfileEditForm user={user} token={token} />
      <PasswordEditForm user={user} token={token} />
    </div>
  );
}

export default Profile;
