import React from "react";
import { observer } from "mobx-react";
import store from "./store/index";
import { autorun } from "mobx";

// 컴포넌트를 observer로 감싸주어 state가 실시간으로 변경되는것을 감지.
const mobxCounter = observer(() => {
  const { countObject, doubleObject } = store;
  autorun(() => {
    // computed 값이 어떻게 바뀌는지 감지
    if (doubleObject.double) {
      console.log("Double " + doubleObject.double);
    }
    if (doubleObject.double === 8) {
      console.log("만약 value가 8이리면 0으로 초기화");
      doubleObject.value = 0;
    }
  });
  return (
    <div style={{ padding: "50px" }}>
      <div style={{ marginBottom: "50px" }}>
        <h1>Count</h1>
        <div>num: {countObject.num}</div>
        <button onClick={() => countObject.increase()}>plus</button>
        <button onClick={() => countObject.decrease()}>minus</button>
      </div>
      <div>
        <h1>Computed</h1>
        <div>doubble number: {doubleObject.double}</div>
        <button onClick={() => doubleObject.increment()}>
          double increment
        </button>
      </div>
    </div>
  );
});

export default mobxCounter;
// expoert default observer(mobxCounter); 이렇게 감싸줄수도 있다.
