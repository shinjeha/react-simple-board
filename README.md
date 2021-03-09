- https://howdy-mj.me/mobx/mobx6-intro/

---

- decorators는 mobx6부터 deprecated

---

# 핵심개념

- observable : 추적 가능한 state 정의
- action : state를 변경하는 메소드
- computed : state와 캐시로부터 새로운 결과를 반환

## observable

추적 가능한 state정의

- makeObservable : 주로 class의 this와 많이 사용됨
- makeAutoObservable : makeObservable과 비슷하지만, class에서 super나 subclassed기 있을 경우 사용 불가
- observable : 위 2개는 object를 바로 변경. observable은 클론을 하고 observable하게 만듬. Proxy object 생성 (비추)
  Observable은 이를 대신해줌

## computed

다른 observable들에서 어떠한 정보를 도출하는데 사용

---

# Stores

비즈니스 로직과 state를 컴포넌트에서 빼서 단독으로 프론트, 백에서 모두 사용할 수 있도록 만드는 것. MVC의 Controller와 비슷.
