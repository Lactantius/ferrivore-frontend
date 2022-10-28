import React from "react";
import Button from "@mui/material/Button";

function GetIdeaForm({
  token,
  getAgreeable,
  getRandomUnseen,
  getDisagreeable,
}): JSX.Element {
  return (
    <div className="GetIdeaForm">
      <h3>Get a new idea</h3>
      <Button onClick={() => getAgreeable(token)}>Agreeable</Button>
      <Button onClick={() => getRandomUnseen(token)}>Random</Button>
      <Button onClick={() => getDisagreeable(token)}>Disagreeable</Button>
    </div>
  );
}

export default GetIdeaForm;
