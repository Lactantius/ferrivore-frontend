import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { signupReq } from "./api";
import "./SignupForm.css";

function SignupForm({ user, token, saveUser }: SignupFormProps): JSX.Element {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<SignupFormErrors>(
    {} as SignupFormErrors
  );

  const signup = async (signupData: SignupFormVals) => {
    const res = await signupReq(signupData);
    if ("user" in res) {
      saveUser(res.user);
      navigate("/");
    } else {
      console.log(res.msg);
      setFormErrors(formatErrors(res.msg));
    }
  };

  const formatErrors = (err: string) => {
    if (err.includes("email")) {
      return { uniqueEmail: "Email already registered." };
    } else if (err.includes("username")) {
      return { uniqueUsername: "Username already taken." };
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
          error={"uniqueUsername" in formErrors ? true : false}
          helperText={formErrors.uniqueUsername || ""}
          id="username"
          name="username"
          label="Username"
          autoComplete="username"
        />
        <TextField
          required
          error={"uniqueEmail" in formErrors ? true : false}
          helperText={formErrors.uniqueEmail || ""}
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
        />
        <TextField
          required
          error={"passwordsMatch" in formErrors ? true : false}
          helperText={formErrors.passwordsMatch || ""}
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          required
          error={"passwordsMatch" in formErrors ? true : false}
          helperText={formErrors.passwordsMatch || ""}
          id="confirm-password"
          name="confirm-password"
          label="Confirm Password"
          type="password"
          autoComplete="confirm-password"
        />
        <Button type="submit" variant="contained">
          Sign up
        </Button>
      </Box>
    </Box>
  );
}

export default SignupForm;
