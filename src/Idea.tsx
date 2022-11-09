import React from "react";

import "./Idea.css";
import { cleanLink } from "./helpers";

function Idea({ idea }: IdeaProps): JSX.Element {
  return (
    <a className="Idea" href={idea.url}>
      <p>{idea.description}</p>
      <p className="Idea-url">({cleanLink(idea.url)})</p>
      {"score" in idea ? (
        <p className="Idea-score">
          Score: {idea.score} | Popularity: {idea.popularity}
        </p>
      ) : (
        <></>
      )}
    </a>
  );
}

export default Idea;
