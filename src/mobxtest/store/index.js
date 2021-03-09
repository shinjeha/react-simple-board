// 각 컴포넌트에서 import 해도 되지만 이렇게 하나의 스토어에도 넣을 수 있다.
import countObject from "./countObject";
import doubleObject from "./doubleObject";

const store = { countObject, doubleObject };

export default store;
