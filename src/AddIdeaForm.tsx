import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Navigate, useNavigate } from "react-router-dom";

import { addIdeaReq } from "./api";

import "./AddIdeaForm.css";
import ReactionForm from "./ReactionForm";

function AddIdeaForm({ user, token }: AddIdeaFormProps): JSX.Element {
  const navigate = useNavigate();
  const [reactionSubmitted, setReactionSubmitted] = useState<boolean>(false);
  const [idea, setIdea] = useState<Idea | null>(null);
  const [formErrors, setFormErrors] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const IdeaVals: AddIdeaFormVals = {
      url: data.get("url") as string,
      description: data.get("description") as string,
    };
    const res = addIdeaReq(token!, IdeaVals);
    res.then((data) => {
      "idea" in data ? setIdea(data.idea) : setFormErrors(data.msg);
    });
  };

  if (!user || !token) {
    return <Navigate to="/" />;
  }

  console.log(reactionSubmitted);

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
          Submit
        </Button>
      </Box>
      {idea ? (
        <ReactionForm
          idea={idea}
          user={user}
          token={token}
          initialValue={null}
          setReactionSubmitted={setReactionSubmitted}
        />
      ) : (
        <></>
      )}
      {reactionSubmitted ? (
        <Button
          className="AddIdeaForm-save"
          variant="contained"
          onClick={() => navigate("/")}
        >
          Save
        </Button>
      ) : (
        <></>
      )}
      <Button
        className="AddIdeaForm-cancel"
        variant="contained"
        color="error"
        onClick={() => navigate("/")}
      >
        Cancel
      </Button>
    </Box>
  );
}

export default AddIdeaForm;
