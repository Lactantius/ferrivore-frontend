import React from "react";
import { BarChart, XAxis, Bar, Tooltip } from "recharts";

import "./Results.css";

const freqMap: <T>(arr: Array<T>) => Map<T, number> = <T,>(arr: Array<T>) => {
  return arr.reduce<Map<T, number>>((acc, elem) => {
    acc.has(elem) ? acc.set(elem, Number(acc.get(elem)) + 1) : acc.set(elem, 1);
    return acc;
  }, new Map());
};

const frequencyArray: <T>(map: Map<T, number>) => Array<GraphData<T>> = (map) =>
  Array.from(map, ([name, frequency]) => ({ name, frequency }));

const formatResults = (userReaction: UserReaction) => {
  console.log(userReaction);
  if (userReaction.userReaction === "DISLIKES") {
    return "This just wasn't very interesting.";
  }

  const agreementMap = new Map([
    [-3, "think this is totally wrong"],
    [-2, "seriously doubt this"],
    [-1, "are somewhat sceptical"],
    [0, "are neutral"],
    [1, "think this is more likely than not"],
    [2, "see this as quite likely"],
    [3, "couldn't agree more"],
  ]);
  return `You ${agreementMap.get(userReaction.userAgreement!)}.`;
};

function Results({ userReaction, allReactions }: ResultsProps): JSX.Element {
  console.log(userReaction);
  console.log(allReactions);
  if (
    "msg" in userReaction ||
    "msg" in allReactions ||
    Object.keys(allReactions).length === 0 ||
    Object.keys(userReaction).length === 0
  ) {
    return <h2>Results could not be displayed.</h2>;
  }

  const graphReactions = frequencyArray(
    freqMap(
      allReactions.allReactions.filter((allReactions) =>
        ["LIKES", "DISLIKES"].includes(allReactions)
      )
    )
  );
  const graphAgreement = frequencyArray(
    freqMap(allReactions.allAgreement)
  ).sort((a, b) => a.name - b.name);

  return (
    <div className="Results">
      <p>{formatResults(userReaction)}</p>
      <h2>What other people thought</h2>
      {graphAgreement.length > 2 ? (
        <>
          <div>
            <h3>How many people found it interesting?</h3>
            <BarChart data={graphReactions} height={150} width={400}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="frequency" fill="blue" />
            </BarChart>
          </div>
          <div>
            <h3>How much did people agree?</h3>
            <BarChart data={graphAgreement} height={200} width={400}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="frequency" fill="blue" />
            </BarChart>
          </div>
        </>
      ) : (
        <p>
          <i>Not many people have rated this idea.</i>
        </p>
      )}
    </div>
  );
}

export default Results;
