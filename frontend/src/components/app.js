import React from 'react';
import { Switch } from 'react-router-dom';

import '../App.css';
import { AuthRoute, ProtectedRoute, SuperRoute } from '../util/route_util';
import { Footer } from './atoms';
import { NavBar } from './molecules';
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
  AdminView
} from './organisms';

const App = () => (
  <>
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
        <SuperRoute exact path="/admin" component={AdminView} />
    </Switch>
    <Footer />
  </>
);

export default App;
