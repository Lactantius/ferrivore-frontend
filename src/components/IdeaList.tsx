import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Rating from "@mui/material/Rating";

import { allUserIdeasReq, allPostedIdeasReq } from "../api";
import { cleanLink } from "../helpers";
import "./IdeaList.css";

const truncateString: (length: number) => (str: string) => string =
  (length: number) => (str: string) =>
    str.length > length ? str.slice(0, length - 3).concat("...") : str;

function IdeaList({ user, token }: IdeaListProps): JSX.Element {
  const [ideas, setIdeas] = useState<IdeaWithAllReactions[] | ErrorRes>(
    Array<IdeaWithAllReactions>
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [postedOnly, setPostedOnly] = useState(false);

  useEffect(() => {
    void setReactedIdeas(token!);
  }, [token]);

  const setPostedIdeas = async (user: User, token: string) =>
    await allPostedIdeasReq(user, token).then((i) => {
      setIdeas("ideas" in i ? i.ideas : i);
      setLoading(false);
    });

  const setReactedIdeas = async (token: string) =>
    await allUserIdeasReq(token).then((i) => {
      setIdeas("ideas" in i ? i.ideas : i);
      setLoading(false);
    });

  if (user == null || !token) return <Navigate to="/" />;

  return (
    <div className="IdeaList">
      <h1>Ideas</h1>
      {postedOnly ? (
        <>
          <p>These are the ideas you have posted.</p>
          <Button
            onClick={() => {
              void setReactedIdeas(token);
              setPostedOnly(false);
              setLoading(true);
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
              void setPostedIdeas(user, token);
              setPostedOnly(true);
              setLoading(true);
            }}
          >
            See only ideas you have posted
          </Button>
        </>
      )}
      <Button href="/">Get a new instead</Button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {"msg" in ideas ? (
            <p>ideas.msg</p>
          ) : (
            <>
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
                        <TableRow key={idea.ideaId} hover={true}>
                          <TableCell>
                            <a href={`/ideas/${idea.ideaId}`}>
                              {truncateString(50)(idea.description)}
                            </a>
                          </TableCell>
                          <TableCell>
                            <a href={idea.url}>
                              {truncateString(20)(cleanLink(idea.url))}
                            </a>
                          </TableCell>
                          <TableCell>
                            {idea.userAgreement ? (
                              <Rating
                                name="agreement"
                                max={7}
                                value={idea.userAgreement + 4}
                                size="small"
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
                <>
                  {postedOnly ? (
                    <p>You have not posted any ideas yet.</p>
                  ) : (
                    <p>You have not rated any ideas yet.</p>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default IdeaList;
