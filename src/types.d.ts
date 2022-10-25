interface User {
  username: string;
  email: string;
}

interface UserToken {
  username: string;
  iat: number;
  sub: string;
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
