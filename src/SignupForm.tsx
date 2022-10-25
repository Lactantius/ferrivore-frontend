import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function SignupForm({ signup, user }: SignupFormProps): JSX.Element {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const signupVals: SignupFormVals = {
      email: data.get("email") as string,
      username: data.get("username") as string,
      password: data.get("password") as string,
    };
    const res = signup(signupVals);
    res.then((user: UserToken | null) => {
      if (user && Object.keys(user).length > 0) {
        navigate("/");
      }
    });
  };

  return (
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
      <Button type="submit">Sign up</Button>
    </Box>
  );
}

export default SignupForm;
