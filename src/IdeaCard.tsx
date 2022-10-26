import React from "react";

import Results from "./Results";
import "./IdeaCard.css";

function IdeaCard({ idea }: IdeaCardProps): JSX.Element {
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
