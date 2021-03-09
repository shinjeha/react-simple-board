import { observable, makeAutoObservable } from "mobx";
/*
function auth() {
  return makeAutoObservable({
    accessToken: "",
    refershToken: "",
    isLogin: false,
    setCookie() {
      document.cookie = `x-auth=${this.refershToken}`;
    },
    getRefreshToken() {
      return document.cookie.split("=")[1];
    },
    checkIsLogin() {
      if (document.cookie) {
        console.log("QQQ");
        this.isLogin = true;
      } else {
        console.log("ZZZ");
        this.isLogin = false;
      }
    },
  });
}
*/

const axios = require("axios");

const auth = observable({
  accessToken: "",
  isLogin: false,
  getRefreshToken() {
    return document.cookie.split("=")[1];
  },
  checkIsLogin() {
    if (document.cookie) {
      console.log("QQQ");
      this.isLogin = true;
    } else {
      console.log("ZZZ");
      this.isLogin = false;
    }
  },
  logout() {
    document.cookie = "";
    this.isLogin = false;
  },
  async login({ id, password }) {
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
      document.cookie = `x-auth=${response.data.auth_info.refreshToken}`;
      this.isLogin = true;
    } else {
      throw new Error();
    }
  },
  testLogin({ id, password }) {
    const testUser = [{ id: "123", password: "123" }];
    console.log(id, password);
    const user = testUser.find(
      (user) => user.id === id && user.password === password
    );

    if (user === undefined) {
      throw new Error();
    } else {
      document.cookie = "x-auth=456;";
      this.isLogin = true;
    }
  },
});

export default auth;
