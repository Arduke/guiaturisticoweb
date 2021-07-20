import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Its only for private rotes, but we dont have private rotes
// import SignRoutes from './SignRoutes';
// import OtherRoutes from './OtherRoutes';
// import { useAuth } from '../contexts/auth';

import Dashboard from '../pages/Dashboard'
import DetailsPoi from '../pages/DetailsPoi';
import Login from '../pages/Login'
import Register from '../pages/Register'

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/Register" component={Register} />
                <Route path="/Details" component={DetailsPoi} />
                <Route path="*" component={() => { return (<div>ERROR PAGE</div>) }} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;