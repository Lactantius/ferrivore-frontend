import React from "react";

function IdeaCard({ idea }: IdeaCardProps): JSX.Element {
  return (
    <div className="IdeaCard">
      <a href={idea.url}>{idea.description}</a>
    </div>
  );
}

export default IdeaCard;
