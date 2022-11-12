import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

import { ideaDetailsReq, deleteIdeaReq } from "../api";
import IdeaCard from "./IdeaCard";
import ReactionForm from "./ReactionForm";
import "./IdeaDetails.css";

function IdeaDetails({ user, token }: UserProps): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();

  const [idea, setIdea] = useState<Idea | IdeaWithAllReactions | ErrorRes>(
    {} as IdeaWithAllReactions
  );
  useEffect(() => {
    const getIdea = async () => {
      const withReactions = await ideaDetailsReq(id!, token!, true, true);
      if ("idea" in withReactions) {
        setIdea(withReactions.idea);
      } else {
        const withoutReactions = await ideaDetailsReq(id!, token!);
        setIdea(() =>
          "idea" in withoutReactions ? withoutReactions.idea : withoutReactions
        );
      }
    };
    void getIdea();
  }, [id, token]);

  const deleteIdea = (token: string, id: string) => {
    void deleteIdeaReq(id, token);
    navigate("/ideas");
  };

  if (user == null || !token) return <Navigate to="/" />;

  if (!idea || Object.keys(idea).length === 0) return <h2>Loading...</h2>;

  if ("msg" in idea) {
    return <h2>{idea.msg}</h2>;
  }

  return (
    <div className="IdeaDetails">
      <React.StrictMode>
        <h1>Idea Details</h1>
        <IdeaCard idea={idea} />
        <ReactionForm
          idea={idea}
          user={user}
          token={token}
          initialValue={
            "userReaction" in idea && idea.userReaction === "LIKES"
              ? idea.userAgreement! + 4
              : null
          }
          reactionSubmitted={true}
        />
        {idea.postedBy === user.userId ? (
          <Button
            className="IdeaDetails-delete"
            variant="contained"
            color="error"
            onClick={() => deleteIdea(token, idea.ideaId)}
          >
            Delete idea
          </Button>
        ) : (
          <></>
        )}
      </React.StrictMode>
    </div>
  );
}

export default IdeaDetails;
