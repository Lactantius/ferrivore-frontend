import React, { ChangeEvent, SyntheticEvent } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import "./ReactionForm.css";
function ReactionForm({ idea, user }: ReactionFormProps): JSX.Element {
  const submitInteresting = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const agreement = Number(e.target.value) - 4;
  };

  const submitBoring = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <Box className="ReactionForm" component="form">
        <Typography component="legend">Agreement</Typography>
        <Rating name="agreement" max={7} onChange={submitInteresting} />
      </Box>
      <Box className="ReactionForm" component="form" onSubmit={submitBoring}>
        <Button type="submit">Boring</Button>
      </Box>
    </>
  );
}

export default ReactionForm;
