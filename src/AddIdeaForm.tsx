import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import { addIdeaReq } from "./api";

import "./AddIdeaForm.css";

function AddIdeaForm({ user, token }: AddIdeaFormProps): JSX.Element {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const IdeaVals: AddIdeaFormVals = {
      url: data.get("url") as string,
      description: data.get("description") as string,
    };
    const res = addIdeaReq(token, IdeaVals);
    console.log(res);
    res.then(idea => {
      navigate(`/ideas/${idea.ideaId}`);
    })
  };

  return (
    <Box className="AddIdeaForm">
      <h2>Add A New Idea</h2>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          required
          id="url"
          name="url"
          label="URL"
          type="text"
          autoComplete="url"
        />
        <TextField
          required
          id="description"
          name="description"
          label="Description"
          type="text"
          autoComplete="description"
        />
        <Button type="submit" variant="contained">
          Submit Idea
        </Button>
      </Box>
    </Box>
  );
}

export default AddIdeaForm;
