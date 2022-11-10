import React from "react";

import "./Idea.css";
import { cleanLink } from "./helpers";

function Idea({ idea }: IdeaProps): JSX.Element {
  return (
    <a className="Idea" href={idea.url}>
      <p>{idea.description}</p>
      <p className="Idea-url">({cleanLink(idea.url)})</p>
      {"score" in idea ? (
        <table className="Idea-score">
          <tr>
            <td>Agreement Score:</td>
            <td>{idea.score ? idea.score.toPrecision(3) : "N/A"}</td>
          </tr>
          <tr>
            <td>Popularity Score:</td>
            <td>{idea.popularity ?? "N/A"}</td>
          </tr>
        </table>
      ) : (
        <></>
      )}
    </a>
  );
}

export default Idea;
