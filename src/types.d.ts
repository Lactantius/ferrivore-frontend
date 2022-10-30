interface User {
  email: string;
  username: string;
  userId: string;
}

interface GraphData<T> {
  name: T;
  frequency: number;
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

interface IdeaDetailsRes {
  idea: IdeaWithAllReactions;
}

interface Reactions {
  reactions: string[];
  agreement: number[];
}

interface UserReaction {
  userReaction: string;
  userAgreement?: number;
}

interface AnonReactions {
  allReactions: string[];
  allAgreement: number[];
}

interface AllReactions {
  userReaction: string;
  userAgreement?: number;
  allReactions: string[];
  allAgreement: number[];
}

interface Reaction {
  ideaId: string;
  type: string;
  agreement?: number;
}

interface IdeaWithAllReactions {
  createdAt: string;
  url: string;
  description: string;
  ideaId: string;
  userAgreement?: number;
  userReaction: string;
  allReactions: Array<string>;
  allAgreement: Array<number>;
  postedBy: string;
}

interface IdeasWithReactionsRes {
  ideas: Array<IdeaWithAllReactions>;
}

interface ReactionRes {
  reaction: Reaction;
}

/*
 * Forms
 */

interface LoginFormVals {
  email: string;
  password: string;
}

interface ProfileFormVals {
  username: string;
  email: string;
  confirmPassword: string;
}

interface SignupFormVals {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
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
  postedBy: string;
}

interface IdeaReq {
  idea: Idea;
}

interface IdeaRes {
  idea: Idea;
}

interface ErrorRes {
  msg: string;
}

interface AllReactionsRes {
  reactions: {
    userReaction: string;
    userAgreement?: number;
    allReactions: string[];
    allAgreement: number[];
  };
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
  token: string | null;
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
  user: User | null;
  token: string | null;
}

interface NavBarProps {
  user: User | null;
  logout: function;
}

interface IdeaCardProps {
  idea: Idea | IdeaWithAllReactions | ErrorRes;
}

interface ReactionFormProps {
  user: User;
  token: string;
  idea: Idea;
  initialValue: number | null;
  setUserReaction?: function;
  setAllReactions?: function;
  setReactionSubmitted?: function;
}

interface ProfileProps {
  user: User | null;
  token: string | null;
}

interface IdeaListProps {
  user: User | null;
  token: string | null;
}

interface UserProps {
  user: User | null;
  token: string | null;
}

interface ResultsProps {
  userReaction: UserReaction | ErrorRes;
  anonReactions: AnonReactions | ErrorRes;
}

interface GetIdeaFormProps {
  token: string;
  getAgreeable: function;
  getRandomUnseen: function;
  getDisagreeable: function;
}

interface SignupFormErrors {
  uniqueUsername?: string;
  uniqueEmail?: string;
  passwordsMatch?: string;
  properEmail?: string;
  passwordSufficient?: string;
}
