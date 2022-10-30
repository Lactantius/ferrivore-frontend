import React from "react";

import "./Idea.css";

function Idea({ idea }): JSX.Element {
  return (
    <a className="Idea" href={idea.url}>
      <p>{idea.description}</p>
      <p className="Idea-url">({idea.url})</p>
    </a>
  );
}

export default Idea;
