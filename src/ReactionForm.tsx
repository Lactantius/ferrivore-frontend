import React, { ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import { reactReq, allReactionsReq } from "./api";

import "./ReactionForm.css";

function ReactionForm({
  idea,
  user,
  token,
  setUserReaction,
  setAllReactions,
  setReactionSubmitted,
}: ReactionFormProps): JSX.Element {
  const submitInteresting = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const agreement = Number(e.target.value) - 4;
    const reactionRes = reactReq(token, {
      ideaId: idea.ideaId,
      agreement,
      type: "like",
    });
    if (setAllReactions) {
      getReactions(reactionRes, token, idea.ideaId);
    }
  };

  const submitBoring = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reactionRes = reactReq(token, {
      ideaId: idea.ideaId,
      type: "dislike",
    });
    if (setAllReactions) {
      getReactions(reactionRes, token, idea.ideaId);
    }
  };

  const getReactions = (
    reactionPromise: Promise<Reaction | ErrorRes>,
    token: string,
    id: string
  ) => {
    const allReactionsPromise = allReactionsReq(token, id);
    Promise.all([reactionPromise, allReactionsPromise]).then(
      ([reaction, allReactions]) => {
        console.log(reaction);
        if ("ideaId" in reaction) {
          setUserReaction({
            userReaction: reaction.type,
            userAgreement: reaction.agreement,
          });
        } else {
          setUserReaction(reaction);
        }
        setAllReactions(allReactions);
        if (setReactionSubmitted) {
          setReactionSubmitted(true);
        }
      }
    );
  };

  return (
    <div className="ReactionForm">
      <h2>Do you agree?</h2>
      <Box component="form">
        <legend>Agreement Level</legend>
        <Rating name="agreement" max={7} onChange={submitInteresting} />
      </Box>
      <Box component="form" onSubmit={submitBoring}>
        <Button type="submit">I am not interested</Button>
      </Box>
    </div>
  );
}

export default ReactionForm;
