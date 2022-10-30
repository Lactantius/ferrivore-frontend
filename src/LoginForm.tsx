import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import "./LoginForm.css";
import { loginReq } from "./api";

function LoginForm({ user, token, saveUser }: LoginFormProps): JSX.Element {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<string>("");

  const login = async (loginData: LoginFormVals) => {
    const res = await loginReq(loginData);
    if ("user" in res) {
      saveUser(res.user);
      navigate("/");
    } else {
      setFormErrors(res.msg);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const loginVals: LoginFormVals = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    login(loginVals);
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
