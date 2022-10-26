import React from "react";
import { BarChart, XAxis, Bar, Tooltip } from "recharts";

const freqMap: (arr: Array<T>) => Map<T, number> = (arr) => {
  return arr.reduce<Map<T, number>>((acc, elem) => {
    acc.has(elem) ? acc.set(elem, acc.get(elem) + 1) : acc.set(elem, 1);
    return acc;
  }, new Map());
};

const dataArray = (map) =>
  Array.from(map, ([name, value]) => ({ name, value }));

function Results({ results, reactions }): JSX.Element {
  console.log(results);
  console.log(reactions);
  const graphReactions = dataArray(
    freqMap(
      reactions.reactions.filter((reaction) =>
        ["LIKES", "DISLIKES"].includes(reaction)
      )
    )
  ).sort((a, b) => a.name > b.name);
  const graphAgreement = dataArray(freqMap(reactions.agreement)).sort(
    (a, b) => a.name - b.name
  );
  return (
    <div className="Results">
      <h2>Who found it interesting</h2>
      <BarChart data={graphReactions} height={200} width={200}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="value" fill="blue" />
      </BarChart>
      <h2>Level of agreement</h2>
      <BarChart data={graphAgreement} height={200} width={200}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="value" fill="blue" />
      </BarChart>
    </div>
  );
}

export default Results;
