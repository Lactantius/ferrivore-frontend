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

interface Reactions {
  reactions: string[];
  agreement: number[];
}

interface Reaction {
  reaction: {
    ideaId: string;
    type: string;
    agreement?: number;
  };
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

interface ReactionFormVals {
  ideaId: string;
  type: string;
  agreement?: number;
}

interface Idea {
  url: string;
  description: string;
  createdAt: string;
  ideaId: string;
  agreement?: number;
}

interface IdeaReq {
  idea: Idea;
}

interface IdeaRes {
  idea: Idea;
}

interface ErrorRes {
  error: string;
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

interface NavBarProps {
  user: User | null;
  logout: function;
}

interface IdeaCardProps {
  idea: Idea;
}

interface ReactionFormProps {
  user: User;
  token: string;
  idea: Idea;
}

interface ProfileProps {
  user: User;
  token: string;
}

interface IdeaListProps {
  user: User;
  token: string;
}
