import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import { reactReq, allReactionsReq } from "./api";

import "./ReactionForm.css";

function ReactionForm({
  idea,
  user,
  token,
  initialValue,
  setUserReaction,
  setAllReactions,
  setReactionSubmitted,
}: ReactionFormProps): JSX.Element {
  const [value, setValue] = React.useState<number | null>(null);

  useEffect(() => setValue(initialValue), [idea, initialValue]);

  const submitInteresting = (val: number | null) => {
    const agreement = Number(val) - 4;
    const reactionRes = reactReq(token, {
      ideaId: idea.ideaId,
      agreement,
      type: "like",
    });
    if (setReactionSubmitted) {
      setReactionSubmitted(true);
    }
    if (setUserReaction) {
      getReactions(reactionRes, token, idea.ideaId);
    }
  };
  const submitBoring = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reactionRes = reactReq(token, {
      ideaId: idea.ideaId,
      type: "dislike",
    });
    if (setReactionSubmitted) {
      setReactionSubmitted(true);
    }
    if (setAllReactions) {
      getReactions(reactionRes, token, idea.ideaId);
    }
  };

  /* Process user reactions, get reactions from other users, and set the reaction submitted variable */
  const getReactions = (
    reactionPromise: Promise<ReactionRes | ErrorRes>,
    token: string,
    id: string
  ) => {
    reactionPromise
      .then((reaction) => {
        if ("reaction" in reaction) {
          setUserReaction({
            userReaction: reaction.reaction.type,
            userAgreement: reaction.reaction.agreement,
          });
        } else {
          setUserReaction(reaction);
        }
      })
      .then((_) => allReactionsReq(token, id))
      .then((allReactions) => {
        // Let the first request finish so that the new reaction will be included.
        if ("reactions" in allReactions) {
          setAllReactions(allReactions.reactions);
        } else {
          setAllReactions(allReactions);
        }
      });
  };

  return (
    <div className="ReactionForm">
      <h2>How much do you agree?</h2>
      <Box component="form">
        <legend>Agreement Level</legend>
        <Rating
          name="agreement"
          max={7}
          value={value}
          onChange={(event, newValue) => {
            setValue(() => newValue);
            submitInteresting(newValue);
          }}
          size="large"
        />
      </Box>
      <Box component="form" onSubmit={submitBoring}>
        <Button type="submit" variant="outlined">
          I am not interested in this idea
        </Button>
      </Box>
    </div>
  );
}

export default ReactionForm;
