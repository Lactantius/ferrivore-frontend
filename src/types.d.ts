interface User {
  email: string;
  username: string;
  userId: string;
}

interface Idea {
  url: string;
  description: string;
  createdAt: string;
  ideaId: string;
  agreement?: number;
  postedBy: string;
}

interface IdeaWithScore {
  url: string;
  description: string;
  createdAt: string;
  ideaId: string;
  score: number;
  popularity: number;
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
  allReactions: string[];
  allAgreement: number[];
  postedBy: string;
}

/*
 * API Responses
 */

interface UserTokenRes {
  user: UserToken;
}

interface IdeaDetailsRes {
  idea: IdeaWithAllReactions;
}

interface IdeasWithReactionsRes {
  ideas: IdeaWithAllReactions[];
}

interface ReactionRes {
  reaction: Reaction;
}

interface IdeaRes {
  idea: Idea;
}

interface IdeaWithScoreRes {
  idea: IdeaWithScore;
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
 * API Requests
 */

interface IdeaReq {
  idea: Idea;
}

/*
 * Forms
 */

interface LoginFormVals {
  email: string;
  password: string;
}

interface EditProfileFormVals {
  username: string;
  email: string;
  password: string;
}

interface EditPasswordFormVals {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface UpdateUserVals {
  currentPassword: string;
  newPassword?: string;
  newUsername?: string;
  newEmail?: string;
}

interface ChangePasswordFormVals {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
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

interface PasswordEditFormVals {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

/*
 * Props
 */

interface RouterProps {
  user: User | null;
  token: string | null;
  saveUser: SaveUserFunc;
}

interface HomeProps {
  user: User | null;
  token: string | null;
}

interface SignupFormProps {
  user: User | null;
  token: string | null;
  saveUser: SaveUserFunc;
}

interface LoginFormProps {
  user: User | null;
  token: string | null;
  saveUser: (user: userToken) => void;
}

interface IdeaContainerProps {
  user: User;
  token: string;
}

interface SuccessProps {
  message: string;
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
  token: string;
  idea: Idea | IdeaWithScore;
  initialValue: number | null;
  setUserReaction?: function;
  setAllReactions?: function;
  setReactionSubmitted?: function;
  reactionSubmitted: boolean;
}

interface ProfileProps {
  user: User | null;
  token: string | null;
  saveUser: SaveUserFunc;
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
  getIdea: function;
}

interface PasswordEditFormProps {
  token: string;
  user: User;
  saveUser: SaveUserFunc;
}

interface ProfileEditFormProps {
  token: string;
  user: User;
  saveUser: SaveUserFunc;
}

interface IdeaProps {
  idea: Idea | IdeaWithScore;
}

/*
 * Form Errors
 */

interface SignupFormErrors {
  uniqueUsername?: string | null;
  uniqueEmail?: string | null;
  passwordsMatch?: string | null;
  properEmail?: string | null;
  passwordSufficient?: string | null;
}

interface EditProfileFormErrors {
  invalidPassword?: string | null;
  uniqueUsername?: string | null;
  uniqueEmail?: string | null;
  properEmail?: string | null;
}

interface EditPasswordFormErrors {
  invalidPassword?: string | null;
  passwordSufficient?: string | null;
  passwordsMatch?: string | null;
}

interface AddIdeaFormErrors {
  urlIsValid: string | null;
  descriptionIsLongEnough: string | null;
  descriptionIsShortEnough: string | null;
  submission: string | null;
}

/*
 * Functions
 */

type SaveUserFunc = (user: UserToken) => void;
