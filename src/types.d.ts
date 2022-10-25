interface User {
  email: string;
  username: string;
  userId: string;
}

interface UserToken {
  email: string;
  exp: string;
  iat: string;
  nbf: string;
  sub: string;
  token: string;
  userId: string;
  username: string;
}

interface UserTokenRes {
  user: UserToken;
}

/*
 * Forms
 */

interface LoginFormVals {
  email: string;
  password: string;
}

interface SignupFormVals {
  email: string;
  username: string;
  password: string;
}

interface AddIdeaFormVals {
  url: string;
  description: string;
}

interface Idea {
  url: string;
  description: string;
}

interface IdeaReq {
  idea: Idea;
}

/*
 * Props
 */

interface RouterProps {
  user: User | null;
  token: string | null;
  login: function;
  signup: function;
}

interface HomeProps {
  user: User | null;
  token: string | null;
  login: function;
  signup: function;
}

interface SignupFormProps {
  user: User | null;
  signup: function;
}

interface LoginFormProps {
  user: User | null;
  login: function;
}

interface IdeaContainerProps {
  user: User;
  token: string;
}

interface AddIdeaFormProps {
  user: User;
  token: string;
}
