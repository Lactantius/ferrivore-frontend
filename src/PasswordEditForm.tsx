import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { updateReq } from "./api";
import "./PasswordEditForm.css";

function PasswordEditForm({
  user,
  token,
  saveUser,
}: PasswordEditFormProps): JSX.Element {
  const [formData, setFormData] = useState<PasswordEditFormVals>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  } as PasswordEditFormVals);

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "currentPassword") {
      setFormErrors({ ...formErrors, invalidPassword: null });
    }
    if (name === "newPassword") {
      setFormErrors({
        ...formErrors,
        passwordSufficient: null,
        passwordsMatch: null,
      });
    }
    if (name === "confirmNewPassword") {
      setFormErrors({ ...formErrors, passwordsMatch: null });
    }
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const [formErrors, setFormErrors] = useState<EditProfileFormErrors>(
    {} as EditProfileFormErrors
  );

  const validate = (data: SignupFormVals) => {
    const passwordsMatch = data.newPassword === data.confirmNewPassword;
    const passwordSufficient = data.newPassword.length > 9;
    if (passwordsMatch && passwordSufficient) {
      return true;
    }
    if (!passwordsMatch) {
      setFormErrors({
        ...formErrors,
        passwordsMatch: "Passwords do not match.",
      });
    }
    if (!passwordSufficient) {
      setFormErrors({
        ...formErrors,
        passwordSufficient:
          "Please enter a password of at least 10 characters.",
      });
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(formData)) {
      changePassword(token, user.userId, formData);
    }
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const changePassword = async (
    token: string,
    userId: string,
    data: ChangePasswordFormVals
  ) => {
    const updateData: UpdateUserVals = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    const res = await updateReq(token, userId, updateData);
    if ("user" in res) {
      saveUser(res.user);
    } else {
      console.log(res);
      setFormErrors(formatErrors(res.msg));
    }
  };

  return (
    <div className="PasswordEditForm">
      <h1>Change Password</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          required
          error={formErrors.invalidPassword ? true : false}
          helperText={formErrors.invalidPassword ?? ""}
          id="current-password"
          name="currentPassword"
          label="Current Password"
          autoComplete="password"
          type="password"
          onChange={handleChange}
          value={formData.currentPassword}
        />
        <TextField
          required
          error={
            formErrors.passwordsMatch || formErrors.passwordSufficient
              ? true
              : false
          }
          helperText={
            formErrors.passwordSufficient ?? formErrors.passwordsMatch ?? ""
          }
          id="new-password"
          name="newPassword"
          label="New Password"
          autoComplete="password"
          type="password"
          onChange={handleChange}
          value={formData.newPassword}
        />
        <TextField
          required
          error={formErrors.passwordsMatch ? true : false}
          helperText={formErrors.passwordsMatch ?? ""}
          id="confirm-new-password"
          name="confirmNewPassword"
          label="Confirm New Password"
          type="password"
          autoComplete="confirm-password"
          onChange={handleChange}
          value={formData.confirmNewPassword}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default PasswordEditForm;
