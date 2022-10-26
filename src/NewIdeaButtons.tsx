import React from "react";
import Button from "@mui/material/Button";

function NewIdeaButtons({
  token,
  getDisagreeable,
  getAgreeable,
  getRandomUnseen,
}): JSX.Element {
  return (
    <>
      <Button onClick={() => getAgreeable(token)}>Agreeable</Button>
      <Button onClick={() => getRandomUnseen(token)}>Random</Button>
      <Button onClick={() => getDisagreeable(token)}>Disagreeable</Button>
    </>
  );
}

export default NewIdeaButtons;
