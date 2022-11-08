const formatErrors = (err: string) => {
  if (err.includes("email")) {
    return { uniqueEmail: "Email already registered." };
  } else if (err.includes("username")) {
    return { uniqueUsername: "Username already taken." };
  } else if (err.includes("password")) {
    return { invalidPassword: "Invalid password." };
  }
  return {};
};

const cleanLink: (link: string) => string = (link: string) => {
  const url = new URL(link);
  return url.origin + url.pathname;
};

export { formatErrors, cleanLink };
