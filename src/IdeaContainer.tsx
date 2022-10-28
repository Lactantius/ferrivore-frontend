import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import ReactionForm from "./ReactionForm";
import { disagreeableReq, agreeableReq, randomReq } from "./api";
import "./IdeaContainer.css";
import GetIdeaForm from "./GetIdeaForm";
import Results from "./Results";

function IdeaContainer({ user, token }: IdeaContainerProps): JSX.Element {
  const [idea, setIdea] = useState<Idea | string>({} as Idea);
  const [reactionSubmitted, setReactionSubmitted] = useState<boolean>(false);
  const [userReaction, setUserReaction] = useState<UserReaction | ErrorRes>(
    {} as UserReaction
  );
  const [allReactions, setAllReactions] = useState<AllReactions | ErrorRes>(
    {} as AllReactions
  );

  useEffect(() => {
    const disagreeable = disagreeableReq(token);
    disagreeable.then((data) => {
      "idea" in data ? setIdea(data.idea) : setIdea(data.msg);
    });
  }, [token]);

  const getDisagreeable = (token: string) => {
    const disagreeable = disagreeableReq(token);
    disagreeable.then((data) => {
      "idea" in data ? setIdea(data.idea) : setIdea(data.msg);
    });
    setReactionSubmitted(false);
  };

  const getAgreeable = (token: string) => {
    const agreeable = agreeableReq(token);
    agreeable.then((data) => {
      "idea" in data ? setIdea(data.idea) : setIdea(data.msg);
    });
    setReactionSubmitted(false);
  };

  const getRandomUnseen = (token: string) => {
    const random = randomReq(token);
    random.then((data) => {
      "idea" in data ? setIdea(data.idea) : setIdea(data.msg);
    });
    setReactionSubmitted(false);
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
            setUserReaction={setUserReaction}
            setAllReactions={setAllReactions}
            setReactionSubmitted={setReactionSubmitted}
          />
          {reactionSubmitted ? (
            <>
              <GetIdeaForm
                token={token}
                getAgreeable={getAgreeable}
                getRandomUnseen={getRandomUnseen}
                getDisagreeable={getDisagreeable}
              />
              <Results
                userReaction={userReaction}
                allReactions={allReactions}
              />
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default IdeaContainer;
