import { observable } from 'mobx';
const axios = require('axios');

const auth = observable({
  accessToken: '',
  isLogin: false,
  *requestToken(beforeRequest = null) {
    console.log('엑세스 토큰 다시 요청');
    const url = 'http://192.168.1.29:3000/v1/auth/certify';

		try {
			const response = yield axios.post(url, {});
			document.cookie = `x-auth=${response.data.auth_info.refreshToken}`;
			this.accessToken = response.data.auth_info.accessToken;
		} catch (err) {
			console.log('다시 요청 중 에러');
			console.error(err);
		}

/*
    axios.post(url, {},
        // {
        //   headers: {
        //     'api-version': '1.2',
        //     'content-type': 'application/json',
        //     'x-refresh-token': this.getRefreshToken(),
        //   },
        // }
      )
      .then((response) => {
        document.cookie = `x-auth=${response.data.auth_info.refreshToken}`;
        this.accessToken = response.data.auth_info.accessToken;

        console.log('새롭게 받아온 엑세스 토큰 : ' + this.accessToken);
console.log('이전 요청' + JSON.stringify(beforeRequest));
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert('로그아웃 됨');
          this.logout();
        }
      });
*/

  },
  getRefreshToken() {
    return document.cookie.split('=')[1];
  },
  logout() {
    console.log('로그아웃');
		alert('로그아웃 되었습니다.');
    document.cookie = 'x-auth=; max-age=-1';
		this.accessToken = '';
    this.isLogin = false;
  },
  *login({ id, password }) {
    const url = 'http://192.168.1.29:3000/v1/auth/login';
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

    if (response.data.msg === 'ok') {
      document.cookie = `x-auth=${response.data.auth_info.refreshToken}`;
      this.accessToken = response.data.auth_info.accessToken;
      this.isLogin = true;
      console.log('로그인 완료');
    } else {
      throw new Error();
    }
  },
  testLogin({ id, password }) {
    const testUser = [{ id: '123', password: '123' }];
    console.log(id, password);
    const user = testUser.find(
      (user) => user.id === id && user.password === password
    );

    if (user === undefined) {
      throw new Error();
    } else {
      document.cookie = 'x-auth=456;';
      this.accessToken = '123';
      this.isLogin = true;
    }
  },
});

export default auth;
