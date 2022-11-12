import React from "react";
import { render, screen } from "@testing-library/react";
import Idea from "./Idea";

const idea: IdeaWithScore = {
  url: "https://example.org",
  description: "Example description",
  createdAt: "date",
  ideaId: "uuid",
  score: -2.01,
  popularity: 10
};

it("matches snapshot", () => {
  const { asFragment } = render(<Idea idea={idea} />);
  expect(asFragment()).toMatchSnapshot();
});

test("renders data", () => {
  render(<Idea idea={idea} />);
  const url = screen.getByText(/example.org/i);
  const description = screen.getByText(/description/i);
  const score = screen.getByText(/-2.01/i);
  const popularity = screen.getByText(/10/i);
  [url, description, score, popularity].forEach((component) =>
    expect(component).toBeInTheDocument()
  );
});
