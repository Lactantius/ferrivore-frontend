import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { signupReq } from "./api";
import { formatErrors } from "./helpers";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formErrors);
    const data = new FormData(e.currentTarget);
    const signupVals: SignupFormVals = {
      email: data.get("email") as string,
      username: data.get("username") as string,
      password: data.get("password") as string,
      confirmPassword: data.get("confirm-password") as string,
    };
    if (validate(signupVals)) {
      signup(signupVals);
    }
  };

  const validate = (data: SignupFormVals) => {
    const passwordsMatch = data.password === data.confirmPassword;
    const passwordSufficient = data.password.length > 9;
    const properEmail = data.email.toLowerCase().match(
      // From https://stackoverflow.com/a/46181/6632828
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    if (passwordsMatch && passwordSufficient && properEmail) {
      return true;
    }
    if (!passwordsMatch) {
      setFormErrors({
        ...formErrors,
        passwordsMatch: "Passwords do not match.",
      });
    }
    if (!properEmail) {
      setFormErrors({
        ...formErrors,
        properEmail: "Please enter a validly formatted email.",
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
          helperText={formErrors.uniqueUsername ?? ""}
          id="username"
          name="username"
          label="Username"
          autoComplete="username"
        />
        <TextField
          required
          error={
            "uniqueEmail" in formErrors || "properEmail" in formErrors
              ? true
              : false
          }
          helperText={formErrors.uniqueEmail ?? formErrors.properEmail ?? ""}
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
        />
        <TextField
          required
          error={
            "passwordsMatch" in formErrors || "passwordSufficient" in formErrors
              ? true
              : false
          }
          helperText={
            formErrors.passwordsMatch ?? formErrors.passwordSufficient ?? ""
          }
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          required
          error={"passwordsMatch" in formErrors ? true : false}
          helperText={formErrors.passwordsMatch ?? ""}
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
