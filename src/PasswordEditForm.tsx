import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function PasswordEditForm({ user, token }: PasswordEditFormProps): JSX.Element {
  const [formData, setFormData] = useState<PasswordEditFormVals>(
    {} as PasswordEditFormVals
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
    <div className="PasswordEditForm">
      <h1>Edit Password</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          required
          id="current-password"
          name="current-password"
          label="Current Password"
          autoComplete="password"
          type="password"
        />
        <TextField
          required
          id="new-password"
          name="new-password"
          label="New Password"
          autoComplete="password"
          type="password"
        />
        <TextField
          required
          id="confirm-new-password"
          name="confirm-new-password"
          label="Confirm New Password"
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

export default PasswordEditForm;
