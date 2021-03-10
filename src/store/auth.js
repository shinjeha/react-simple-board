import { observable, makeAutoObservable } from "mobx";
import { Route, Redirect } from "react-router-dom";
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
	requestToken() {
		console.log('토큰 다시');
		const url = "http://192.168.1.29:3000/v1/auth/certify";

		/*
		const response = yield axios.post(url, {}, {
			headers: {
				"api-version": "1.2",
        "content-type": "application/json",
				"x-refresh-token": this.getRefreshToken(),
			}
		});

		document.cookie = `x-auth=${response.data.auth_info.refreshToken}`;
		this.accessToken = response.data.auth_info.accessToken;

		if (response.status === 401) {
			alert('로그아웃 됨');
			this.logout();
		}
		*/

		axios.post(url, {}, {
			headers: {
				"api-version": "1.2",
				"content-type": "application/json",
				"x-refresh-token": this.getRefreshToken(),
			}
		})
		.then( response => {


			document.cookie = `x-auth=${response.data.auth_info.refreshToken}`;
			this.accessToken = response.data.auth_info.accessToken;

			console.log(this.accessToken);
		})
		.catch( error => {
			alert('로그아웃 됨');
			this.logout();
		});
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
  logout() {
		console.log('로그아웃');
    document.cookie = "x-auth=; max-age=-1";
    this.isLogin = false
  },
  * login({ id, password }) {
    const url = "http://192.168.1.29:3000/v1/auth/login";
    const data = {
      uid: id,
      pass: password,
    };

		const response = yield axios.post(url, data);

    // const response = yield axios.post(url, data, {
    //   headers: {
    //     "api-version": "1.2",
    //     "content-type": "application/json",
    //   },
    // });

    if (response.data.msg === "ok") {
      document.cookie = `x-auth=${response.data.auth_info.refreshToken}`;
			this.accessToken = response.data.auth_info.accessToken;
      this.isLogin = true;
			console.log('로그인 완료');
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
			this.accessToken = '123';
      this.isLogin = true;
    }
  },
});

export default auth;
