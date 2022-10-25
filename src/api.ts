const BASE_URL =
  process.env.REACT_APP_BASE_URL || "https://ferrivore.gerardkeiser.com/api";

/**
 * User routes
 * */

async function login({ email, password }: LoginFormVals): Promise<UserToken> {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

async function signup({
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
  return res.json();
}

/**
 * Idea routes
 * */

export { login, signup };
