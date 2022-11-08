import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Rating from "@mui/material/Rating";

import { allUserIdeasReq, allPostedIdeasReq } from "./api";
import "./IdeaList.css";

function IdeaList({ user, token }: IdeaListProps): JSX.Element {
  const [ideas, setIdeas] = useState(Array<IdeaWithAllReactions>);
  const [postedOnly, setPostedOnly] = useState(false);

  useEffect(() => {
    setReactedIdeas(token!);
  }, [token]);

  const setPostedIdeas = (user: User, token: string) =>
    allPostedIdeasReq(user, token).then((i) => setIdeas(i.ideas));

  const setReactedIdeas = (token: string) =>
    allUserIdeasReq(token).then((i) => setIdeas(i.ideas));

  if (!user || !token) return <Navigate to="/" />;

  console.log(ideas);
  return (
    <div className="IdeaList">
      <h1>Ideas</h1>
      {postedOnly ? (
        <>
          <p>These are the ideas you have posted.</p>
          <Button
            onClick={() => {
              setReactedIdeas(token);
              setPostedOnly(false);
            }}
          >
            See all viewed ideas
          </Button>
        </>
      ) : (
        <>
          <p>These are the ideas you have rated.</p>
          <Button
            onClick={() => {
              setPostedIdeas(user, token);
              setPostedOnly(true);
            }}
          >
            See only ideas you have posted
          </Button>
        </>
      )}
      <Button href="/">See new ideas instead</Button>
      {ideas.length > 0 ? (
        <Table className="IdeaList-table">
          <TableHead>
            <TableRow>
              <TableCell>Idea</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Agreement Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ideas.map((idea) => {
              return (
                <TableRow>
                  <TableCell>{idea.description}</TableCell>
                  <TableCell>
                    <a href={idea.url}>{idea.url}</a>
                  </TableCell>
                  <TableCell>
                    {idea.userAgreement ? (
                      <Rating
                        name="agreement"
                        max={7}
                        value={idea.userAgreement + 4}
                        readOnly
                      />
                    ) : (
                      <i>Not interested</i>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <p>You have not rated any ideas yet.</p>
      )}
    </div>
  );
}

export default IdeaList;
