import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import IdeaCard from "./IdeaCard";
import { allUserIdeasReq } from "./api";

function IdeaList({ user, token }: IdeaListProps): JSX.Element {
  const [ideas, setIdeas] = useState(Array<IdeaWithAllReactions>);

  useEffect(() => {
    allUserIdeasReq(token!).then((ideas) => setIdeas(ideas.ideas));
  }, [token]);

  if (!user || !token) return <Navigate to="/" />;

  console.log(ideas);
  return (
    <>
      <h1>Ideas</h1>
      {ideas.length > 0 ? (
        <>
          {ideas.map((idea) => {
            return <IdeaCard key={idea.ideaId} idea={idea} />;
          })}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default IdeaList;
