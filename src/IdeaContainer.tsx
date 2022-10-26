import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import IdeaCard from "./IdeaCard";
import ReactionForm from "./ReactionForm";
import { disagreeableReq, randomReq } from "./api";

function IdeaContainer({ user, token }: IdeaContainerProps): JSX.Element {
  const [idea, setIdea] = useState<Idea | string>({} as Idea);

  useEffect(() => {
    const disagreeable = disagreeableReq(token);
    disagreeable.then((data) => {
      "idea" in data ? setIdea(data.idea) : setIdea(data.error);
    });
  }, [token]);

  const getRandomUnseen = (token: string) => {
    const random = randomReq(token);
    random.then((data) => {
      "idea" in data ? setIdea(data.idea) : setIdea(data.error);
    });
  };

  return (
    <div className="IdeaContainer">
      {typeof idea === "string" ? (
        <>
          <h3>{idea}</h3>
          <Button onClick={() => getRandomUnseen(token)}>Random Idea</Button>
        </>
      ) : (
        <>
          <h2>What do you think?</h2>
          <IdeaCard idea={idea} />
          <ReactionForm idea={idea} user={user} token={token} />
        </>
      )}
    </div>
  );
}

export default IdeaContainer;
