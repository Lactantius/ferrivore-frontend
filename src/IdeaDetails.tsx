import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

import { ideaDetailsReq, deleteIdeaReq } from "./api";
import IdeaCard from "./IdeaCard";

function IdeaDetails({ user, token }: UserProps): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();

  const [idea, setIdea] = useState({} as IdeaWithAllReactions);

  useEffect(() => {
    ideaDetailsReq(id, token, true, true).then((data) => {
      setIdea((old) => data.idea);
    });
  }, [id, token]);

  const deleteIdea = (token: string, id: string) => {
    deleteIdeaReq(id, token);
    navigate("/ideas");
  };

  if (!user || !token) return <Navigate to="/" />;

  if (Object.keys(idea).length === 0) return <h2>Loading...</h2>;

  console.log(idea);

  return (
    <div className="IdeaDetails">
      <h1>Idea Details</h1>
      <IdeaCard idea={idea} user={user} />
      {idea.postedBy === user?.userId ? (
        <Button
          variant="contained"
          onClick={() => deleteIdea(token, idea.ideaId)}
        >
          Delete
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default IdeaDetails;
