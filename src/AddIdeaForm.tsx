import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { addIdeaReq } from "./api";

function AddIdeaForm({ user, token }: AddIdeaFormProps): JSX.Element {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const IdeaVals: AddIdeaFormVals = {
      url: data.get("url") as string,
      description: data.get("description") as string,
    };
    const res = addIdeaReq(token, IdeaVals);
    console.log(res);
  };

  return (
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
      <Button type="submit">Submit Idea</Button>
    </Box>
  );
}

export default AddIdeaForm;
