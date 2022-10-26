import React from "react";

function Results({ reactions }): JSX.Element {
  return (
    <div className="Results">
      <p>{reactions}</p>
    </div>
  );
}

export default Results;
