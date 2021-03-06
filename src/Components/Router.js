import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Navi from "../Routes/Navi";
import Home from "../Routes/Home";
import UserInfo from "../Routes/UserInfo";
import MyGoods from "../Routes/MyGoods";
import GoodsDetail from "../Routes/GoodsDetail";
import GoodsPost from "../Routes/GoodsPost";
import GoodsEdit from "../Routes/GoodsEdit";

const App = () => (
  <BrowserRouter>
    <>
      <Navi />
      <Switch>
        <Route exact path={["/", "/str/:str"]} component={Home} />
        <Route path="/user/userinfo" component={UserInfo} />
        <Route path="/user/mygoods" component={MyGoods} />
        <Route path="/goods/detail/:id" component={GoodsDetail} />
        <Route path="/goods/edit/:id" component={GoodsEdit} />
        <Route path="/goods/post" component={GoodsPost} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </BrowserRouter>
);

export default App;
