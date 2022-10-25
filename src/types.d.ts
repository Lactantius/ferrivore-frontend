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

interface LoginFormVals {
  email: string;
  password: string;
}

interface SignupFormVals {
  email: string;
  username: string;
  password: string;
}

/*
 * Props
 */

interface RouterProps {
  user: User | null;
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

interface HomeProps {
  user: User | null;
  login: function;
  signup: function;
}
