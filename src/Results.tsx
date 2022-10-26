import React from "react";

function Results({ results, reactions }): JSX.Element {
  console.log(results);
  console.log(reactions);
  return (
    <div className="Results">
      <p>Results?</p>
      <p>{results.agreement}</p>
      <p>{results.reactions}</p>
    </div>
  );
}

export default Results;
