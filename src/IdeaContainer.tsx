import React, { useState, useEffect } from "react";

import IdeaCard from "./IdeaCard";
import ReactionForm from "./ReactionForm";
import { disagreeableReq } from "./api";

function IdeaContainer({ user, token }: IdeaContainerProps): JSX.Element {
  const [idea, setIdea] = useState({} as Idea);

  useEffect(() => {
    const disagreeable = disagreeableReq(token);
    disagreeable.then((data) => setIdea(data));
  }, [token]);

  console.log(idea);

  return (
    <div className="IdeaContainer">
      <h2>What do you think?</h2>
      <IdeaCard idea={idea} />
      <ReactionForm idea={idea} user={user} />
    </div>
  );
}

export default IdeaContainer;
