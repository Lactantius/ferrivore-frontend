const BASE_URL =
  process.env.REACT_APP_BASE_URL || "https://ferrivore.gerardkeiser.com/api";

/**
 * User routes
 * */

/*
 * Login a user
 */
async function loginReq ({
  email,
  password
}: LoginFormVals): Promise<UserTokenRes | ErrorRes> {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  return await res.json();
}

/*
 * Register a new user
 */
async function signupReq ({
  email,
  password,
  username
}: SignupFormVals): Promise<UserTokenRes | ErrorRes> {
  const res = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, username, password })
  });
  return await res.json();
}

/*
 * Update user info
 */
async function updateReq (
  token: string,
  userId: string,
  updateData: UpdateUserVals
): Promise<UserTokenRes | ErrorRes> {
  console.log(updateData);
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ ...updateData })
  });
  return await res.json();
}

/**
 * Idea routes
 * */

const authHeaders = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
});

type NewIdeaReqFunc = (
  ideaType: string
) => (token: string) => Promise<IdeaWithScoreRes | ErrorRes>
const newIdeaReq: NewIdeaReqFunc = (ideaType) => async (token) => {
  const res = await fetch(`${BASE_URL}/ideas/${ideaType}`, {
    headers: authHeaders(token)
  });
  return await res.json();
};

async function addIdeaReq (
  token: string,
  { url, description }: AddIdeaFormVals
): Promise<IdeaRes | ErrorRes> {
  const res = await fetch(`${BASE_URL}/ideas/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ url, description })
  });
  return await res.json();
}

async function reactReq (
  token: string,
  { ideaId, type, agreement }: ReactionFormVals
): Promise<ReactionRes | ErrorRes> {
  const res = await fetch(`${BASE_URL}/ideas/${ideaId}/react`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ type, agreement })
  });
  return await res.json();
}

async function allReactionsReq (
  token: string,
  idea_id: string
): Promise<AllReactionsRes | ErrorRes> {
  const res = await fetch(`${BASE_URL}/ideas/${idea_id}/reactions`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return await res.json();
}

async function allUserIdeasReq (token: string): Promise<IdeasWithReactionsRes> {
  const res = await fetch(`${BASE_URL}/ideas/viewed-with-relationships`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return await res.json();
}

async function allPostedIdeasReq (
  user: User,
  token: string
): Promise<IdeasWithReactionsRes> {
  const res = await fetch(`${BASE_URL}/ideas/user/${user.userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return await res.json();
}

async function deleteIdeaReq (id: string, token: string) {
  const res = await fetch(`${BASE_URL}/ideas/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return await res.json();
}

async function ideaDetailsReq (
  id: string,
  token: string,
  with_reactions = false,
  with_user_reaction = false
): Promise<IdeaDetailsRes | ErrorRes> {
  const res = await fetch(
    `${BASE_URL}/ideas/${id}?` +
      new URLSearchParams({
        "with-reactions": String(with_reactions),
        "with-user-reaction": String(with_user_reaction)
      }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );
  return await res.json();
}

export {
  loginReq,
  signupReq,
  updateReq,
  addIdeaReq,
  reactReq,
  allReactionsReq,
  allUserIdeasReq,
  allPostedIdeasReq,
  deleteIdeaReq,
  ideaDetailsReq,
  newIdeaReq
};
