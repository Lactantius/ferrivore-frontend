import React from "react";

const freqMap: (arr: Array<T>) => Map<T, number> = (arr) => {
  return (sortedReactions = arr.reduce<Map<T, number>>((acc, elem) => {
    acc.has(elem) ? acc.set(elem, acc.get(elem) + 1) : acc.set(elem, 1);
    return acc;
  }, new Map()));
};

function Results({ results, reactions }): JSX.Element {
  console.log(results);
  console.log(reactions);
  return (
    <div className="Results">
      <p>{freqMap(reactions.agreement)}</p>
      <p>{freqMap(reactions.reactions)}</p>
    </div>
  );
}

export default Results;
