import React from "react";
import Button from "@mui/material/Button";

import "./GetIdeaForm.css";

function GetIdeaForm({
  token,
  getAgreeable,
  getRandomUnseen,
  getDisagreeable,
}: GetIdeaFormProps): JSX.Element {
  return (
    <div className="GetIdeaForm">
      <h2>Get a new idea</h2>
      <div className="GetIdeaForm-buttons">
        <Button onClick={() => getAgreeable(token)} variant="outlined">
          Agreeable
        </Button>
        <Button onClick={() => getRandomUnseen(token)} variant="outlined">
          Random
        </Button>
        <Button onClick={() => getDisagreeable(token)} variant="outlined">
          Disagreeable
        </Button>
      </div>
    </div>
  );
}

export default GetIdeaForm;
