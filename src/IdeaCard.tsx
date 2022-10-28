import React from "react";

import Results from "./Results";
import "./IdeaCard.css";

function IdeaCard({ idea }: IdeaCardProps): JSX.Element {
  if ("msg" in idea) {
    return <p>There was a problem displaying the idea.</p>;
  }
  return (
    <div className="IdeaCard">
      <a href={idea.url}>{idea.description}</a>
      {"allReactions" in idea ? (
        <Results
          anonReactions={{
            allReactions: idea.allReactions,
            allAgreement: idea.allAgreement,
          }}
          userReaction={{
            userReaction: idea.userReaction,
            userAgreement: idea.userAgreement,
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default IdeaCard;
