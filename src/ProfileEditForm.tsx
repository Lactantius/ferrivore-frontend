import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { updateReq } from "./api";
import { formatErrors } from "./helpers";
import "./ProfileEditForm.css";
import Success from "./Success";

function ProfileEditForm({
  user,
  token,
  saveUser,
}: ProfileEditFormProps): JSX.Element {
  const [formData, setFormData] = useState<EditProfileFormVals>({
    username: user!.username,
    email: user!.email,
    password: "",
  } as EditProfileFormVals);

  const [formErrors, setFormErrors] = useState<EditProfileFormErrors>(
    {} as EditProfileFormErrors
  );

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validate = (data: EditProfileFormVals) => {
    const properEmail = data.email.toLowerCase().match(
      // From https://stackoverflow.com/a/46181/6632828
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    if (properEmail) {
      return true;
    }
    if (!properEmail) {
      setFormErrors({
        ...formErrors,
        properEmail: "Please enter a validly formatted email.",
      });
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "password") {
      setFormErrors({ ...formErrors, invalidPassword: null });
    }
    if (name === "email") {
      setFormErrors({ ...formErrors, uniqueEmail: null, properEmail: null });
    }
    if (name === "username") {
      setFormErrors({ ...formErrors, uniqueUsername: null });
    }
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(formData)) {
      updateUser(token, user.userId, formData);
    }
    setFormData({ ...formData, password: "" });
  };

  const updateUser = async (
    token: string,
    userId: string,
    data: EditProfileFormVals
  ) => {
    const updateData: UpdateUserVals = {
      currentPassword: data.password,
      newUsername: data.username,
      newEmail: data.email,
    };
    const res = await updateReq(token, userId, updateData);
    if ("user" in res) {
      saveUser(res.user);
      setSuccessMessage("Profile updated successfully.");
    } else {
      setFormErrors(formatErrors(res.msg));
    }
  };

  return (
    <div className="ProfileEditForm">
      <h1>Edit Profile</h1>
      {successMessage ? <Success message={successMessage} /> : <></>}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          required
          error={formErrors.uniqueUsername ? true : false}
          helperText={formErrors.uniqueUsername ?? "Edit to change username"}
          id="username"
          name="username"
          label="Username"
          autoComplete="username"
          onChange={handleChange}
          value={formData.username}
        />
        <TextField
          required
          error={
            formErrors.uniqueEmail || formErrors.properEmail ? true : false
          }
          helperText={
            formErrors.uniqueEmail ??
            formErrors.properEmail ??
            "Edit to change email"
          }
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
        />
        <TextField
          required
          error={formErrors.invalidPassword ? true : false}
          helperText={formErrors.invalidPassword ?? "Input current password"}
          id="password"
          name="password"
          label="Confirm Password"
          type="password"
          autoComplete="password"
          onChange={handleChange}
          value={formData.password}
        />
        <Button type="submit" variant="contained">
          Submit Edits
        </Button>
      </Box>
    </div>
  );
}

export default ProfileEditForm;
