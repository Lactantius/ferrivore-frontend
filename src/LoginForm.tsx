import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { login } from "./api";

function LoginForm(): JSX.Element {
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
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField required id="email" name="email" label="Email" />
      <TextField
        required
        id="password"
        name="password"
        label="Password"
        type="password"
      />
      <Button type="submit">Login</Button>
    </Box>
  );
}

export default LoginForm;