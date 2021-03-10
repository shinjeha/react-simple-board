import React from "react";
import { withRouter } from "react-router-dom";

import { observer } from "mobx-react";

function LogoutButton({ authObject, history }) {
  const handleClick = () => {
    authObject.logout();
    history.push("/");
  };

  return <button onClick={handleClick}>Logout</button>;
}

export default withRouter(observer(LogoutButton));
