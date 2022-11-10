import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import ReactionForm from "./ReactionForm";
import { newIdeaReq } from "./api";
import "./IdeaContainer.css";
import GetIdeaForm from "./GetIdeaForm";
import Results from "./Results";
import Idea from "./Idea";

function IdeaContainer({ user, token }: IdeaContainerProps): JSX.Element {
  const [idea, setIdea] = useState<IdeaWithScore | string>("Loading...");
  const [reactionSubmitted, setReactionSubmitted] = useState<boolean>(false);
  const [userReaction, setUserReaction] = useState<UserReaction | ErrorRes>(
    {} as UserReaction
  );
  const [allReactions, setAllReactions] = useState<AllReactions | ErrorRes>(
    {} as AllReactions
  );

  useEffect(() => {
    const getFirstIdea = async () => {
      const disagreeable = await newIdeaReq("disagreeable")(token);
      if ("idea" in disagreeable) {
        return disagreeable;
      }
      const popular = await newIdeaReq("popular")(token);
      return popular;
    };
    getFirstIdea().then((data) =>
      setIdea("idea" in data ? data.idea : data.msg)
    );
  }, [token]);

  type GetIdeaFunc = (token: string) => (ideaType: string) => void;
  const getIdea: GetIdeaFunc = (token) => (ideaType) => {
    newIdeaReq(ideaType)(token).then((data) => {
      "idea" in data ? setIdea(data.idea) : setIdea(data.msg);
    });
    setReactionSubmitted(false);
  };

  return (
    <div className="IdeaContainer">
      <React.StrictMode>
        {typeof idea === "string" ? (
          <>
            <h3 className="IdeaContainer-empty">{idea}</h3>
            {idea.includes("disagree") || idea.includes("nice") ? (
              <Button
                onClick={() => getIdea(token)("popular")}
                variant="outlined"
              >
                Get a popular idea
              </Button>
            ) : (
              <Button href="/new" variant="outlined">
                Add more ideas
              </Button>
            )}
          </>
        ) : (
          <>
            <h1>Here’s an idea...</h1>
            <Idea idea={idea} />
            <ReactionForm
              idea={idea}
              user={user}
              token={token}
              initialValue={null}
              setUserReaction={setUserReaction}
              setAllReactions={setAllReactions}
              setReactionSubmitted={setReactionSubmitted}
              reactionSubmitted={reactionSubmitted}
            />
            {reactionSubmitted ? (
              <>
                <GetIdeaForm getIdea={getIdea(token)} />
                <Results
                  userReaction={userReaction}
                  anonReactions={allReactions}
                />
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </React.StrictMode>
    </div>
  );
}

export default IdeaContainer;
