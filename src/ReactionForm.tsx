import React, { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { reactionReq, allReactionsReq } from "./api";
import Results from "./Results";

import "./ReactionForm.css";

function ReactionForm({
  idea,
  user,
  token,
  getAgreeable,
  getRandomUnseen,
  getDisagreeable,
}: ReactionFormProps): JSX.Element {
  const [results, setResults] = useState<Reaction>({} as Reaction);
  const [reactions, setReactions] = useState<Reactions>({} as Reactions);
  const [showResults, setShowResults] = useState(false);

  const submitInteresting = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const agreement = Number(e.target.value) - 4;
    const reaction = reactionReq(token, {
      ideaId: idea.ideaId,
      agreement,
      type: "like",
    });
    reaction.then((data) => setResults(data));
    getReactions(token, idea.ideaId);
  };

  const submitBoring = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reaction = reactionReq(token, {
      ideaId: idea.ideaId,
      type: "dislike",
    });
    reaction.then((data) => setResults(data));
    getReactions(token, idea.ideaId);
  };

  const getReactions = (token: string, id: string) => {
    const allReactions = allReactionsReq(token, id);
    allReactions.then((data) => {
      setReactions(data);
      setShowResults(true);
    });
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
      {showResults ? (
        <>
          <Results results={(results, reactions)} />
          <Button onClick={() => getAgreeable(token)}>Agreeable</Button>
          <Button onClick={() => getRandomUnseen(token)}>Random</Button>
          <Button onClick={() => getDisagreeable(token)}>Disagreeable</Button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ReactionForm;
