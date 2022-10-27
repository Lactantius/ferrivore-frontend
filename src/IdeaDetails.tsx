import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import { ideaDetailsReq } from "./api";
import IdeaCard from "./IdeaCard";

function IdeaDetails({ user, token }: UserProps): JSX.Element {
  const { id } = useParams();

  const [idea, setIdea] = useState({} as IdeaWithAllReactions);

  useEffect(() => {
    ideaDetailsReq(id, token, true, true).then((data) => {
      setIdea((old) => data.idea);
    });
  }, [id, token]);

  if (!user || !token) return <Navigate to="/" />;

  if (Object.keys(idea).length === 0) return <h2>Loading...</h2>;

  console.log(idea);

  return (
    <div className="IdeaDetails">
      <h1>Idea Details</h1>
      <IdeaCard idea={idea} />
    </div>
  );
}

export default IdeaDetails;
