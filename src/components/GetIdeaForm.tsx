import React from "react";
import Button from "@mui/material/Button";

import "./GetIdeaForm.css";

function GetIdeaForm ({ getIdea }: GetIdeaFormProps): JSX.Element {
  return (
    <div className="GetIdeaForm">
      <h2>Get a new idea</h2>
      <div className="GetIdeaForm-buttons">
        <Button onClick={() => getIdea("agreeable")} variant="outlined">
          Agreeable
        </Button>
        <Button onClick={() => getIdea("random-unseen")} variant="outlined">
          Random
        </Button>
        <Button onClick={() => getIdea("popular")} variant="outlined">
          Popular
        </Button>
        <Button onClick={() => getIdea("disagreeable")} variant="outlined">
          Disagreeable
        </Button>
      </div>
    </div>
  );
}

export default GetIdeaForm;
