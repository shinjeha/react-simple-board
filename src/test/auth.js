const users = [{ id: "123", password: "123" }];

export function signIn({ id, password }) {
  const user = users.find(
    (user) => user.id === id && user.password === password
  );

  if (user === undefined) {
    throw new Error();
  } else {
    document.cookie = "x-auth=456;";
  }

  return {
    accessToken: "123",
    refreshToken: "456",
  };
}
