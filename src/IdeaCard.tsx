import React from "react";
import Button from "@mui/material/Button";

import Results from "./Results";
import "./IdeaCard.css";

function IdeaCard({ idea, user }: IdeaCardProps): JSX.Element {
  console.log(idea);
  console.log(user);
  return (
    <div className="IdeaCard">
      <a href={idea.url}>{idea.description}</a>
      <Results
        reactions={{
          reactions: idea.allReactions,
          agreement: idea.allAgreement,
        }}
        results={{
          reaction: {
            ideaId: idea.ideaId,
            type: idea.userRelationship,
            agreement: idea.userAgreement,
          },
        }}
      />
    </div>
  );
}

export default IdeaCard;
