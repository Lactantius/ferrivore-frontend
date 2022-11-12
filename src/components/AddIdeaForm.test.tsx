import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AddIdeaForm from "./AddIdeaForm";

const user: User = {
  email: "test@test.com",
  username: "test",
  userId: "uuid",
};

const token: string = "userToken";

it("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <AddIdeaForm user={user} token={token} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
