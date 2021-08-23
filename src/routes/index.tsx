import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ChatComponent from "../components/ChatComponent";

// Its only for private rotes, but we dont have private rotes
// import SignRoutes from './SignRoutes';
// import OtherRoutes from './OtherRoutes';
// import { useAuth } from '../contexts/auth';

import Dashboard from "../pages/Dashboard";
import DetailsPoi from "../pages/DetailsPoi";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import UserProfile from "../pages/UserProfile";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/Register" component={Register} />
        <Route path="/chat/:idAgency/:idUser" component={ChatComponent} />
        <Route path="/Details/:id" component={DetailsPoi} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
