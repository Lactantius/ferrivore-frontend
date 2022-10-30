import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { signupReq } from "./api";
import "./SignupForm.css";

function SignupForm({ user, token, saveUser }: SignupFormProps): JSX.Element {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<string>("");

  const signup = async (signupData: SignupFormVals) => {
    const res = await signupReq(signupData);
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
    const signupVals: SignupFormVals = {
      email: data.get("email") as string,
      username: data.get("username") as string,
      password: data.get("password") as string,
    };
    signup(signupVals);
  };

  if (user || token) {
    return <Navigate to="/" />;
  }

  return (
    <Box className="SignupForm">
      <h1>Sign up</h1>
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
          Sign up
        </Button>
      </Box>
    </Box>
  );
}

export default SignupForm;
