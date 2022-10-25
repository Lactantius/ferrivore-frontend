import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import "./LoginForm.css";

function LoginForm({ user, login }: LoginFormProps): JSX.Element {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const loginVals: LoginFormVals = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    const res = login(loginVals);
    res.then((user: UserToken | null) => {
      if (user && Object.keys(user).length > 0) {
        navigate("/");
      }
    });
  };

  return (
    <Box className="LoginForm">
      <h1>Log in</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          required
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
        />
        <TextField
          required
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default LoginForm;
