import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Navigate, useNavigate } from "react-router-dom";

import { addIdeaReq, deleteIdeaReq } from "../api";

import "./AddIdeaForm.css";
import ReactionForm from "./ReactionForm";

type ValidateFunction = (data: AddIdeaFormVals) => AddIdeaFormErrors;
const validate: ValidateFunction = (data) => {
  const descriptionIsLongEnough =
    data.description.length > 9 ? null : "Please enter a longer description.";
  const descriptionIsShortEnough =
    data.description.length < 2000 ? null : "Max description length: 2000";
  const urlIsValid = checkUrl(data.url) ? null : "Please enter a valid URL.";
  return {
    descriptionIsLongEnough,
    descriptionIsShortEnough,
    urlIsValid,
    submission: null,
  };
};

type CheckURLFunction = (url: string) => boolean;
const checkUrl: CheckURLFunction = (url) => {
  const match = url.toLowerCase().match(
    // From https://stackoverflow.com/a/8234912/6632828
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
  );
  return match != null;
};

function AddIdeaForm({ user, token }: AddIdeaFormProps): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AddIdeaFormVals>({
    url: "",
    description: "",
  });
  const [reactionSubmitted, setReactionSubmitted] = useState<boolean>(false);
  const [idea, setIdea] = useState<Idea | null>(null);
  const [formErrors, setFormErrors] = useState<AddIdeaFormErrors>({
    urlIsValid: null,
    descriptionIsLongEnough: null,
    descriptionIsShortEnough: null,
    submission: null,
  });

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "url") {
      setFormErrors((errors) => ({ ...errors, urlIsValid: null }));
    }
    if (name === "description") {
      setFormErrors((errors) => ({
        ...errors,
        descriptionIsLongEnough: null,
        descriptionIsShortEnough: null,
      }));
    }
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Silently add "https://" if initial validation fails
    /* const fData = {
     *   ...formData,
     *   url: checkUrl(formData.url) ? formData.url : `https://${formData.url}`,
     * }; */
    const validationErrors = validate(formData);
    setFormErrors(validationErrors);
    if (Object.values(validationErrors).every((e) => e === null)) {
      const res = addIdeaReq(token!, formData);
      void res.then((data) => {
        "idea" in data
          ? setIdea(data.idea)
          : setFormErrors((errors) => ({ ...errors, submission: data.msg }));
      });
    }
  };

  if (user == null || !token) {
    return <Navigate to="/" />;
  }

  return (
    <Box className="AddIdeaForm">
      <h1>Add A New Idea</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          required
          error={!!formErrors.urlIsValid}
          helperText={
            formErrors.urlIsValid ?? "Link to the idea (book, blog post, etc.)"
          }
          id="url"
          name="url"
          label="URL"
          type="text"
          autoComplete="url"
          onChange={handleChange}
          value={formData.url}
        />
        <TextField
          required
          multiline={true}
          error={
            !!(
              formErrors.descriptionIsLongEnough ||
              formErrors.descriptionIsShortEnough
            )
          }
          helperText={
            formErrors.descriptionIsLongEnough ??
            formErrors.descriptionIsShortEnough ??
            `Summary of the idea (${
              2000 - formData.description.length
            } characters remaining)`
          }
          id="description"
          name="description"
          label="Description"
          type="text"
          autoComplete="description"
          onChange={handleChange}
          value={formData.description}
        />
        <Button type="submit" variant="contained">
          Submit Idea
        </Button>
      </Box>
      {idea != null ? (
        <ReactionForm
          idea={idea}
          user={user}
          token={token}
          initialValue={null}
          setReactionSubmitted={setReactionSubmitted}
          reactionSubmitted={reactionSubmitted}
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
        onClick={() => {
          if (idea != null) {
            void deleteIdeaReq(idea.ideaId, token);
          }
          navigate("/");
        }}
      >
        Cancel
      </Button>
    </Box>
  );
}

export default AddIdeaForm;
