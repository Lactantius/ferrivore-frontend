import React from "react";
import Button from "@mui/material/Button";

import Results from "./Results";
import "./IdeaCard.css";

function IdeaCard({ idea, user }: IdeaCardProps): JSX.Element {
  return (
    <div className="IdeaCard">
      <a href={idea.url}>{idea.description}</a>
      <Results
        allReactions={{
          allReactions: idea.allReactions,
          allAgreement: idea.allAgreement,
        }}
        userReaction={{
          userReaction: idea.userReaction,
          userAgreement: idea.userAgreement,
        }}
      />
    </div>
  );
}

export default IdeaCard;
