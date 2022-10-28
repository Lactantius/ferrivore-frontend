import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";

import IdeaCard from "./IdeaCard";
import { allUserIdeasReq, allPostedIdeasReq, deleteIdeaReq } from "./api";
import "./IdeaList.css";

function IdeaList({ user, token }: IdeaListProps): JSX.Element {
  const [ideas, setIdeas] = useState(Array<IdeaWithAllReactions>);
  const [postedOnly, setPostedOnly] = useState(false);

  useEffect(() => {
    setReactedIdeas(token!);
  }, [token]);

  const setPostedIdeas = (user: User, token: string) =>
    allPostedIdeasReq(user, token).then((i) => setIdeas(i.ideas));

  const setReactedIdeas = (token: string) =>
    allUserIdeasReq(token).then((i) => setIdeas(i.ideas));

  if (!user || !token) return <Navigate to="/" />;

  console.log(ideas);
  return (
    <div className="IdeaList">
      <h1>Ideas</h1>
      {postedOnly ? (
        <Button
          onClick={() => {
            setReactedIdeas(token);
            setPostedOnly(false);
          }}
        >
          See all viewed ideas
        </Button>
      ) : (
        <Button
          onClick={() => {
            setPostedIdeas(user, token);
            setPostedOnly(true);
          }}
        >
          See only ideas you have posted
        </Button>
      )}
      {ideas.length > 0 ? (
        <>
          {ideas.map((idea) => {
            return (
              <div className="IdeaList-idea">
                <IdeaCard key={idea.ideaId} idea={idea} />
                <Button
                  key={"button" + idea.ideaId}
                  href={`/ideas/${idea.ideaId}`}
                  variant="outlined"
                >
                  View Details
                </Button>
              </div>
            );
          })}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default IdeaList;
