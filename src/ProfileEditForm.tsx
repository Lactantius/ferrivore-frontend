import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function ProfileEditForm({ user, token }): JSX.Element {
  const [formData, setFormData] = useState<EditProfileFormVals>(
    {} as EditProfileFormVals
  );

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = register(formData);
    console.log(res);
    res.then((user: User | null) => {
      if (user && Object.keys(user).length > 0) {
        navigate("/");
      }
    });
  };

  return (
    <div className="ProfileEditForm">
      <h1>Edit Profile</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          required
          id="username"
          name="username"
          label="Username"
          autoComplete="username"
        />
        <TextField
          required
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
          type="email"
        />
        <TextField
          required
          id="confirm-password"
          name="confirm-password"
          label="Confirm Password"
          type="password"
          autoComplete="confirm-password"
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default ProfileEditForm;
