import React, { useState, useEffect } from "react";

import IdeaCard from "./IdeaCard";
import ReactionForm from "./ReactionForm";
import { disagreeableReq } from "./api";

function IdeaContainer({ user, token }: IdeaContainerProps): JSX.Element {
  const [idea, setIdea] = useState<Idea | string>({} as Idea);

  useEffect(() => {
    const disagreeable = disagreeableReq(token);
    disagreeable.then((data) => {
      "idea" in data ? setIdea(data.idea) : setIdea(data.error);
    });
  }, [token]);

  console.log(idea);

  return (
    <div className="IdeaContainer">
      {typeof idea === "string" ? (
        <h3>{idea}</h3>
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
