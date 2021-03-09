const axios = require("axios");

export async function signIn({ id, password }) {
  const url = "http://192.168.1.29:3000/v1/auth/login";
  const data = {
    uid: id,
    pass: password,
  };

  const response = await axios.post(url, data, {
    headers: {
      "api-version": "1.2",
      "content-type": "application/json",
    },
  });

  if (response.data.msg === "ok") {
    document.cookie = `x-auth=${response.data.auth_info.accessToken}`;
  } else {
    throw new Error();
  }

  return response.data.auth_info;
}
