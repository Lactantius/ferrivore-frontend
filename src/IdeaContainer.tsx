import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import IdeaCard from "./IdeaCard";
import ReactionForm from "./ReactionForm";
import { disagreeableReq, agreeableReq, randomReq } from "./api";
import "./IdeaContainer.css";

function IdeaContainer({ user, token }: IdeaContainerProps): JSX.Element {
  const [idea, setIdea] = useState<Idea | string>({} as Idea);

  useEffect(() => {
    const disagreeable = disagreeableReq(token);
    disagreeable.then((data) => {
      "idea" in data ? setIdea(data.idea) : setIdea(data.error);
    });
  }, [token]);

  const getDisagreeable = (token: string) => {
    const disagreeable = disagreeableReq(token);
    disagreeable.then((data) => {
      "idea" in data ? setIdea(data.idea) : setIdea(data.error);
    });
  };

  const getAgreeable = (token: string) => {
    const agreeable = agreeableReq(token);
    agreeable.then((data) => {
      "idea" in data ? setIdea(data.idea) : setIdea(data.error);
    });
  };

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
          <h2>Here's an idea...</h2>
          <a href={idea.url}>{idea.description}</a>
          <ReactionForm
            idea={idea}
            user={user}
            token={token}
            getAgreeable={getAgreeable}
            getRandomUnseen={getRandomUnseen}
            getDisagreeable={getDisagreeable}
          />
        </>
      )}
    </div>
  );
}

export default IdeaContainer;
