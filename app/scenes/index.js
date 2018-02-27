import React from 'react';
import { NativeRouter, Route, Switch } from 'react-router-native'

import Entrance from './Entrance'
import Triage from './Triage'
import Consultation from './Consultation'
import Login from './Login'
import Registration from './Registration'
import Pharmacy from './Pharmacy';

const Storyboard = () => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Entrance} />
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Registration} />
      <Route path="/triage" component={Triage} />
      <Route path="/consultation" component={Consultation} />
      <Route path="/pharmacy" component={Pharmacy} />
    </Switch>
  </NativeRouter>
)

export default Storyboard;