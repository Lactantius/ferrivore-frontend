interface User {
  username: string;
  email: string;
}

interface UserToken {
  username: string;
  iat: number;
  sub: string;
}
