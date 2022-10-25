import React, { ChangeEvent, SyntheticEvent } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { reactionReq } from "./api";

import "./ReactionForm.css";

function ReactionForm({ idea, user, token }: ReactionFormProps): JSX.Element {
  const submitInteresting = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const agreement = Number(e.target.value) - 4;
    const reaction = reactionReq(token, {
      ideaId: idea.ideaId,
      agreement,
      type: "like",
    });
    console.log(reaction);
  };

  const submitBoring = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reaction = reactionReq(token, {
      ideaId: idea.ideaId,
      type: "dislike",
    });
    console.log(reaction);
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
