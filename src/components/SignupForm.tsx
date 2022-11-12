import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { signupReq } from "../api";
import { formatErrors } from "../helpers";
import "./SignupForm.css";

function SignupForm({ user, token, saveUser }: SignupFormProps): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormVals>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  } as SignupFormVals);

  const [formErrors, setFormErrors] = useState<SignupFormErrors>(
    {} as SignupFormErrors
  );

  const signup = async (signupData: SignupFormVals) => {
    const res = await signupReq(signupData);
    if ("user" in res) {
      saveUser(res.user);
      navigate("/");
    } else {
      setFormErrors(formatErrors(res.msg));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate(formData)) {
      signup(formData);
    }
    /* const data = new FormData(e.currentTarget);
     * const signupVals: SignupFormVals = {
     *   email: data.get("email") as string,
     *   username: data.get("username") as string,
     *   password: data.get("password") as string,
     *   confirmPassword: data.get("confirm-password") as string,
     * }; */
    /* if (validate(signupVals)) {
     *   signup(signupVals);
     * } */
    setFormData({ ...formData, password: "", confirmPassword: "" });
  };

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "password") {
      setFormErrors({
        ...formErrors,
        passwordSufficient: null,
        passwordsMatch: null,
      });
    }
    if (name === "confirmPassword") {
      setFormErrors({ ...formErrors, passwordsMatch: null });
    }
    if (name === "email") {
      setFormErrors({ ...formErrors, uniqueEmail: null, properEmail: null });
    }
    if (name === "username") {
      setFormErrors({ ...formErrors, uniqueUsername: null });
    }
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
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
          error={formErrors.uniqueUsername ? true : false}
          helperText={formErrors.uniqueUsername ?? "Input a username"}
          id="username"
          name="username"
          label="Username"
          autoComplete="username"
          onChange={handleChange}
          value={formData.username}
        />
        <TextField
          required
          error={
            formErrors.uniqueEmail || formErrors.properEmail ? true : false
          }
          helperText={
            formErrors.uniqueEmail ??
            formErrors.properEmail ??
            "We won't share it"
          }
          id="email"
          name="email"
          label="Email"
          autoComplete="email"
          onChange={handleChange}
          value={formData.email}
        />
        <TextField
          required
          error={
            formErrors.passwordsMatch || formErrors.passwordSufficient
              ? true
              : false
          }
          helperText={
            formErrors.passwordsMatch ??
            formErrors.passwordSufficient ??
            "Input a password of at least 10 characters"
          }
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
          value={formData.password}
        />
        <TextField
          required
          error={formErrors.passwordsMatch ? true : false}
          helperText={formErrors.passwordsMatch ?? "Input your password again"}
          id="confirm-password"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          autoComplete="confirm-password"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
        <Button type="submit" variant="contained">
          Sign up
        </Button>
      </Box>
    </Box>
  );
}

export default SignupForm;
