import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

import NavBar from './molecules/NavBar';
import {
  Landing,
  LoginView,
  SignupView,
  ScheduleView,
  RegistryView,
  TravelView,
  AboutUsView,
  MomentsView,
  MusicView,
} from './organisms';

const App = () => (
  <div>
    <NavBar />
    <Switch>
        <AuthRoute exact path="/login" component={LoginView} />
        <AuthRoute exact path="/signup" component={SignupView} />
        <ProtectedRoute exact path="/" component={Landing} />
        <ProtectedRoute exact path="/schedule" component={ScheduleView} />
        <ProtectedRoute exact path="/registry" component={RegistryView} />
        <ProtectedRoute exact path="/travel" component={TravelView} />
        <ProtectedRoute exact path="/about" component={AboutUsView} />
        <ProtectedRoute exact path="/moments" component={MomentsView} />
        <ProtectedRoute exact path="/music" component={MusicView} />
    </Switch>
  </div>
);

export default App;
