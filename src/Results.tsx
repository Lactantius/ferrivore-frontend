import React from "react";
import { BarChart, XAxis, Bar, Tooltip, Legend } from "recharts";

const freqMap: (arr: Array<T>) => Map<T, number> = (arr) => {
  return arr.reduce<Map<T, number>>((acc, elem) => {
    acc.has(elem) ? acc.set(elem, acc.get(elem) + 1) : acc.set(elem, 1);
    return acc;
  }, new Map());
};

const dataArray = (map) =>
  Array.from(map, ([name, value]) => ({ name, value }));

const dataObj = (map: Map) => map;

function Results({ results, reactions }): JSX.Element {
  console.log(results);
  console.log(reactions);
  const graphReactions = dataArray(freqMap(reactions.reactions));
  const graphAgreement = dataArray(freqMap(reactions.agreement));
  console.log(graphAgreement);
  console.log(graphReactions);
  return (
    <div className="Results">
      <BarChart data={graphReactions} height={200} width={200}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="blue" />
      </BarChart>
      <BarChart data={graphAgreement} height={200} width={200}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="blue" />
      </BarChart>
      <p>{freqMap(reactions.reactions)}</p>
    </div>
  );
}

export default Results;
