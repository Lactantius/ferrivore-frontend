import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { login } from "./api";

function LoginForm(): JSX.Element {
  const [formData, setFormData] = useState({} as LoginFormVals);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(formData);
    res.then((user: UserToken | null) => {
      if (user && Object.keys(user).length > 0) {
        navigate("/");
      }
    });
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        id="email"
        name="email"
        label="Email"
        onChange={handleChange}
      />
      <TextField
        id="password"
        name="password"
        label="Password"
        type="password"
        onChange={handleChange}
      />
      <Button type="submit">Login</Button>
    </Box>
  );
}

export default LoginForm;
