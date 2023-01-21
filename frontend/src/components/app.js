import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

import Landing from './organisms/Landing';
import LoginView from './organisms/LoginView';
import SignupView from './organisms/SignupView';

const App = () => (
    <Switch>
        <AuthRoute exact path="/login" component={LoginView} />
        <AuthRoute exact path="/signup" component={SignupView} />
        <ProtectedRoute exact path="/" component={Landing} />
    </Switch>
);

export default App;
