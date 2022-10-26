const BASE_URL =
  process.env.REACT_APP_BASE_URL || "https://ferrivore.gerardkeiser.com/api";

/**
 * User routes
 * */

async function loginReq({
  email,
  password,
}: LoginFormVals): Promise<UserToken> {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return res
    .json()
    .then((data) => data.user)
    .catch((_) => null);
}

async function signupReq({
  email,
  password,
  username,
}: SignupFormVals): Promise<UserToken> {
  const res = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password }),
  });
  return res
    .json()
    .then((data) => data.user)
    .catch((_) => null);
}

/**
 * Idea routes
 * */

async function disagreeableReq(token: string): Promise<IdeaRes | ErrorRes> {
  const res = await fetch(`${BASE_URL}/ideas/disagreeable`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

async function agreeableReq(token: string): Promise<IdeaRes | ErrorRes> {
  const res = await fetch(`${BASE_URL}/ideas/agreeable`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

async function randomReq(token: string): Promise<IdeaRes | ErrorRes> {
  const res = await fetch(`${BASE_URL}/ideas/random-unseen`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

async function addIdeaReq(
  token: string,
  { url, description }: AddIdeaFormVals
): Promise<Idea> {
  const res = await fetch(`${BASE_URL}/ideas/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ url, description }),
  });
  return res
    .json()
    .then((data) => data.idea)
    .catch((_) => null);
}

async function reactionReq(
  token: string,
  { ideaId, type, agreement }: ReactionFormVals
): Promise<Reaction> {
  const res = await fetch(`${BASE_URL}/ideas/${ideaId}/react`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ type, agreement }),
  });
  return res.json();
}

export {
  loginReq,
  signupReq,
  addIdeaReq,
  disagreeableReq,
  agreeableReq,
  reactionReq,
  randomReq,
};
