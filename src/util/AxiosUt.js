import axios from 'axios';
import { observer } from 'mobx-react';
import store from '../store/index';
import { flow } from 'mobx';
const { authObject } = store;

/*
    1. 요청 인터셉터
    2개의 콜백 함수를 받습니다.
*/
axios.interceptors.request.use(
  function (config) {

		console.log("요청 정보 : " + JSON.stringify(config));

    config.headers = {
      'api-version': '1.2',
      'content-type': 'application/json',
    };

    console.log('요청 엑세스 토큰 : ' + authObject.accessToken);
    if (authObject.accessToken) {
      config.headers['x-access-token'] = authObject.accessToken;
    }

    if (document.cookie) {
      config.headers['x-refresh-token'] = authObject.getRefreshToken();
    }
    // 요청 성공 직전 호출됩니다.
    // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)

    return config;
  },
  function (error) {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

/*
    2. 응답 인터셉터
    2개의 콜백 함수를 받습니다.
*/
axios.interceptors.response.use(
  function (response) {
		console.log('요청 완료');

    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다.
        .then() 으로 이어집니다.
    */
    return response;
  },

  flow(function* (error) {

		if (error.response === undefined) {
			alert('서버연결이 안되네요');
			return Promise.reject(error);
		}

		if (error.response.status === 401) {
			console.log('401에러');
			const beforeRequest = error.response.config;

			if (beforeRequest.retry) {
				console.log('리프레시 만료');
				authObject.logout();
				return Promise.reject(error);
			}

			console.log('401에러니 다시 요청하러 가자');
			beforeRequest.retry = true;
			yield authObject.requestToken(beforeRequest);

			return yield axios(beforeRequest);
		}

    /*
        http status가 200이 아닌 경우
        응답 에러 직전 호출됩니다.
        .catch() 으로 이어집니다.
    */
    return Promise.reject(error);
  })
);

export default axios;
