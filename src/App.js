import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./include/Header";
import Home from "./page/common/Home";
import PostMain from "./page/post/PostMain";
import PostView from "./page/post/PostView";
import NotFound from "./page/common/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <hr />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/postMain" component={PostMain} />
          <Route exact path="/postView/:no" component={PostView} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
